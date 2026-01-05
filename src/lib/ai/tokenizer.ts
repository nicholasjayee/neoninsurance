import { STOP_WORDS } from "./constants";
import { stem } from "./stemmer";

// LRU Cache for tokenization (avoid repeated processing)
const tokenCache = new Map<string, string[]>();
const MAX_CACHE_SIZE = 100;

/**
 * Tokenize and Stem with memoization
 */
export function tokenize(text: string): string[] {
  // Check cache first
  if (tokenCache.has(text)) {
    return tokenCache.get(text)!;
  }
  
  // Tokenize
  const tokens = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter(w => w.length > 0 && !STOP_WORDS.has(w))
    .map(stem);
  
  // LRU eviction: Remove oldest entry if cache is full
  if (tokenCache.size >= MAX_CACHE_SIZE) {
    const firstKey = tokenCache.keys().next().value;
    if (firstKey !== undefined) {
      tokenCache.delete(firstKey);
    }
  }
  
  // Cache result
  tokenCache.set(text, tokens);
  return tokens;
}
