import type { InterestOption } from "./types";

export const INTEREST_OPTIONS: InterestOption[] = [
  {
    id: "theory",
    label: "Probability & Mathematical Depth",
    description:
      "Rigorous probability, analysis, and mathematical statistics — best aligned with the Mathematical Statistics stream.",
    primaryStream: "math-stats",
    courseBoosts: [
      "MAT3280",
      "STA4001H",
      "MAT3006",
      "MAT3040",
      "MAT3220",
      "STA4100",
      "DDA4002",
    ],
  },
  {
    id: "applied",
    label: "Applied Statistics & Inference",
    description:
      "Regression, experiments, multivariate methods, and core applied inference — Statistical Methodology stream.",
    primaryStream: "methodology",
    courseBoosts: [
      "STA3006",
      "STA4002",
      "STA4102",
      "STA4030",
      "STA3030",
      "STA3007",
      "DDA4010",
    ],
  },
  {
    id: "biomedical",
    label: "Biomedical & Genomic Data",
    description:
      "Bioinformatics, genetics, and health-related modelling — Biostatistics & Bioinformatics stream.",
    primaryStream: "biostat",
    courseBoosts: [
      "BIM2005",
      "BIM3001",
      "BIM3007",
      "STA4012",
      "STA4606",
      "STA4005",
      "BIM3009",
    ],
  },
  {
    id: "finance",
    label: "Finance, Risk & Markets",
    description:
      "Financial data, risk, derivatives, and econometrics — Financial Statistics stream (plus selected CE).",
    primaryStream: "finance",
    courseBoosts: [
      "STA4003",
      "STA4020",
      "RMS4050",
      "RMS4060",
      "FMA4200",
      "DDA3600",
      "ECO3211",
      "FIN3380",
    ],
  },
  {
    id: "ml",
    label: "Machine Learning & Computing",
    description:
      "Algorithms, ML, and deep learning with statistical foundations — Computing & Machine Learning stream.",
    primaryStream: "computing-ml",
    courseBoosts: [
      "DDA3020H",
      "DDA4220",
      "CSC3100",
      "CSC3002",
      "CSC4120H",
      "DDA4210",
      "DDA4080",
    ],
  },
  {
    id: "exploring",
    label: "Still Exploring (Flexible Mix)",
    description:
      "A balanced starter set across streams; refine after Year 2 based on what you enjoy.",
    primaryStream: "methodology",
    courseBoosts: ["STA3006", "DDA3020H", "STA4003", "BIM3001", "DDA4080"],
  },
];
