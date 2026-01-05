import { KnowledgeBaseItem } from "./src/lib/chatbotFallback";
import { AdvancedAIEngine } from "./src/lib/advanced-ai-engine";
import { prisma } from "./src/lib/prisma";
import * as readline from 'readline';
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'User > '
});

console.log("--- Neon AI Interactive Tester (Advanced Engine) ---");
console.log("Connecting to Database...");

async function start() {
  try {
    let dbKnowledge = await prisma.chatbotKnowledge.findMany({
      where: { isActive: true }
    });
    
    console.log(`Loaded ${dbKnowledge.length} items from the database.`);
    
    // Initialize Engine
    let engine = new AdvancedAIEngine(dbKnowledge as unknown as KnowledgeBaseItem[]);
    const history: { id: string; role: "user" | "assistant" | "system" | "data"; content: string }[] = [];

    console.log("Type your message to test the new AI logic.");
    console.log("Commands:");
    console.log("  download - Dump DB knowledge to debug-knowledge.json");
    console.log("  seed     - Run 'npx prisma db seed' to reset DB");
    console.log("  exit     - Quit");
    console.log("\n");

    rl.prompt();

    rl.on('line', async (line) => {
      const input = line.trim();
      if (input.toLowerCase() === 'exit' || input.toLowerCase() === 'quit') {
        rl.close();
        return;
      }

      if (input.toLowerCase() === 'download') {
        try {
          console.log("Downloading knowledge base...");
          const items = await prisma.chatbotKnowledge.findMany();
          const outputPath = path.join(process.cwd(), "prisma/data/knowledgeBase.json");
          fs.writeFileSync(outputPath, JSON.stringify(items, null, 2));
          console.log(`Dumped ${items.length} items to ${outputPath}`);
        } catch (e) {
          console.error("Download failed:", e);
        }
        rl.prompt();
        return;
      }

      if (input.toLowerCase() === 'seed') {
        try {
          console.log("Seeding ChatbotKnowledge... (this is faster)");
          execSync('npx prisma db seed -- --model=ChatbotKnowledge', { stdio: 'inherit' });
          console.log("Seeding complete. Reloading engine...");
          
          // Reload engine
          dbKnowledge = await prisma.chatbotKnowledge.findMany({
            where: { isActive: true }
          });
          engine = new AdvancedAIEngine(dbKnowledge as unknown as KnowledgeBaseItem[]);
          console.log(`Reloaded ${dbKnowledge.length} items.`);
        } catch (e) {
          console.error("Seeding failed:", e);
        }
        rl.prompt();
        return;
      }

      if (input) {
        // Add user message to history
        history.push({ id: Date.now().toString(), role: 'user', content: input });

        // Get response from Advanced Engine
        const response = engine.getResponse(history);

        // Add assistant response to history
        history.push({ id: (Date.now() + 1).toString(), role: 'assistant', content: response });

        // Debug: Show Sentiment
        const sentiment = engine.analyzeSentiment(input);
        const sentimentStr = sentiment > 0.3 ? "Positive" : sentiment < -0.3 ? "Negative" : "Neutral";

        console.log(`\x1b[32mNeon AI\x1b[0m > ${response}`);
        console.log(`\x1b[90m[Sentiment: ${sentimentStr} (${sentiment.toFixed(2)})]\x1b[0m\n`);
      }

      rl.prompt();
    }).on('close', () => {
      console.log('\nGoodbye!');
      process.exit(0);
    });

  } catch (error) {
    console.error("Failed to load knowledge base from DB:", error);
    process.exit(1);
  }
}

start();
