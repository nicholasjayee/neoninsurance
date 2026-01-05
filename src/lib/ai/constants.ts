export const STOP_WORDS = new Set([
  "a", "an", "the", "is", "are", "was", "were", "be", "been", "being",
  "have", "has", "had", "do", "does", "did", "will", "would", "should",
  "could", "may", "might", "must", "i", "he", "she", "it", "we",
  "they", "to",
  "from", "in", "on", "at", "by", "for", "with", "about", "as", "of",
  "and", "or", "but", "my", "your", "me", "mine", "t", "s", "re", "ll", "d", "m", "ve",
  "please"
]);

export const SENTIMENT_LEXICON: Record<string, number> = {
  // Positive
  good: 1, great: 2, excellent: 2, amazing: 2, happy: 1, thanks: 1, helpful: 1,
  love: 2, best: 2, awesome: 2, perfect: 2, appreciate: 1,
  // Negative
  bad: -1, terrible: -2, awful: -2, hate: -2, worst: -2, angry: -2, upset: -2,
  sad: -1, disappointed: -2, useless: -2, broken: -1, slow: -1, wrong: -1,
  fail: -1, failure: -2, problem: -1, issue: -1, error: -1
};
