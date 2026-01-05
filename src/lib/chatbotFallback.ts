// chatbotFallback.ts

import { readFile } from "fs/promises";
import { join } from "path";

interface Message {
  id: string;
  role: "system" | "user" | "assistant" | "data";
  content: string;
}

export interface KnowledgeBaseItem {
  category: string;
  patterns: string[];
  keywords: string[];
  responses: string[];
  priority: number;
}

interface MatchScore {
  item: KnowledgeBaseItem;
  score: number;
  matchedKeywords: string[];
  isNegated: boolean;
}

const SYNONYMS: Record<string, string[]> = {
  claim: ["report", "incident", "accident", "damage", "loss", "crash", "stolen", "theft"],
  quote: ["price", "cost", "how much", "rate", "premium", "estimate", "pricing", "rates"],
  motor: ["car", "vehicle", "auto", "driving", "driver", "insure"],
  home: ["house", "apartment", "building", "property", "condo", "insure"],
  health: ["medical", "doctor", "hospital", "sick", "illness", "injury", "insure"],
  travel: ["trip", "flight", "holiday", "vacation", "abroad", "insure"],
  help: ["assist", "support", "guide", "contact", "talk to", "contacts", "phone", "email", "whatsapp"],
  getting_started: ["package", "packages", "product", "products", "options", "offer", "offers"],
};

const NEGATION_WORDS = new Set(["not", "no", "don", "dont", "never", "cant", "won", "wont", "stop", "neither", "nor"]);

const KEYWORD_WEIGHTS: Record<string, number> = {
  claim: 25,
  quote: 25,
  price: 20,
  cost: 20,
  motor: 20,
  home: 20,
  health: 20,
  travel: 20,
  insure: 20,
  policy: 20,
  policies: 20,
  help: 20,
  contact: 20,
  support: 20,
  whatsapp: 25,
  expire: 25,
  due: 25,
  deductible: 25,
  discount: 25,
  active: 25,
  covered: 25,
  coverage: 25,
  emergency: 30,
  urgent: 30,
};

/**
 * Extract keywords and detect negation
 */
function processText(text: string): { keywords: string[]; isNegated: boolean } {
  const stopWords = new Set([
    "a", "an", "the", "is", "are", "was", "were", "be", "been", "being",
    "have", "has", "had", "do", "does", "did", "will", "would", "should",
    "could", "may", "might", "must", "i", "you", "he", "she", "it", "we",
    "they", "what", "which", "who", "when", "where", "why", "how", "to",
    "from", "in", "on", "at", "by", "for", "with", "about", "as", "of",
    "and", "or", "but", "my", "your", "me", "mine", "t", "s", "re", "ll", "d", "m", "ve",
  ]);

  const words = text
    .toLowerCase()
    .replace(/n't/g, " not") // Convert "don't" to "do not"
    .replace(/'s/g, " is")
    .replace(/'re/g, " are")
    .replace(/'ll/g, " will")
    .replace(/'ve/g, " have")
    .replace(/'m/g, " am")
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.trim().length > 0);


  let isNegated = false;
  const keywords: string[] = [];

  for (const word of words) {
    if (NEGATION_WORDS.has(word)) {
      isNegated = true;
    } else if (!stopWords.has(word)) {
      keywords.push(word);
      // Add synonyms as keywords too
      for (const [key, syns] of Object.entries(SYNONYMS)) {
        if (syns.includes(word)) {
          keywords.push(key);
        }
      }
    }
  }

  return { keywords, isNegated };
}

/**
 * Fuzzy matching (Levenshtein distance)
 */
function fuzzyMatch(word1: string, word2: string): number {
  const len1 = word1.length;
  const len2 = word2.length;
  if (len1 === 0) return len2 === 0 ? 1 : 0;
  if (len2 === 0) return len1 === 0 ? 1 : 0;

  const matrix: number[][] = [];

  for (let i = 0; i <= len1; i++) matrix[i] = [i];
  for (let j = 0; j <= len2; j++) matrix[0][j] = j;

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = word1[i - 1] === word2[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  const distance = matrix[len1][len2];
  const maxLen = Math.max(len1, len2);
  return 1 - distance / maxLen;
}

/**
 * Detect question type and intent
 */
export function detectIntent(message: string): { type: string; priorityCategory?: string } {
  const lowerMessage = message.toLowerCase();

  if (/\b(my policy|my plan|my cover|expire|due|deductible|id card|discount|statement|active|change|payment|senior|veteran|student|driver|covered|coverage)s?\b/.test(lowerMessage)) return { type: "sensitive", priorityCategory: "policy_management" };
  if (/\b(claim|report|accident|incident)\b/.test(lowerMessage)) return { type: "action", priorityCategory: "claims" };
  if (/\b(quote|price|cost|how much|rate|rates|pricing)\b/.test(lowerMessage)) return { type: "inquiry", priorityCategory: "quotes" };
  if (/\b(help|assist|support|contact|contacts|phone|email)\b/.test(lowerMessage)) return { type: "help_request", priorityCategory: "contact_support" };
  if (/\b(start|begin|new|first time)\b/.test(lowerMessage)) return { type: "onboarding", priorityCategory: "getting_started" };
  
  if (/\b(package|packages|product|products|option|options)\b/.test(lowerMessage)) return { type: "inquiry", priorityCategory: "getting_started" };
  if (/\bwhatsapp\b/.test(lowerMessage)) return { type: "action", priorityCategory: "contact_support" };
  if (/\b(who are you|what is your name|are you (an ai|a bot|a robot|human))\b/.test(lowerMessage)) return { type: "identity", priorityCategory: "about_ai" };
  if (/^(how|what|when|where|why|who)/.test(lowerMessage)) return { type: "informational" };
  if (/\b(can i|could i|may i|am i able)\b/.test(lowerMessage)) return { type: "capability" };
  if (/\?$/.test(message.trim())) return { type: "question" };

  return { type: "statement" };
}

/**
 * Scoring Logic
 */
export function calculateMatchScore(
  userMessage: string,
  item: KnowledgeBaseItem,
  conversationContext: string[],
  intent: { type: string; priorityCategory?: string }
): MatchScore {
  let score = 0;
  const { keywords: userKeywords, isNegated } = processText(userMessage);
  const matchedKeywords: string[] = [];

  // 1. KEYWORD MATCHING
  if (item.keywords && item.keywords.length > 0) {
    for (const itemKeyword of item.keywords) {
      for (const userWord of userKeywords) {
        // Exact match
        if (userWord === itemKeyword) {
          const weight = KEYWORD_WEIGHTS[itemKeyword] || 10;
          score += weight;
          matchedKeywords.push(userWord);
          break;
        }
        // Fuzzy match
        if (Math.abs(userWord.length - itemKeyword.length) <= 2) {
          const similarity = fuzzyMatch(userWord, itemKeyword);
          const threshold = itemKeyword.length < 5 ? 0.9 : 0.8;
          if (similarity >= threshold) {
            const weight = (KEYWORD_WEIGHTS[itemKeyword] || 10) * 0.7;
            score += weight;
            matchedKeywords.push(userWord);
            break;
          }
        }
      }
    }
  }

  // 2. PATTERN MATCHING
  for (const patternStr of item.patterns) {
    try {
      const match = patternStr.match(/^\/(.+)\/([gimuy]*)$/);
      if (match) {
        const pattern = new RegExp(match[1], match[2]);
        if (pattern.test(userMessage)) score += 30;
      } else {
        if (new RegExp(patternStr, "i").test(userMessage)) score += 30;
      }
    } catch {
      // Ignore invalid regex
    }
  }

  // 3. INTENT & CATEGORY MATCHING
  if (intent.priorityCategory === item.category) {
    score += 20;
  }

  // 4. PRIORITY & CONTEXT
  score += item.priority;
  if (conversationContext.includes(item.category)) {
    score += 10;
  }

  // 5. NEGATION PENALTY
  if (isNegated && matchedKeywords.length > 0) {
    // If negated, heavily penalize the score for this item
    score -= 100;
  }

  return { item, score, matchedKeywords, isNegated };
}

/**
 * Get conversation context
 */
function getConversationContext(messages: Message[]): string[] {
  const recentMessages = messages.slice(-3);
  const context: string[] = [];
  for (const msg of recentMessages) {
    const { keywords } = processText(msg.content);
    context.push(...keywords);
  }
  return context;
}

export function getFallbackResponse(
  messages: Message[],
  knowledgeBase?: KnowledgeBaseItem[]
): string {
  const lastUserMessage = messages
    .slice()
    .reverse()
    .find((m) => m.role === "user");

  if (!lastUserMessage) {
    return "How can I help you today?";
  }

  if (!knowledgeBase || knowledgeBase.length === 0) {
    console.error("Chatbot Error: Database returned no knowledge base items.");
    return "I'm having trouble accessing my knowledge base right now. Please try again later.";
  }

  const content = lastUserMessage.content;
  const conversationContext = getConversationContext(messages);
  const intent = detectIntent(content);

  // Score all DB items
  const scores: MatchScore[] = knowledgeBase.map((item) =>
    calculateMatchScore(content, item, conversationContext, intent)
  );

  // Sort highest score first
  scores.sort((a, b) => b.score - a.score);

  const bestMatch = scores[0];
  const CONFIDENCE_THRESHOLD = 15; // Increased threshold due to higher weights

  // Return best match if it meets threshold
  if (
    bestMatch &&
    bestMatch.score >= CONFIDENCE_THRESHOLD &&
    bestMatch.item.category !== "default"
  ) {
    const responses = bestMatch.item.responses;
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // Find default category from DB
  const defaultItem = knowledgeBase.find((item) => item.category === "default");
  if (defaultItem && defaultItem.responses.length > 0) {
    return defaultItem.responses[
      Math.floor(Math.random() * defaultItem.responses.length)
    ];
  }

  return "I'm not sure I understand. Could you rephrase that? I can help with claims, quotes, and general insurance information.";
}

/**
 * Load knowledge base from JSON file (for testing)
 */
export async function loadKnowledgeBase(): Promise<KnowledgeBaseItem[]> {
  try {
    const filePath = join(process.cwd(), "prisma", "data", "knowledgeBase.json");
    const fileContent = await readFile(filePath, "utf-8");
    const data = JSON.parse(fileContent);
    return data as KnowledgeBaseItem[];
  } catch (error) {
    console.error("Failed to load knowledge base:", error);
    return [];
  }
}

