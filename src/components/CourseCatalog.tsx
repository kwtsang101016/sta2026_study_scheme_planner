import { useMemo, useState } from "react";
import { COURSES } from "../data/courses";
import { STREAM_COLORS, STREAM_LABELS } from "../data/streams";
import type { StreamId } from "../data/types";
import { CourseCode } from "./CourseCode";
import "./CourseCatalog.css";

const POOL = COURSES.filter((c) => c.streams.length > 0);

export function CourseCatalog() {
  const [query, setQuery] = useState("");
  const [stream, setStream] = useState<StreamId | "all">("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return POOL.filter((course) => {
      if (stream !== "all" && !course.streams.includes(stream)) return false;
      if (!q) return true;
      return (
        course.code.toLowerCase().includes(q) ||
        course.title.toLowerCase().includes(q)
      );
    });
  }, [query, stream]);

  return (
    <section className="panel" id="catalog">
      <div className="panel__header">
        <h2>Course catalog</h2>
        <p>All major electives and complementary electives (CE). Hover codes for titles.</p>
      </div>
      <div className="catalog-filters">
        <input
          type="search"
          placeholder="Search code or title…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search courses"
        />
        <select
          value={stream}
          onChange={(e) => setStream(e.target.value as StreamId | "all")}
          aria-label="Filter by stream"
        >
          <option value="all">All streams</option>
          {(Object.keys(STREAM_LABELS) as StreamId[]).map((id) => (
            <option key={id} value={id}>
              {STREAM_LABELS[id]}
            </option>
          ))}
        </select>
      </div>
      <div className="catalog-table-wrap">
        <table className="catalog-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Title</th>
              <th>Stream</th>
              <th>Units</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((course) => (
              <tr
                key={course.code}
                className={course.offered === false ? "catalog-row--unavailable" : ""}
              >
                <td>
                  <CourseCode code={course.code} />
                </td>
                <td>{course.title}</td>
                <td>
                  <span className="catalog-streams">
                    {course.streams.map((id) => (
                      <span
                        key={id}
                        className="catalog-stream-tag"
                        style={{
                          borderColor: STREAM_COLORS[id],
                          color: STREAM_COLORS[id],
                        }}
                      >
                        {id === "ce" ? "CE" : STREAM_LABELS[id].split(" ")[0]}
                      </span>
                    ))}
                  </span>
                </td>
                <td>{course.units}</td>
                <td className="catalog-status">
                  {course.offered === false ? (
                    <span title={course.statusNote}>
                      Not offered
                      {course.replacedBy ? ` → ${course.replacedBy}` : ""}
                    </span>
                  ) : (
                    "Open"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="catalog-empty">No courses match your filters.</p>
        )}
      </div>
    </section>
  );
}
