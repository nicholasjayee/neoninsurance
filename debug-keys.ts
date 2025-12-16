import { prisma } from "./src/lib/prisma";

async function debugPrisma() {
  console.log("Prisma keys:", Object.keys(prisma));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  console.log("BlogPost model:", (prisma as any).blogPost);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  console.log("Faq model:", (prisma as any).faq);
}

debugPrisma().catch(console.error);
