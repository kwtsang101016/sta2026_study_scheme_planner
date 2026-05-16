import { parseCourseText } from "../lib/parseCourseText";
import { getCourse } from "../lib/courseUtils";
import "./CourseCode.css";

interface CourseCodeProps {
  code: string;
  /** Display text (defaults to full code). */
  display?: string;
  className?: string;
}

export function CourseCode({ code, display, className = "" }: CourseCodeProps) {
  const course = getCourse(code);
  const title = course?.title ?? "Unknown course";
  const streams = course?.streams.join(", ") ?? "";
  const shown = display ?? code;

  return (
    <span className={`course-code ${className}`} tabIndex={0}>
      <span className="course-code__text">{shown}</span>
      <span className="course-code__tooltip" role="tooltip">
        <strong>{code}</strong>
        <span>{title}</span>
        {course?.statusNote && (
          <span className="course-code__note">{course.statusNote}</span>
        )}
        {course && (
          <span className="course-code__meta">
            {course.offered === false ? "Not currently offered · " : ""}
            {course.units} unit{course.units !== 1 ? "s" : ""}
            {streams ? ` · ${streams}` : ""}
            {course.replacedBy ? ` · See ${course.replacedBy}` : ""}
          </span>
        )}
      </span>
    </span>
  );
}

/** Renders study-scheme course strings with tooltips on every course code. */
export function CourseCodeList({ text }: { text: string }) {
  const segments = parseCourseText(text);

  return (
    <>
      {segments.map((segment, index) => {
        if (segment.type === "text") {
          return <span key={`t-${index}`}>{segment.value}</span>;
        }
        return (
          <CourseCode
            key={`c-${index}-${segment.value}`}
            code={segment.value}
            display={segment.display}
          />
        );
      })}
    </>
  );
}
