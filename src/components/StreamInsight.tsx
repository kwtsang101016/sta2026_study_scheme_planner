import { STREAM_COLORS, STREAM_LABELS } from "../data/streams";
import type { RecommendationResult, StreamId } from "../data/types";
import "./StreamInsight.css";

interface StreamInsightProps {
  result: RecommendationResult;
}

export function StreamInsight({ result }: StreamInsightProps) {
  const ranked = (Object.keys(STREAM_LABELS) as StreamId[])
    .filter((id) => id !== "ce")
    .map((id) => ({ id, count: result.streamCounts[id] }))
    .sort((a, b) => b.count - a.count);

  const top = ranked[0];
  const hasElectives = result.assignments.length > 0;

  return (
    <section className="panel stream-panel" id="streams">
      <div className="panel__header">
        <h2>Stream fit analysis</h2>
        <p>
          Based on your recommended electives (streams only — CE courses are not
          counted here). No stream declaration is required unless you choose to.
        </p>
      </div>

      {!hasElectives ? (
        <p className="stream-empty">Select interests to see stream recommendations.</p>
      ) : (
        <>
          {top && top.count > 0 && (
            <div className="stream-best">
              <span className="stream-best__label">Best match</span>
              <strong style={{ color: STREAM_COLORS[top.id] }}>
                {STREAM_LABELS[top.id]}
              </strong>
              <span className="stream-best__count">
                {top.count} of 9 elective slots
              </span>
            </div>
          )}

          <ul className="stream-bars">
            {ranked.map((item) => (
              <li key={item.id}>
                <div className="stream-bars__label">
                  <span
                    className="stream-dot"
                    style={{ background: STREAM_COLORS[item.id] }}
                  />
                  {STREAM_LABELS[item.id]}
                  <span>{item.count}</span>
                </div>
                <div className="stream-bars__track">
                  <div
                    className="stream-bars__fill"
                    style={{
                      width: `${(item.count / 9) * 100}%`,
                      background: STREAM_COLORS[item.id],
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>

          <div className="stream-badges">
            {result.depthStreams.length > 0 ? (
              <span className="badge badge--ok">
                Depth requirement met: {result.depthStreams.map((id) => STREAM_LABELS[id]).join(", ")}
              </span>
            ) : (
              <span className="badge badge--warn">
                Depth: need 3 courses in one stream
              </span>
            )}
            {result.declarationStreams.length > 0 && (
              <span className="badge badge--ok">
                Eligible to declare: {result.declarationStreams.map((id) => STREAM_LABELS[id]).join(", ")}
              </span>
            )}
          </div>

          {result.warnings.length > 0 && (
            <ul className="stream-warnings">
              {result.warnings.map((warning) => (
                <li key={warning}>{warning}</li>
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  );
}
