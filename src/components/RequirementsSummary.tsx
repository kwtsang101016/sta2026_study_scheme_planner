import { STREAM_COLORS, STREAM_LABELS } from "../data/streams";
import type { StreamId } from "../data/types";
import "./RequirementsSummary.css";

const REQUIREMENTS = [
  {
    label: "School Package",
    units: 25,
    detail: "BIO1008, CSC1001, 1002, DDA2001, MAT1001/1011, 1002/1012, 2041/2041A, PHY1001, STA2001H",
  },
  {
    label: "Major Required",
    units: 18,
    detail: "MAT2050, 3007/3007H, STA2002H, 3005, 3020, 3042",
  },
  {
    label: "Major Electives",
    units: 27,
    detail: "27 units from streams or CE; depth: 3 courses in one stream",
  },
];

export function RequirementsSummary() {
  return (
    <section className="panel" id="requirements">
      <div className="panel__header">
        <h2>Major programme requirement</h2>
        <p>70 units minimum for Statistics (2025-26 intake and thereafter).</p>
      </div>
      <div className="req-total">
        <span className="req-total__number">70</span>
        <span className="req-total__label">units total</span>
      </div>
      <div className="req-bars">
        {REQUIREMENTS.map((item) => (
          <div key={item.label} className="req-bar">
            <div className="req-bar__head">
              <span>{item.label}</span>
              <strong>{item.units} units</strong>
            </div>
            <div className="req-bar__track">
              <div
                className="req-bar__fill"
                style={{ width: `${(item.units / 70) * 100}%` }}
              />
            </div>
            <p className="req-bar__detail">{item.detail}</p>
          </div>
        ))}
      </div>
      <div className="stream-legend">
        <h3>Five specialization streams</h3>
        <ul>
          {(Object.keys(STREAM_LABELS) as StreamId[])
            .filter((id) => id !== "ce")
            .map((id) => (
              <li key={id}>
                <span
                  className="stream-dot"
                  style={{ background: STREAM_COLORS[id] }}
                />
                {STREAM_LABELS[id]}
              </li>
            ))}
          <li>
            <span className="stream-dot" style={{ background: STREAM_COLORS.ce }} />
            {STREAM_LABELS.ce} (CE)
          </li>
        </ul>
      </div>
    </section>
  );
}
