/**
 * Normalize whitespace: trim leading/trailing whitespace and collapse
 * internal runs of whitespace (spaces, tabs, newlines) into a single space.
 *
 * Explicitly returns an empty string for null/undefined.
 */
const formatText = (text: unknown): string => {
  if (text === null || text === undefined) return '';

  const s = String(text);

  return s.trim().replace(/\s+/g, ' ');
};

export default formatText;
