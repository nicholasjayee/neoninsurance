import { getFallbackResponse, KnowledgeBaseItem } from "./src/lib/chatbotFallback";
import * as fs from 'fs';
import * as path from 'path';

const kbPath = path.join(process.cwd(), 'prisma/data/knowledgeBase.json');
const mockKnowledgeBase: KnowledgeBaseItem[] = JSON.parse(fs.readFileSync(kbPath, 'utf8'));

const testCases = [
  { input: "what exactly does my policy cover?", expected: "policy_management" },
  { input: "am i covered for flood damage or just fire", expected: "policy_management" },
  { input: "how do i add a new driver/car to my current plan", expected: "policy_management" },
  { input: "can you send me my digital ID card", expected: "policy_management" },
  { input: "what is my deductible amount for a glass claim", expected: "policy_management" },
  { input: "when does my policy expire", expected: "policy_management" },
  { input: "when is my next payment due", expected: "policy_management" },
  { input: "can i change my payment method", expected: "policy_management" },
  { input: "can i get a breakdown of the fees on my last statement", expected: "policy_management" },
  { input: "i missed a payment; is my coverage still active", expected: "policy_management" },
  { input: "do you offer discounts for good students or safe drivers", expected: "policy_management" },
  { input: "Are there any special rates for seniors or veterans", expected: "policy_management" },
];

console.log("Verifying Sensitive Query Redirections...\n");

let passCount = 0;
for (const test of testCases) {
  const messages = [{ id: "1", role: "user" as const, content: test.input }];
  const response = getFallbackResponse(messages, mockKnowledgeBase);
  
  const matchedItem = mockKnowledgeBase.find(item => item.responses.includes(response));
  const actualCategory = matchedItem ? matchedItem.category : "default";

  const status = actualCategory === test.expected ? "\x1b[32m✅ PASS\x1b[0m" : "\x1b[31m❌ FAIL\x1b[0m";
  if (actualCategory === test.expected) passCount++;
  console.log(`${status} | Input: "${test.input}" | Expected: ${test.expected} | Actual: ${actualCategory}`);
}

console.log(`\nSummary: ${passCount}/${testCases.length} passed.`);
if (passCount === testCases.length) {
  console.log("\x1b[32mAll sensitive queries correctly redirected!\x1b[0m");
} else {
  console.log("\x1b[31mSome redirections failed.\x1b[0m");
}
