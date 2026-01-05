import { SENTIMENT_LEXICON } from "./constants";

/**
 * Analyze sentiment of the message.
 * Returns a score from -1 (Negative) to 1 (Positive).
 */
export function analyzeSentiment(text: string): number {
  const tokens = text.toLowerCase().split(/\s+/); // Don't stem for sentiment lookup
  let score = 0;
  let count = 0;

  for (const token of tokens) {
    if (token in SENTIMENT_LEXICON) {
      score += SENTIMENT_LEXICON[token];
      count++;
    }
  }

  if (count === 0) return 0;
  return Math.max(-1, Math.min(1, score / count)); // Normalize
}
