import { KnowledgeBaseItem } from "./chatbotFallback";
import { ContextVector, calculateDecay, cosineSimilarity } from "./ai/math";
import { tokenize } from "./ai/tokenizer";
import { analyzeSentiment } from "./ai/sentiment";

// --- Types ---

interface Message {
  id: string;
  role: "system" | "user" | "assistant" | "data";
  content: string;
}

// --- Core AI Logic ---

export class AdvancedAIEngine {
  private knowledgeBase: KnowledgeBaseItem[];
  private contextVector: ContextVector = {};
  private responseHistory: string[] = [];
  private readonly MAX_HISTORY = 5;

  constructor(knowledgeBase: KnowledgeBaseItem[]) {
    this.knowledgeBase = knowledgeBase;
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
   * Calculate the match score for a knowledge base item.
   */
  private scoreItem(item: KnowledgeBaseItem, userTokens: string[], sentiment: number, rawMessage: string): number {
    let score = 0;

    // 1. Vector Similarity (Keyword Match)
    // Create a vector for the item
    const itemVector: ContextVector = {};
    item.keywords.forEach(k => {
      // Tokenize phrases in keywords (e.g. "marine insurance" -> "marin", "insur")
      const kTokens = tokenize(k);
      kTokens.forEach(t => itemVector[t] = 1);
    });
    
    // Create a vector for the user input (current turn only)
    const inputVector: ContextVector = {};
    userTokens.forEach(t => inputVector[t] = 1);

    const similarity = cosineSimilarity(inputVector, itemVector);
    score += similarity * 50; // Base weight

    // 2. Context Relevance (Historical)
    const contextSimilarity = cosineSimilarity(this.contextVector, itemVector);
    score += contextSimilarity * 30; // Context weight

    // 3. Pattern Matching (Regex)
    // This is CRITICAL for specific phrases like "who are you" or "what is insurance"
    for (const patternStr of item.patterns) {
      try {
        // Handle regex strings like "/hi|hello/i"
        const match = patternStr.match(/^\/(.+)\/([gimuy]*)$/);
        if (match) {
          const pattern = new RegExp(match[1], match[2]);
          if (pattern.test(rawMessage)) {
            // console.log(`[AI Debug] Pattern Match: ${patternStr} for category ${item.category}`);
            score += 100; // Massive boost for regex match
            break; // One match is enough
          }
        } else {
          // Simple string match fallback
          if (new RegExp(patternStr, "i").test(rawMessage)) {
            score += 100;
            break;
          }
        }
      } catch {
        // Ignore invalid regex
      }
    }

    // 4. Priority
    score += item.priority;

    // 5. Sentiment Adjustment
    // If user is angry (sentiment < -0.5), boost "support" or "apology" categories
    if (sentiment < -0.5 && (item.category.includes("support") || item.category.includes("complaint"))) {
      score += 20;
    }

    return score;
  }

  /**
   * Main function to get the best response.
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

    // 3. Score all items
    const scoredItems = this.knowledgeBase.map(item => ({
      item,
      score: this.scoreItem(item, userTokens, sentiment, userText)
    }));

    // 4. Sort
    scoredItems.sort((a, b) => b.score - a.score);
    const bestMatch = scoredItems[0];

    // 5. Select Response with Repetition Penalty
    if (bestMatch && bestMatch.score > 25) { // Threshold (Must be > max priority of 15)
      const potentialResponses = bestMatch.item.responses;
      
      // Filter out recently used responses
      const availableResponses = potentialResponses.filter(r => !this.responseHistory.includes(r));
      
      let selectedResponse = "";
      if (availableResponses.length > 0) {
        selectedResponse = availableResponses[Math.floor(Math.random() * availableResponses.length)];
      } else {
        // If all used, pick random but least recently used (simplified: just random)
        selectedResponse = potentialResponses[Math.floor(Math.random() * potentialResponses.length)];
      }

      // Update History
      this.responseHistory.push(selectedResponse);
      if (this.responseHistory.length > this.MAX_HISTORY) this.responseHistory.shift();

      return selectedResponse;
    }

    // Default Fallback
    const defaultItem = this.knowledgeBase.find(i => i.category === "default");
    return defaultItem?.responses[0] || "I'm not sure I understand. Can you rephrase?";
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
