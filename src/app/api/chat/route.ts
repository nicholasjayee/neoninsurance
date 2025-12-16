// import { openai } from "@ai-sdk/openai";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText, convertToCoreMessages } from "ai";
// Ensure these paths match your file structure
import { getFallbackResponse, KnowledgeBaseItem } from "@/lib/chatbotFallback";
import { getKnowledgeBase } from "@/app/(app)/actions/chatbot";

export const maxDuration = 30;

export async function POST(req: Request) {
  let body;

  // 1. SAFELY Parse JSON Body (Fixes the SyntaxError crash)
  try {
    const text = await req.text(); // Read text first
    if (!text) {
      // Empty body? Use empty object
      body = {};
    } else {
      body = JSON.parse(text);
    }
  } catch (error) {
    console.error("Invalid JSON body:", error);
    return new Response("Invalid request body", { status: 400 });
  }

  const messages = body?.messages;

  // 2. Fetch Knowledge Base
  let knowledgeBase: KnowledgeBaseItem[] = [];
  try {
    const result = await getKnowledgeBase();
    if (result.success && result.knowledge) {
      knowledgeBase = result.knowledge as unknown as KnowledgeBaseItem[];
    }
  } catch (error) {
    console.error("Failed to fetch knowledge base:", error);
  }

  // 3. Validate messages
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    // If we have no messages, just return the greeting
    return new Response(
      "Hello! I'm Neon AI. How can I assist you with your insurance needs today?"
    );
  }

  // 4. Logic Gate: Fetch Active API Key from DB
  let apiKey = process.env.OPENAI_API_KEY; // Default to env var

  try {
    const { getActiveAiApiKey } = await import(
      "@/app/(app)/actions/ai-settings"
    );
    const result = await getActiveAiApiKey();
    if (result.success && result.key) {
      console.log(`Using Database API Key: ${result.key.name}`);
      apiKey = result.key.key;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err: unknown) {
    console.warn("Failed to fetch dynamic API key, falling back to env var");
  }

  if (!apiKey || apiKey.includes("dummy")) {
    console.log("No valid OpenAI API Key found. Using Local Keyword Logic.");
    const fallbackResponse = getFallbackResponse(messages, knowledgeBase);
    return new Response(fallbackResponse, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  // 5. Try OpenAI Streaming
  const openai = createOpenAI({ apiKey });
  try {
    const result = streamText({
      model: openai.languageModel("gpt-4-turbo"), // Pass dynamic key here
      messages: convertToCoreMessages(messages),
      system: `You are Neon AI, a helpful and professional insurance assistant for Neon Insurance Brokers Ltd in Uganda.
      If you don't know an answer, politely direct the user to contact support at +256 123 456 789.`,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("OpenAI API Error, switching to Fallback Logic:", error);

    // 6. Emergency Fallback
    const fallbackResponse = getFallbackResponse(messages, knowledgeBase);
    return new Response(fallbackResponse, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}
