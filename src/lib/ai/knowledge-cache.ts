import { KnowledgeBaseItem } from "../chatbotFallback";
import { ContextVector } from "./math";
import { tokenize } from "./tokenizer";

/**
 * Cached knowledge base item with pre-computed data
 */
export interface CachedKnowledgeItem {
  item: KnowledgeBaseItem;
  tokenizedKeywords: Set<string>;  // Pre-tokenized keywords
  compiledPatterns: RegExp[];      // Pre-compiled regex patterns
  keywordVector: ContextVector;    // Pre-computed vector for cosine similarity
}

/**
 * Knowledge Base Cache
 * Pre-computes and caches expensive operations for fast lookups
 */
export class KnowledgeCache {
  private cache: Map<string, CachedKnowledgeItem> = new Map();
  private sortedItems: CachedKnowledgeItem[] = [];
  
  constructor(knowledgeBase: KnowledgeBaseItem[]) {
    this.buildCache(knowledgeBase);
  }
  
  /**
   * Build the cache by pre-computing all expensive operations
   */
  private buildCache(knowledgeBase: KnowledgeBaseItem[]): void {
    for (const item of knowledgeBase) {
      const tokenizedKeywords = new Set<string>();
      const keywordVector: ContextVector = {};
      
      // Pre-tokenize all keywords
      for (const keyword of item.keywords) {
        const tokens = tokenize(keyword);
        tokens.forEach(token => {
          tokenizedKeywords.add(token);
          keywordVector[token] = 1;
        });
      }
      
      // Pre-compile all regex patterns
      const compiledPatterns: RegExp[] = [];
      for (const patternStr of item.patterns) {
        try {
          // Handle regex strings like "/hi|hello/i"
          const match = patternStr.match(/^\/(.+)\/([gimuy]*)$/);
          if (match) {
            compiledPatterns.push(new RegExp(match[1], match[2]));
          } else {
            // Simple string match fallback
            compiledPatterns.push(new RegExp(patternStr, "i"));
          }
        } catch (error) {
          // Ignore invalid regex
          console.warn(`Invalid regex pattern: ${patternStr}`, error);
        }
      }
      
      const cached: CachedKnowledgeItem = {
        item,
        tokenizedKeywords,
        compiledPatterns,
        keywordVector
      };
      
      this.cache.set(item.category, cached);
    }
    
    // Sort by priority (high to low) for early exit optimization
    this.sortedItems = Array.from(this.cache.values())
      .sort((a, b) => b.item.priority - a.item.priority);
  }
  
  /**
   * Get a cached item by category
   */
  getCached(category: string): CachedKnowledgeItem | undefined {
    return this.cache.get(category);
  }
  
  /**
   * Get all cached items sorted by priority (high to low)
   */
  getAllSorted(): CachedKnowledgeItem[] {
    return this.sortedItems;
  }
  
  /**
   * Get cache statistics
   */
  getStats(): { totalItems: number; totalPatterns: number; totalKeywords: number } {
    let totalPatterns = 0;
    let totalKeywords = 0;
    
    for (const cached of this.cache.values()) {
      totalPatterns += cached.compiledPatterns.length;
      totalKeywords += cached.tokenizedKeywords.size;
    }
    
    return {
      totalItems: this.cache.size,
      totalPatterns,
      totalKeywords
    };
  }
}
