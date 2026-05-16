import { courseLevel, COURSE_MAP, ELECTIVE_POOL_CODES } from "../data/courses";
import { FIXED_TRACK_CODES } from "../data/equivalents";
import { INTEREST_OPTIONS } from "../data/interests";
import { ELECTIVE_SLOTS } from "../data/pattern";
import {
  DECLARATION_REQUIRED,
  DEPTH_REQUIRED,
  STREAM_LABELS,
} from "../data/streams";
import type { ElectiveSlot, RecommendationResult, StreamId } from "../data/types";
import {
  conflictsWithTaken,
  fitsTerm,
  prerequisitesMet,
} from "./courseUtils";

const CAPSTONE = "DDA4080";
const ELECTIVE_COUNT = ELECTIVE_SLOTS.length;

/** Fixed courses treated as completed when electives in the same term are chosen. */
const SAME_TERM_FIXED: Record<string, string[]> = {
  "y2t2-1": ["MAT3007H", "STA2002H"],
  "y3t1-1": ["STA3042"],
  "y3t1-2": ["STA3042"],
  "y3t2-1": ["STA3005", "STA3020"],
  "y4t1-1": [],
  "y4t1-2": [],
  "y4t1-3": [],
  "y4t2-1": [],
  "y4t2-2": [],
};

function buildScores(selectedInterestIds: string[]): Map<string, number> {
  const scores = new Map<string, number>();

  for (const code of ELECTIVE_POOL_CODES) {
    scores.set(code, 0);
  }

  if (selectedInterestIds.length === 0) {
    for (const code of ELECTIVE_POOL_CODES) {
      scores.set(code, 1);
    }
    return scores;
  }

  for (const interestId of selectedInterestIds) {
    const interest = INTEREST_OPTIONS.find((item) => item.id === interestId);
    if (!interest) continue;

    for (const code of ELECTIVE_POOL_CODES) {
      const entry = COURSE_MAP.get(code);
      if (!entry) continue;
      let add = 0;
      if (entry.streams.includes(interest.primaryStream)) add += 3;
      if (interest.courseBoosts.includes(code)) add += 5;
      if (add > 0) {
        scores.set(code, (scores.get(code) ?? 0) + add);
      }
    }
  }

  return scores;
}

/**
 * Phase 1 — Priority list: what to take (highest interest first).
 * Tie-breaker: higher course level first so flagships rank above MAT2002.
 */
export function buildRecommendationList(
  scores: Map<string, number>,
  hasInterests: boolean,
): string[] {
  const byPriority = (a: string, b: string): number => {
    const scoreDiff = (scores.get(b) ?? 0) - (scores.get(a) ?? 0);
    if (scoreDiff !== 0) return scoreDiff;
    const levelDiff = courseLevel(b) - courseLevel(a);
    if (levelDiff !== 0) return levelDiff;
    return a.localeCompare(b);
  };

  if (!hasInterests) {
    return [...ELECTIVE_POOL_CODES].sort(byPriority);
  }

  const relevant = ELECTIVE_POOL_CODES.filter((c) => (scores.get(c) ?? 0) > 0).sort(
    byPriority,
  );
  const other = ELECTIVE_POOL_CODES.filter((c) => (scores.get(c) ?? 0) === 0).sort(
    byPriority,
  );
  return [...relevant, ...other];
}

/** Phase 2 — Pick up to 9 courses from the list (no honour duplicates). */
function selectNineCourses(
  priorityList: string[],
  scores: Map<string, number>,
  hasInterests: boolean,
): string[] {
  const selected: string[] = [];
  const selectedSet = new Set<string>();

  for (const code of priorityList) {
    if (selected.length >= ELECTIVE_COUNT) break;
    // Do not pad with unrelated score-0 courses (e.g. FMA4800 for ML interest).
    if (hasInterests && (scores.get(code) ?? 0) === 0) continue;
    if (conflictsWithTaken(code, selectedSet)) continue;
    selected.push(code);
    selectedSet.add(code);
  }

  return selected;
}

/**
 * Phase 3 — Schedule order: prerequisite-aware, lower level earlier
 * (e.g. MAT2002 before STA4100).
 */
function buildScheduleOrder(selected: string[]): string[] {
  const ordered: string[] = [];
  const remaining = new Set(selected);

  while (remaining.size > 0) {
    const ready = [...remaining].filter((code) => {
      const taken = new Set([...FIXED_TRACK_CODES, ...ordered]);
      return prerequisitesMet(code, taken);
    });

    if (ready.length === 0) {
      [...remaining]
        .sort((a, b) => courseLevel(a) - courseLevel(b))
        .forEach((code) => {
          ordered.push(code);
          remaining.delete(code);
        });
      break;
    }

    ready.sort((a, b) => courseLevel(a) - courseLevel(b));
    for (const code of ready) {
      ordered.push(code);
      remaining.delete(code);
    }
  }

  return ordered;
}

function slotTakenSet(
  taken: Set<string>,
  slot: ElectiveSlot,
): Set<string> {
  const slotTaken = new Set(taken);
  for (const extra of SAME_TERM_FIXED[slot.id] ?? []) {
    slotTaken.add(extra);
  }
  return slotTaken;
}

function isEligibleForSlot(
  code: string,
  slot: ElectiveSlot,
  taken: Set<string>,
): boolean {
  const slotTaken = slotTakenSet(taken, slot);
  if (conflictsWithTaken(code, slotTaken)) return false;
  if (!prerequisitesMet(code, slotTaken)) return false;
  const course = COURSE_MAP.get(code);
  if (course?.minYear && slot.year < course.minYear) return false;
  if (!fitsTerm(code, slot.term)) return false;
  return true;
}

/**
 * Phase 4 — Place schedule-ordered courses into term slots (earliest feasible slot each).
 */
function assignToSlots(
  scheduleOrder: string[],
  warnings: string[],
): RecommendationResult["assignments"] {
  const remaining = new Set(scheduleOrder);
  const taken = new Set(FIXED_TRACK_CODES);
  const assignments: RecommendationResult["assignments"] = [];
  let capstonePlaced = false;

  for (const slot of ELECTIVE_SLOTS) {
    const preferCapstone =
      !capstonePlaced &&
      slot.id === "y3t2-1" &&
      remaining.has(CAPSTONE) &&
      isEligibleForSlot(CAPSTONE, slot, taken);

    let pick: string | undefined;

    if (preferCapstone) {
      pick = CAPSTONE;
    } else {
      pick = scheduleOrder.find(
        (code) => remaining.has(code) && isEligibleForSlot(code, slot, taken),
      );
    }

    if (!pick) {
      warnings.push(`No eligible course found for ${slot.label}.`);
      continue;
    }

    assignments.push({ slotId: slot.id, courseCode: pick });
    remaining.delete(pick);
    taken.add(pick);
    if (pick === CAPSTONE) capstonePlaced = true;
  }

  if (!capstonePlaced && scheduleOrder.includes(CAPSTONE)) {
    const y4t2 = ELECTIVE_SLOTS.find((s) => s.id === "y4t2-1");
    if (y4t2 && isEligibleForSlot(CAPSTONE, y4t2, taken)) {
      warnings.push(
        "DDA4080 was not placed in Year 3 Term 2. Consider taking it in Year 4 Term 2 (Term 2 only).",
      );
    }
  }

  return assignments;
}

export function recommendElectives(
  selectedInterestIds: string[],
): RecommendationResult {
  const scores = buildScores(selectedInterestIds);
  const hasInterests = selectedInterestIds.length > 0;
  const warnings: string[] = [];

  const priorityList = buildRecommendationList(scores, hasInterests);
  const selected = selectNineCourses(priorityList, scores, hasInterests);

  if (selected.length < ELECTIVE_COUNT) {
    warnings.push(
      `Only ${selected.length} of ${ELECTIVE_COUNT} elective slots match your interests (after honour-course conflicts). Add another interest or choose remaining electives manually.`,
    );
  }

  const scheduleOrder = buildScheduleOrder(selected);
  const assignments = assignToSlots(scheduleOrder, warnings);

  const streamCounts: Record<StreamId, number> = {
    "math-stats": 0,
    methodology: 0,
    biostat: 0,
    finance: 0,
    "computing-ml": 0,
    ce: 0,
  };

  for (const { courseCode } of assignments) {
    const course = COURSE_MAP.get(courseCode);
    if (!course) continue;
    for (const stream of course.streams) {
      if (stream !== "ce") streamCounts[stream] += 1;
    }
  }

  const sortedStreams = (Object.keys(streamCounts) as StreamId[])
    .filter((id) => id !== "ce")
    .sort((a, b) => streamCounts[b] - streamCounts[a]);

  const depthStreams = sortedStreams.filter(
    (id) => streamCounts[id] >= DEPTH_REQUIRED,
  );
  const declarationStreams = sortedStreams.filter(
    (id) => streamCounts[id] >= DECLARATION_REQUIRED,
  );

  if (sortedStreams.length > 0) {
    const best = sortedStreams[0]!;
    if (streamCounts[best] > 0 && streamCounts[best] < DEPTH_REQUIRED) {
      const need = DEPTH_REQUIRED - streamCounts[best];
      warnings.push(
        `Add ${need} more course(s) from ${STREAM_LABELS[best]} to meet the depth requirement (3 courses in one stream).`,
      );
    }
  }

  return {
    assignments,
    streamCounts,
    depthStreams,
    declarationStreams,
    warnings,
  };
}
