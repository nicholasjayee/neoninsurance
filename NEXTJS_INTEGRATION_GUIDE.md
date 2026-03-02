# Next.js Integration Guide: Neon Insurance AI Bot

This guide explains how to connect your Next.js frontend to the Neon Bot API hosted at `https://neon-bot-api.vercel.app`.

---

## 1. API Endpoint Overview

- **Endpoint**: `POST https://neon-bot-api.vercel.app/chat`
- **Method**: `POST`
- **Content-Type**: `application/json`

### Request Body
```json
{
  "message": "User query here",
  "history": [
    { "role": "user", "content": "Previous message" },
    { "role": "assistant", "content": "Previous response" }
  ]
}
```

### Response Body
```json
{
  "response": "AI generated message here"
}
```

---

## 2. Recommended Implementation (Server Actions)

Using Next.js Server Actions is the most secure and performant way to interact with the API. It avoids exposing your API URL directly to the browser and handles CORS seamlessly.

### Step 1: Create the Server Action
In your `src/app/actions/chatbot.ts` (or similar file):

```typescript
"use server"

const API_URL = "https://neon-bot-api.vercel.app/chat";

export async function askNeonBot(message: string, history: any[] = []) {
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
    return data.response;
  } catch (error) {
    console.error("Chatbot API Error:", error);
    return "I'm having trouble connecting to the insurance expert right now. Please try again later.";
  }
}
```

---

## 3. Creating a Simple Chat Component

Here is a basic example using Tailwind CSS for a chat interface:

```tsx
"use client"

import { useState } from "react";
import { askNeonBot } from "@/app/actions/chatbot";

export default function InsuranceChat() {
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    // Call the server action
    const botReply = await askNeonBot(input, messages);
    
    setMessages((prev) => [...prev, { role: "assistant", content: botReply }]);
    setLoading(false);
  }

  return (
    <div className="flex flex-col h-[500px] w-full max-w-md border rounded-lg shadow-lg bg-white overflow-hidden">
      <div className="bg-blue-600 p-4 text-white font-bold">Neon Insurance Assistant</div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl ${m.role === "user" ? "bg-blue-500 text-white shadow-sm" : "bg-gray-100 text-gray-800"}`}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && <div className="text-gray-400 italic text-sm">Neon Bot is typing...</div>}
      </div>

      <div className="p-4 border-t flex gap-2">
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask about car, life, or health insurance..."
          className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-500 bg-white"
        />
        <button 
          onClick={handleSend}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}
```

---

## 4. Best Practices

1. **State Management**: For production apps, consider using a library like `react-query` or `swr` for more robust state handling and re-validation, although simple `useState` works fine for a basic widget.
2. **Streaming**: Currently, the API returns the full response at once. If you want a "streaming" effect (words appearing one by one), you would need to refactor the FastAPI backend to use `StreamingResponse` and use a reader in the frontend.
3. **Persisting Chat**: To keep chat history after a page refresh, you can store the `messages` array in `localStorage` or save it to a database (like the Vercel Postgres DB we set up) via another Server Action.
4. **Error Boundaries**: Wrap your chat component in a React Error Boundary to prevent a single API failure from crashing your entire dashboard.
