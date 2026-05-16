import { useMemo, useState } from "react";
import { CourseCatalog } from "./components/CourseCatalog";
import { CoursePattern } from "./components/CoursePattern";
import { InterestSelector } from "./components/InterestSelector";
import { Notes } from "./components/Notes";
import { RequirementsSummary } from "./components/RequirementsSummary";
import { StreamInsight } from "./components/StreamInsight";
import { InstallHint } from "./components/InstallHint";
import { recommendElectives } from "./lib/recommendations";
import "./App.css";

const NAV = [
  { id: "interests", label: "Interests" },
  { id: "requirements", label: "Requirements" },
  { id: "pattern", label: "Your plan" },
  { id: "streams", label: "Stream fit" },
  { id: "catalog", label: "Catalog" },
  { id: "notes", label: "Notes" },
];

export default function App() {
  const [interests, setInterests] = useState<string[]>(["applied"]);

  const result = useMemo(
    () => recommendElectives(interests),
    [interests],
  );

  return (
    <div className="app">
      <header className="hero">
        <div className="hero__inner">
          <p className="hero__eyebrow">Statistics · CUHK-SZ · 2025-26 intake</p>
          <h1>Study Scheme Planner</h1>
          <nav className="hero__nav" aria-label="Sections">
            {NAV.map((item) => (
              <a key={item.id} href={`#${item.id}`}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="main">
        <InterestSelector selected={interests} onChange={setInterests} />
        <RequirementsSummary />
        <CoursePattern result={result} hasInterests={interests.length > 0} />
        <StreamInsight result={result} />
        <CourseCatalog />
        <Notes />
      </main>

      <InstallHint />

      <footer className="footer">
        <p>
          Based on the official Statistics study scheme (last update 13 May 2026).
          Verify prerequisites and offerings with the Registry before registration.
        </p>
      </footer>
    </div>
  );
}
