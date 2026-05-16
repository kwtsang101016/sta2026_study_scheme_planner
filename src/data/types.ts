export type StreamId =
  | "math-stats"
  | "methodology"
  | "biostat"
  | "finance"
  | "computing-ml"
  | "ce";

export interface Course {
  code: string;
  title: string;
  units: number;
  streams: StreamId[];
  prerequisites: string[];
  /** Term 2 only (e.g. DDA4080). */
  term2Only?: boolean;
  /** Earliest year of study (1 = first year). */
  minYear?: number;
  /** If false, excluded from recommendations (still listed in catalog). */
  offered?: boolean;
  /** Suggested alternative when not offered. */
  replacedBy?: string;
  statusNote?: string;
}

export interface PatternRow {
  year: number;
  term: 1 | 2;
  label: string;
  courses: string;
  units: number;
  kind: "fixed" | "elective";
  electiveSlots?: number;
}

export interface ElectiveSlot {
  id: string;
  year: number;
  term: 1 | 2;
  label: string;
}

export interface InterestOption {
  id: string;
  label: string;
  description: string;
  primaryStream: StreamId;
  /** Course codes to boost when this interest is selected. */
  courseBoosts: string[];
}

export interface SlotAssignment {
  slotId: string;
  courseCode: string;
}

export interface RecommendationResult {
  assignments: SlotAssignment[];
  streamCounts: Record<StreamId, number>;
  depthStreams: StreamId[];
  declarationStreams: StreamId[];
  warnings: string[];
}
