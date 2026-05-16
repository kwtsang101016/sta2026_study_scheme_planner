import { INTEREST_OPTIONS } from "../data/interests";
import "./InterestSelector.css";

interface InterestSelectorProps {
  selected: string[];
  onChange: (ids: string[]) => void;
}

export function InterestSelector({ selected, onChange }: InterestSelectorProps) {
  const toggle = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter((item) => item !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  return (
    <section className="panel interest-panel" id="interests">
      <header className="panel__header">
        <h2>What interests you?</h2>
        <p>
          Pick one or more areas. Electives can come from any stream or complementary
          electives (CE). We suggest matching stream(s) after building your plan.
        </p>
      </header>
      <div className="interest-grid">
        {INTEREST_OPTIONS.map((option) => {
          const active = selected.includes(option.id);
          return (
            <button
              key={option.id}
              type="button"
              className={`interest-card ${active ? "interest-card--active" : ""}`}
              onClick={() => toggle(option.id)}
              aria-pressed={active}
            >
              <span className="interest-card__label">{option.label}</span>
              <span className="interest-card__desc">{option.description}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
