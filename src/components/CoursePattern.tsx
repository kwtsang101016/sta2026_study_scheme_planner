import { OFFICIAL_PATTERN } from "../data/pattern";
import type { RecommendationResult } from "../data/types";
import { CourseCode, CourseCodeList } from "./CourseCode";
import "./CoursePattern.css";

interface CoursePatternProps {
  result: RecommendationResult;
  hasInterests: boolean;
}

function electiveForSlot(
  slotId: string,
  result: RecommendationResult,
): string | undefined {
  return result.assignments.find((a) => a.slotId === slotId)?.courseCode;
}

const SLOT_ORDER = [
  "y2t2-1",
  "y3t1-1",
  "y3t1-2",
  "y3t2-1",
  "y4t1-1",
  "y4t1-2",
  "y4t1-3",
  "y4t2-1",
  "y4t2-2",
];

export function CoursePattern({ result, hasInterests }: CoursePatternProps) {
  let electiveIndex = 0;

  return (
    <section className="panel" id="pattern">
      <div className="panel__header">
        <h2>Recommended course pattern</h2>
        <p>
          Fixed rows follow the official study scheme. Hover any course code for its
          full title. Solid electives match your interests; empty slots are for you to
          choose (we do not suggest unrelated courses).
        </p>
      </div>
      <div className="pattern-timeline">
        {OFFICIAL_PATTERN.map((row, index) => {
          const yearLabel =
            index === 0 ||
            OFFICIAL_PATTERN[index - 1]?.year !== row.year
              ? `Year ${row.year}`
              : null;

          let electiveCodes: string[] = [];
          if (row.kind === "elective" && row.electiveSlots) {
            electiveCodes = Array.from({ length: row.electiveSlots }, () => {
              const slotId = SLOT_ORDER[electiveIndex];
              electiveIndex += 1;
              return slotId ? electiveForSlot(slotId, result) : undefined;
            }).filter((code): code is string => Boolean(code));
          }

          return (
            <div key={`${row.year}-${row.term}-${row.label}-${index}`}>
              {yearLabel && <div className="pattern-year">{yearLabel}</div>}
              <div
                className={`pattern-row ${row.kind === "elective" ? "pattern-row--elective" : ""}`}
              >
                <div className="pattern-row__term">
                  Term {row.term} · {row.label}
                </div>
                <div className="pattern-row__body">
                  {row.kind === "elective" ? (
                    <>
                      <span className="pattern-tag">Major Elective(s)</span>
                      {electiveCodes.length > 0 ? (
                        <span className="pattern-courses">
                          {electiveCodes.map((code, i) => (
                            <span key={code}>
                              {i > 0 ? ", " : ""}
                              <CourseCode code={code} />
                            </span>
                          ))}
                        </span>
                      ) : (
                        <span className="pattern-placeholder">
                          {hasInterests
                            ? "Your choice — pick from catalog or another interest"
                            : "Select interests above"}
                        </span>
                      )}
                    </>
                  ) : (
                    <CourseCodeList text={row.courses} />
                  )}
                </div>
                <div className="pattern-row__units">{row.units} u</div>
              </div>
            </div>
          );
        })}
      </div>
      <p className="pattern-footnote">
        Total major requirement (including school package): <strong>70 units</strong>
      </p>
    </section>
  );
}
