import { CORE_REQUIREMENTS_NOTE, PROGRAM_NOTES } from "../data/notes";
import "./Notes.css";

export function Notes() {
  return (
    <section className="panel" id="notes">
      <div className="panel__header">
        <h2>Programme notes</h2>
        <p>Key rules from the official study scheme (May 2026).</p>
      </div>
      <p className="notes-core">{CORE_REQUIREMENTS_NOTE}</p>
      <div className="notes-grid">
        {PROGRAM_NOTES.map((note) => (
          <article key={note.id} className="note-card">
            <h3>{note.title}</h3>
            <p>{note.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
