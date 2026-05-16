export interface CourseTextSegment {
  type: "text" | "code";
  value: string;
  /** Shown in the UI when abbreviated (e.g. "3007H" instead of "MAT3007H"). */
  display?: string;
}

/**
 * Parses study-scheme course strings into hoverable course codes and plain text.
 * Handles prefixes (e.g. "School Package:"), commas, "or", and abbreviated codes
 * (e.g. "MAT3007 or 3007H" → MAT3007H).
 */
export function parseCourseText(text: string): CourseTextSegment[] {
  const segments: CourseTextSegment[] = [];

  const labelMatch = text.match(
    /^((?:School Package|Major Required|Major Elective\(s\)):\s*)(.*)$/i,
  );
  let body = text;
  if (labelMatch) {
    segments.push({ type: "text", value: labelMatch[1] });
    body = labelMatch[2];
  }

  const parts = body.split(/,\s*/).filter((part) => part.length > 0);
  let lastDept = "";

  parts.forEach((part, partIndex) => {
    if (partIndex > 0) {
      segments.push({ type: "text", value: ", " });
    }

    const orBits = part.trim().split(/\s+or\s+/i);
    orBits.forEach((bit, orIndex) => {
      if (orIndex > 0) {
        segments.push({ type: "text", value: " or " });
      }

      const token = bit.trim();
      const full = /^([A-Z]{2,4})(\d{4}[A-Z]?)$/.exec(token);
      if (full) {
        lastDept = full[1];
        segments.push({
          type: "code",
          value: full[1] + full[2],
          display: token,
        });
        return;
      }

      const abbrev = /^(\d{4}[A-Z]?)$/.exec(token);
      if (abbrev && lastDept) {
        segments.push({
          type: "code",
          value: lastDept + abbrev[1],
          display: token,
        });
        return;
      }

      segments.push({ type: "text", value: token });
    });
  });

  return segments;
}
