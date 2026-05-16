import type { StreamId } from "./types";

export const STREAM_LABELS: Record<StreamId, string> = {
  "math-stats": "Mathematical Statistics",
  methodology: "Statistical Methodology",
  biostat: "Biostatistics & Bioinformatics",
  finance: "Financial Statistics",
  "computing-ml": "Computing & Machine Learning",
  ce: "Complementary Electives",
};

export const STREAM_COLORS: Record<StreamId, string> = {
  "math-stats": "#6366f1",
  methodology: "#0ea5e9",
  biostat: "#10b981",
  finance: "#f59e0b",
  "computing-ml": "#ec4899",
  ce: "#94a3b8",
};

export const DEPTH_REQUIRED = 3;
export const DECLARATION_REQUIRED = 4;
