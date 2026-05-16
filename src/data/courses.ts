import type { Course } from "./types";

function c(
  code: string,
  title: string,
  streams: Course["streams"],
  prerequisites: string[] = [],
  extra?: Partial<Course>,
): Course {
  return { code, title, units: 3, streams, prerequisites, ...extra };
}

export const COURSES: Course[] = [
  // School package (reference)
  c("BIO1008", "Chemistry and Life Sciences", []),
  c("CSC1001", "Introduction to Computer Science: Programming Methodology", []),
  c("CSC1002", "Computational Laboratory", [], [], { units: 1 }),
  c("DDA2001", "Introduction to Data Science", []),
  c("MAT1001", "Calculus I", []),
  c("MAT1002", "Calculus II", [], ["MAT1001"]),
  c("MAT1011", "Honours Calculus I", []),
  c("MAT1012", "Honours Calculus II", [], ["MAT1011"]),
  c("MAT2041", "Linear Algebra and Applications", [], ["MAT1002"]),
  c("MAT2041A", "Foundations of Linear Algebra and Applications", [], ["MAT1002"]),
  c("PHY1001", "Mechanics", []),
  c("STA2001", "Probability and Statistics I", [], ["MAT1002"]),
  c("STA2001H", "Honours Probability and Statistics I", [], ["MAT1012"]),

  // Major required (reference)
  c("MAT2050", "Mathematical Analysis", [], ["MAT1012"]),
  c("MAT3007", "Optimization", [], ["MAT2041", "MAT2050"]),
  c("MAT3007H", "Honours Optimization", [], ["MAT2041A", "MAT2050"]),
  c("STA2002", "Probability and Statistics II", [], ["STA2001"]),
  c("STA2002H", "Honours Probability and Statistics II", [], ["STA2001H"]),
  c("STA3005", "Statistical Computing", [], ["STA2002H"]),
  c("STA3020", "Statistical Inference", [], ["STA2002H"]),
  c("STA3042", "Statistical Learning", [], ["STA2002H", "STA3005"]),

  // Stream 1
  c("DDA3005", "Numerical Methods", ["math-stats"], ["MAT2041A", "CSC1001"]),
  c("DDA4002", "Stochastic Simulation", ["math-stats"], ["STA3020"]),
  c("DDA4080", "Capstone Project", ["math-stats", "methodology", "biostat", "finance", "computing-ml"], ["STA3042", "STA3020"], {
    term2Only: true,
    minYear: 3,
  }),
  c("MAT2002", "Ordinary Differential Equations", ["math-stats", "finance"], ["MAT1012", "MAT2041A"]),
  c("MAT3006", "Real Analysis", ["math-stats"], ["MAT2050"]),
  c("MAT3040", "Advanced Linear Algebra", ["math-stats"], ["MAT2041A"]),
  c("MAT3220", "Optimization II", ["math-stats"], ["MAT3007H"]),
  c("MAT3280", "Probability Theory", ["math-stats"], ["STA2001H", "MAT2050"]),
  c("STA4001", "Stochastic Processes", ["math-stats"], ["STA3020", "MAT3280"]),
  c("STA4001H", "Honours Stochastic Processes", ["math-stats"], ["STA3020", "MAT3280"]),
  c("STA4100", "Statistical Inference II", ["math-stats"], ["STA3020"]),

  // Stream 2
  c("DDA4010", "Bayesian Statistics", ["methodology", "biostat", "finance", "computing-ml"], ["STA3020"]),
  c("STA3001", "Linear Models", ["methodology"], ["STA2002H", "MAT2041A"], {
    offered: false,
    replacedBy: "STA3042",
    statusNote:
      "Not offered in the near future. Linear models content is covered in STA3042 Statistical Learning (major required).",
  }),
  c("STA3006", "Design and Analysis of Experiments", ["methodology"], ["STA3042"]),
  c("STA3007", "Nonparametric Statistics", ["methodology"], ["STA3020"]),
  c("STA3030", "Survey Sampling", ["methodology"], ["STA2002H"]),
  c("STA4002", "Multivariate Statistical Analysis", ["methodology"], ["STA3020", "STA3042"]),
  c("STA4003", "Time Series", ["methodology", "finance"], ["STA3020"]),
  c("STA4005", "Survival Modelling", ["methodology", "biostat"], ["STA3020"]),
  c("STA4030", "Categorical Data Analysis", ["methodology", "biostat"], ["STA3020"]),
  c("STA4041", "Causal Inference", ["methodology", "biostat", "finance"], ["STA3020"]),
  c("STA4102", "Generalized Linear Models", ["methodology", "biostat"], ["STA3042", "STA3020"]),

  // Stream 3
  c("BIM2005", "Computational Biology", ["biostat"], ["BIO1008"]),
  c("BIM3001", "Bioinformatics", ["biostat"], ["BIM2005"]),
  c("BIM3007", "Computational Genomics & Proteomics", ["biostat"], ["BIM3001"]),
  c("BIM3009", "Design and Analysis of Bioinformatics Algorithms", ["biostat"], ["CSC3100", "BIM3001"]),
  c("STA4012", "Statistical Genetics and Genomics", ["biostat"], ["STA3020", "BIM3001"]),
  c("STA4606", "Machine Learning for Biomedical Research", ["biostat"], ["STA3042"]),

  // Stream 4
  c("DDA3600", "Factor Investing", ["finance"], ["STA2002H"]),
  c("ECO3211", "Quantitative Methods for Policy Evaluation", ["finance"], ["STA2002H"]),
  c("FIN3380", "Financial Data Analysis with AI Tools", ["finance"], ["STA3005"]),
  c("FMA4200", "Financial Data Analysis", ["finance"], ["FIN2020"]),
  c("FMA4800", "Financial Computation", ["finance"], ["CSC1001", "MAT2041A"]),
  c("RMS4001", "Simulation Methods for Risk Management and Finance", ["finance"], ["STA3020"]),
  c("RMS4050", "Stochastic Calculus for Finance and Risk", ["finance"], ["MAT2002", "STA3020"]),
  c("RMS4060", "Risk Management with Derivatives", ["finance"], ["RMS4050"]),
  c("STA4020", "Statistical Modelling in Financial Markets", ["finance"], ["STA3020", "STA4003"]),

  // Stream 5
  c("CSC3002", "C/C++ Programming", ["computing-ml"], ["CSC1001"]),
  c("CSC3100", "Data Structures", ["computing-ml"], ["CSC1002", "CSC1001"]),
  c("CSC4120", "Design and Analysis of Algorithms", ["computing-ml"], ["CSC3100", "CSC3002"]),
  c("CSC4120H", "Honours Design and Analysis of Algorithms", ["computing-ml"], ["CSC3100", "CSC3002"]),
  c("DDA3020", "Machine Learning", ["computing-ml", "biostat"], ["CSC1001", "MAT2041A", "STA2002H"]),
  c("DDA3020H", "Honours Machine Learning", ["computing-ml"], ["CSC1001", "MAT2041A", "STA2002H"]),
  c("DDA4220", "Deep Learning and Applications", ["computing-ml"], ["DDA3020H"]),

  // Complementary electives
  c("CSC3001", "Discrete Mathematics", ["ce"], ["CSC1001"]),
  c("CSC3170", "Database System", ["ce"], ["CSC1002"]),
  c("DDA4210", "Advanced Machine Learning", ["ce"], ["DDA3020H"]),
  c("DDA4230", "Reinforcement Learning", ["ce"], ["DDA3020H", "MAT3007H"]),
  c("DDA4240", "Data Privacy and Ethics", ["ce"], ["DDA2001"]),
  c("DDA4250", "Mathematical Introduction to Deep Learning", ["ce"], ["MAT3007H", "MAT3040"]),
  c("DDA4260", "Networked Life", ["ce"], ["DDA2001"]),
  c("ECE2050", "Digital Logic and Systems", ["ce"], ["CSC1001"]),
  c("ECO3121", "Introductory Econometrics", ["ce"], ["STA2002H"]),
  c("FIN2010", "Financial Management", ["ce"], []),
  c("FIN2020", "Foundation of Finance", ["ce"], ["FIN2010"]),
  c("FIN3080", "Investment Analysis and Portfolio Management", ["ce"], ["FIN2020"]),
  c("FIN3210", "Fintech Theory and Practice", ["ce"], ["FIN2020", "CSC1001"]),
  c("FIN4110", "Options and Futures", ["ce"], ["FIN2020", "STA3020"]),
  c("FIN4120", "Fixed Income Securities Analysis", ["ce"], ["FIN3080"]),
  c("STA4010", "Selected Topics in Statistics I", ["ce"], ["STA3020"]),
  c("STA4011", "Selected Topics in Statistics II", ["ce"], ["STA4010"]),
];

export const COURSE_MAP = new Map(COURSES.map((course) => [course.code, course]));

export const ELECTIVE_POOL_CODES = COURSES.filter(
  (course) =>
    course.streams.length > 0 &&
    course.offered !== false &&
    !["BIO1008", "CSC1001", "CSC1002", "DDA2001", "PHY1001"].includes(course.code),
).map((course) => course.code);

export function courseLevel(code: string): number {
  const match = /\d{4}/.exec(code);
  return match ? parseInt(match[0], 10) : 0;
}
