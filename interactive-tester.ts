import { getFallbackResponse, KnowledgeBaseItem, calculateMatchScore, detectIntent } from "./src/lib/chatbotFallback";
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

const kbPath = path.join(process.cwd(), 'prisma/data/knowledgeBase.json');
const knowledgeBase: KnowledgeBaseItem[] = JSON.parse(fs.readFileSync(kbPath, 'utf8'));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'User > '
});

console.log("--- Neon AI Interactive Tester ---");
console.log("Type your message to test the fallback logic.");
console.log("Type \"exit\" or \"quit\" to stop.\n");

rl.prompt();

rl.on('line', (line) => {
  const input = line.trim();
  if (input.toLowerCase() === 'exit' || input.toLowerCase() === 'quit') {
    rl.close();
    return;
  }

  if (input) {
    const messages = [{ id: Date.now().toString(), role: 'user' as const, content: input }];
    const intent = detectIntent(input);
    
    // Calculate scores for all items
    const scores = knowledgeBase.map(item => {
      const result = calculateMatchScore(input, item, [], intent);
      return { category: item.category, score: result.score };
    }).sort((a, b) => b.score - a.score);

    const response = getFallbackResponse(messages, knowledgeBase);
    const matchedItem = knowledgeBase.find(item => item.responses.includes(response));
    const category = matchedItem ? matchedItem.category : 'default';

    console.log(`\x1b[32mNeon AI [\x1b[34m${category}\x1b[32m] >\x1b[0m ${response}`);
    console.log(`\x1b[90mTop Scores: ${scores.slice(0, 3).map(s => `${s.category}(${s.score.toFixed(1)})`).join(', ')}\x1b[0m\n`);
  }

  rl.prompt();
}).on('close', () => {
  console.log('\nGoodbye!');
  process.exit(0);
});
