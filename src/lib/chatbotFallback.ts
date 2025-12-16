// chatbotFallback.ts

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
}

/**
 * Extract keywords from user message
 */
function extractKeywords(text: string): string[] {
  const stopWords = new Set([
    "a",
    "an",
    "the",
    "is",
    "are",
    "was",
    "were",
    "be",
    "been",
    "being",
    "have",
    "has",
    "had",
    "do",
    "does",
    "did",
    "will",
    "would",
    "should",
    "could",
    "may",
    "might",
    "must",
    "i",
    "you",
    "he",
    "she",
    "it",
    "we",
    "they",
    "what",
    "which",
    "who",
    "when",
    "where",
    "why",
    "how",
    "to",
    "from",
    "in",
    "on",
    "at",
    "by",
    "for",
    "with",
    "about",
    "as",
    "of",
    "and",
    "or",
    "but",
    "my",
    "your",
    "me",
    "mine",
    "need",
    "want",
  ]);

  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.trim().length > 0 && !stopWords.has(word));
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
 * Detect question type
 */
function detectQuestionType(message: string): string {
  const lowerMessage = message.toLowerCase();

  if (/^(how|what|when|where|why|who)/.test(lowerMessage))
    return "informational";
  if (/\b(can i|could i|may i|am i able)\b/.test(lowerMessage))
    return "capability";
  if (/\b(help|assist|support)\b/.test(lowerMessage)) return "help_request";
  if (/\?$/.test(message.trim())) return "question";

  return "statement";
}

/**
 * Scoring Logic
 */
function calculateMatchScore(
  userMessage: string,
  item: KnowledgeBaseItem,
  conversationContext: string[],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  questionType: string
): MatchScore {
  let score = 0;
  const userKeywords = extractKeywords(userMessage);
  const matchedKeywords: string[] = [];

  // 1. KEYWORD MATCHING
  if (item.keywords && item.keywords.length > 0) {
    for (const itemKeyword of item.keywords) {
      for (const userWord of userKeywords) {
        // Exact match
        if (userWord === itemKeyword) {
          score += 10;
          matchedKeywords.push(userWord);
          break;
        }
        // Fuzzy match
        if (Math.abs(userWord.length - itemKeyword.length) <= 2) {
          const similarity = fuzzyMatch(userWord, itemKeyword);
          const threshold = itemKeyword.length < 5 ? 0.9 : 0.8;
          if (similarity >= threshold) {
            score += 7;
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
      // Handle regex stored as strings in DB like "/regex/flags"
      const match = patternStr.match(/^\/(.+)\/([gimuy]*)$/);
      if (match) {
        const pattern = new RegExp(match[1], match[2]);
        if (pattern.test(userMessage)) score += 25;
      } else {
        // Handle simple string patterns
        if (new RegExp(patternStr, "i").test(userMessage)) score += 25;
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      // Ignore invalid regex from DB
    }
  }

  // 3. PRIORITY & CONTEXT
  score += item.priority;
  if (conversationContext.includes(item.category)) {
    score += 5;
  }

  return { item, score, matchedKeywords };
}

/**
 * Get conversation context
 */
function getConversationContext(messages: Message[]): string[] {
  const recentMessages = messages.slice(-3);
  const context: string[] = [];
  for (const msg of recentMessages) {
    context.push(...extractKeywords(msg.content));
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

  // If DB didn't return data, we can't function.
  if (!knowledgeBase || knowledgeBase.length === 0) {
    console.error("Chatbot Error: Database returned no knowledge base items.");
    return "I'm having trouble accessing my knowledge base right now. Please try again later.";
  }

  const content = lastUserMessage.content;
  const conversationContext = getConversationContext(messages);
  const questionType = detectQuestionType(content);

  // Score all DB items
  const scores: MatchScore[] = knowledgeBase.map((item) =>
    calculateMatchScore(content, item, conversationContext, questionType)
  );

  // Sort highest score first
  scores.sort((a, b) => b.score - a.score);

  const bestMatch = scores[0];
  const CONFIDENCE_THRESHOLD = 8;

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

  return "I'm not sure I understand. Could you rephrase that?";
}
