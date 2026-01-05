import { KnowledgeBaseItem } from "./chatbotFallback";
import { ContextVector, calculateDecay, cosineSimilarity } from "./ai/math";
import { tokenize } from "./ai/tokenizer";
import { analyzeSentiment } from "./ai/sentiment";
import { KnowledgeCache, CachedKnowledgeItem } from "./ai/knowledge-cache";

// --- Types ---

interface Message {
  id: string;
  role: "system" | "user" | "assistant" | "data";
  content: string;
}

// --- Core AI Logic ---

export class AdvancedAIEngine {
  private knowledgeCache: KnowledgeCache;
  private contextVector: ContextVector = {};
  private responseHistory: string[] = [];
  private readonly MAX_HISTORY = 5;

  constructor(knowledgeBase: KnowledgeBaseItem[]) {
    // Initialize knowledge cache (pre-compute all expensive operations)
    this.knowledgeCache = new KnowledgeCache(knowledgeBase);
    
    // Log cache stats for debugging
    const stats = this.knowledgeCache.getStats();
    console.log(`[AI Engine] Initialized with ${stats.totalItems} categories, ${stats.totalPatterns} patterns, ${stats.totalKeywords} keywords`);
  }

  /**
   * Update the context vector based on new user input.
   * Applies decay to existing context before adding new terms.
   */
  public updateContext(userMessage: string) {
    // 1. Decay existing context
    for (const key in this.contextVector) {
      this.contextVector[key] = calculateDecay(this.contextVector[key], 1); // Decay by 1 step
      if (this.contextVector[key] < 0.1) delete this.contextVector[key]; // Prune weak context
    }

    // 2. Add new terms
    const tokens = tokenize(userMessage);
    for (const token of tokens) {
      this.contextVector[token] = (this.contextVector[token] || 0) + 1.0; // Boost current terms
    }
  }

  /**
   * Analyze sentiment of the message.
   */
  public analyzeSentiment(text: string): number {
    return analyzeSentiment(text);
  }

  /**
   * Calculate the match score for a cached knowledge base item (OPTIMIZED)
   */
  private scoreItem(cached: CachedKnowledgeItem, userTokens: string[], sentiment: number, rawMessage: string): number {
    let score = 0;

    // 1. Vector Similarity (Keyword Match) - Use pre-computed vector
    const inputVector: ContextVector = {};
    userTokens.forEach(t => inputVector[t] = 1);

    const similarity = cosineSimilarity(inputVector, cached.keywordVector);
    score += similarity * 50; // Base weight

    // 2. Context Relevance (Historical)
    const contextSimilarity = cosineSimilarity(this.contextVector, cached.keywordVector);
    score += contextSimilarity * 30; // Context weight

    // 3. Pattern Matching (Regex) - Use pre-compiled patterns
    for (const pattern of cached.compiledPatterns) {
      if (pattern.test(rawMessage)) {
        score += 100; // Massive boost for regex match
        break; // One match is enough
      }
    }

    // 4. Priority
    score += cached.item.priority;

    // 5. Sentiment Adjustment
    if (sentiment < -0.5 && (cached.item.category.includes("support") || cached.item.category.includes("complaint"))) {
      score += 20;
    }

    return score;
  }

  /**
   * Main function to get the best response (OPTIMIZED)
   */
  public getResponse(messages: Message[]): string {
    const lastUserMessage = messages.slice().reverse().find(m => m.role === "user");
    if (!lastUserMessage) return "How can I help you?";

    const userText = lastUserMessage.content;
    
    // 1. Update Context
    this.updateContext(userText);
    
    // 2. Analyze Sentiment
    const sentiment = this.analyzeSentiment(userText);
    const userTokens = tokenize(userText);

    // 3. Score all items with early exit optimization
    const scoredItems: Array<{ item: KnowledgeBaseItem; score: number }> = [];
    
    // Iterate through sorted items (high priority first)
    for (const cached of this.knowledgeCache.getAllSorted()) {
      const score = this.scoreItem(cached, userTokens, sentiment, userText);
      
      // Early exit: If pattern match + high priority, stop immediately
      // Score > 110 means pattern match (100) + priority (10+)
      if (score > 110 && cached.item.priority >= 10) {
        scoredItems.push({ item: cached.item, score });
        break; // Found high-confidence match, no need to check others
      }
      
      scoredItems.push({ item: cached.item, score });
    }

    // 4. Sort (only if we didn't early exit)
    scoredItems.sort((a, b) => b.score - a.score);
    const bestMatch = scoredItems[0];

    // 5. Select Response with Repetition Penalty
    if (bestMatch && bestMatch.score > 25) {
      const potentialResponses = bestMatch.item.responses;
      
      // Filter out recently used responses
      const availableResponses = potentialResponses.filter(r => !this.responseHistory.includes(r));
      
      let selectedResponse = "";
      if (availableResponses.length > 0) {
        selectedResponse = availableResponses[Math.floor(Math.random() * availableResponses.length)];
      } else {
        // If all used, pick random
        selectedResponse = potentialResponses[Math.floor(Math.random() * potentialResponses.length)];
      }

      // Update History
      this.responseHistory.push(selectedResponse);
      if (this.responseHistory.length > this.MAX_HISTORY) this.responseHistory.shift();

      return selectedResponse;
    }

    // Default Fallback
    const defaultCached = this.knowledgeCache.getCached("default");
    return defaultCached?.item.responses[0] || "I'm not sure I understand. Can you rephrase?";
  }
}

// Singleton instance helper (optional, but good for statefulness if serverless allows)
// Note: In Next.js serverless, state is lost between requests. 
// To truly persist context, we need to pass the history back and forth or store it in DB/Redis.
// For this implementation, we will rebuild the context from the message history passed in the request.

export function getAdvancedResponse(messages: Message[], knowledgeBase: KnowledgeBaseItem[]): string {
  const engine = new AdvancedAIEngine(knowledgeBase);
  
  // Replay history to build context
  // We only care about user messages for context building
  const userMessages = messages.filter(m => m.role === "user");
  
  // We process all previous messages to build up the context vector state
  // The last message is the one we respond to.
  for (let i = 0; i < userMessages.length - 1; i++) {
    engine.updateContext(userMessages[i].content);
  }

  // The engine.getResponse will process the last message
  return engine.getResponse(messages);
}
