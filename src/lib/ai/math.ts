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
 * Cosine Similarity (Optimized)
 * similarity = (A . B) / (||A|| * ||B||)
 * Single-pass algorithm for better performance
 */
export function cosineSimilarity(vecA: ContextVector, vecB: ContextVector): number {
  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;
  
  // Single pass through vecA
  for (const key in vecA) {
    const valA = vecA[key];
    magnitudeA += valA * valA;
    
    // Calculate dot product if key exists in vecB
    if (key in vecB) {
      dotProduct += valA * vecB[key];
    }
  }
  
  // Single pass through vecB for magnitude
  for (const key in vecB) {
    const valB = vecB[key];
    magnitudeB += valB * valB;
  }
  
  // Early exit if either vector is zero
  if (magnitudeA === 0 || magnitudeB === 0) return 0;
  
  return dotProduct / (Math.sqrt(magnitudeA) * Math.sqrt(magnitudeB));
}
