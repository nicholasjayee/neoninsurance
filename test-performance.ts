#!/usr/bin/env ts-node
/**
 * Performance Test for AI Engine
 * Measures response time improvements from optimizations
 */

import { getAdvancedResponse } from "./src/lib/advanced-ai-engine";
import { loadKnowledgeBase } from "./src/lib/chatbotFallback";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

// Test queries covering different categories
const testQueries = [
  "what is insurance?",
  "how does insurance work?",
  "tell me about neon insurance",
  "why should I choose neon?",
  "what services do you offer?",
  "how to claim motor insurance",
  "I need marine cargo insurance",
  "tell me about life insurance",
  "what is motor third party insurance?",
  "how to pay for digital sticker?",
  "do you have travel insurance?",
  "what is professional indemnity?",
  "I need health insurance",
  "tell me about medical insurance",
  "what is group personal accident?",
  "hi there",
  "who are you?",
  "thank you",
  "how can I contact you?",
  "what is your phone number?",
];

async function runPerformanceTest() {
  console.log("🚀 AI Engine Performance Test\n");
  console.log("=" .repeat(60));
  
  // Load knowledge base
  const knowledgeBase = await loadKnowledgeBase();
  console.log(`✅ Loaded ${knowledgeBase.length} categories\n`);
  
  // Warm-up run (initialize cache)
  console.log("🔥 Warming up cache...");
  const warmupMessage: Message = {
    id: "warmup",
    role: "user",
    content: "hello"
  };
  getAdvancedResponse([warmupMessage], knowledgeBase);
  console.log("✅ Cache warmed up\n");
  
  // Performance test
  console.log("⏱️  Running performance test...\n");
  const times: number[] = [];
  
  for (let i = 0; i < testQueries.length; i++) {
    const query = testQueries[i];
    const message: Message = {
      id: `test-${i}`,
      role: "user",
      content: query
    };
    
    const startTime = performance.now();
    const response = getAdvancedResponse([message], knowledgeBase);
    const endTime = performance.now();
    
    const duration = endTime - startTime;
    times.push(duration);
    
    console.log(`Query ${i + 1}/${testQueries.length}: ${duration.toFixed(2)}ms`);
    console.log(`  Q: "${query}"`);
    console.log(`  A: "${response.substring(0, 60)}..."\n`);
  }
  
  // Statistics
  console.log("=" .repeat(60));
  console.log("\n📊 Performance Statistics:\n");
  
  const avgTime = times.reduce((a, b) => a + b, 0) / times.length;
  const minTime = Math.min(...times);
  const maxTime = Math.max(...times);
  const medianTime = times.sort((a, b) => a - b)[Math.floor(times.length / 2)];
  
  console.log(`  Average Response Time: ${avgTime.toFixed(2)}ms`);
  console.log(`  Median Response Time:  ${medianTime.toFixed(2)}ms`);
  console.log(`  Fastest Response:      ${minTime.toFixed(2)}ms`);
  console.log(`  Slowest Response:      ${maxTime.toFixed(2)}ms`);
  console.log(`  Total Queries:         ${times.length}`);
  
  // Performance rating
  console.log("\n🎯 Performance Rating:");
  if (avgTime < 10) {
    console.log("  ⭐⭐⭐⭐⭐ EXCELLENT (< 10ms avg)");
  } else if (avgTime < 20) {
    console.log("  ⭐⭐⭐⭐ VERY GOOD (< 20ms avg)");
  } else if (avgTime < 30) {
    console.log("  ⭐⭐⭐ GOOD (< 30ms avg)");
  } else if (avgTime < 50) {
    console.log("  ⭐⭐ ACCEPTABLE (< 50ms avg)");
  } else {
    console.log("  ⭐ NEEDS IMPROVEMENT (> 50ms avg)");
  }
  
  console.log("\n" + "=".repeat(60));
}

// Run the test
runPerformanceTest().catch(console.error);
