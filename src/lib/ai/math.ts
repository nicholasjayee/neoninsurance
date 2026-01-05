export interface ContextVector {
  [keyword: string]: number; // Keyword -> Weight (0-1)
}

/**
 * Exponential Decay Function
 * N(t) = N0 * e^(-lambda * t)
 */
export function calculateDecay(initialValue: number, timeSteps: number, lambda: number = 0.5): number {
  return initialValue * Math.exp(-lambda * timeSteps);
}

/**
 * Cosine Similarity
 * similarity = (A . B) / (||A|| * ||B||)
 */
export function cosineSimilarity(vecA: ContextVector, vecB: ContextVector): number {
  const intersection = Object.keys(vecA).filter(k => k in vecB);
  
  let dotProduct = 0;
  for (const key of intersection) {
    dotProduct += vecA[key] * vecB[key];
  }

  const magnitudeA = Math.sqrt(Object.values(vecA).reduce((sum, val) => sum + val * val, 0));
  const magnitudeB = Math.sqrt(Object.values(vecB).reduce((sum, val) => sum + val * val, 0));

  if (magnitudeA === 0 || magnitudeB === 0) return 0;

  return dotProduct / (magnitudeA * magnitudeB);
}
