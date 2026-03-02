"use server";

const API_URL = "https://neon-bot-api.vercel.app/chat";

export async function askNeonBot(message: string, history: { role: string; content: string }[] = []) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, history }),
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return data.response as string;
  } catch (error) {
    console.error("Chatbot API Error:", error);
    return "I'm having trouble connecting to the insurance expert right now. Please try again later.";
  }
}
