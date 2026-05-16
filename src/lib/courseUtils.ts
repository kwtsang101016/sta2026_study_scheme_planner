import { EQUIVALENT_GROUPS } from "../data/equivalents";
import { COURSE_MAP } from "../data/courses";
import type { Course } from "../data/types";

export function getCourse(code: string): Course | undefined {
  return COURSE_MAP.get(code);
}

export function getEquivalentGroup(code: string): string[] | undefined {
  return EQUIVALENT_GROUPS.find((group) => group.includes(code));
}

export function conflictsWithTaken(code: string, taken: Set<string>): boolean {
  if (taken.has(code)) return true;
  const group = getEquivalentGroup(code);
  if (!group) return false;
  return group.some((member) => taken.has(member));
}

export function prerequisitesMet(code: string, taken: Set<string>): boolean {
  const course = getCourse(code);
  if (!course || course.prerequisites.length === 0) return true;
  return course.prerequisites.every((prereq) => {
    if (taken.has(prereq)) return true;
    const group = getEquivalentGroup(prereq);
    return group?.some((member) => taken.has(member)) ?? false;
  });
}

export function availableByYear(code: string, slotYear: number): boolean {
  const course = getCourse(code);
  if (!course?.minYear) return true;
  return slotYear >= course.minYear;
}

export function fitsTerm(code: string, term: 1 | 2): boolean {
  const course = getCourse(code);
  if (!course?.term2Only) return true;
  return term === 2;
}
