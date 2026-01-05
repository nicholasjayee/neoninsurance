import { STOP_WORDS } from "./constants";
import { stem } from "./stemmer";

/**
 * Tokenize and Stem
 */
export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter(w => w.length > 0 && !STOP_WORDS.has(w))
    .map(stem);
}
