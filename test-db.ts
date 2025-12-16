import { prisma } from "./src/lib/prisma";

async function testDb() {
  console.log("Testing DB access...");
  
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const blogPosts = await (prisma as any).blogPost.findMany({ take: 1 });
    console.log("Blog Posts found:", blogPosts.length);
    if (blogPosts.length > 0) console.log("- Title:", blogPosts[0].title);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const faqs = await (prisma as any).faq.findMany({ take: 1 });
    console.log("FAQs found:", faqs.length);
    if (faqs.length > 0) console.log("- Question:", faqs[0].question);

  } catch (error) {
    console.error("DB Error:", error);
  }
}

testDb().catch(console.error);
