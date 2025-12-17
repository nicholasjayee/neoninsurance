/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

// New Data
import stories from "./seeds/data/stories.json";
import services from "./seeds/data/services.json";
import team from "./seeds/data/team.json";
import siteConfig from "./seeds/data/site-config.json";

// Previous Data (Restored)
import blogPosts from "./data/blogPosts.json";
import claims from "./data/claims.json";
import competitors from "./data/competitors.json";
import faqs from "./data/faqs.json";
import knowledgeBase from "./data/knowledgeBase.json";
import pricingFactors from "./data/pricingFactors.json";
import riskZones from "./data/riskZones.json";
import subscribers from "./data/subscribers.json";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Start seeding...");

  // --- Seed New Models ---
  console.log("Seeding Stories...");
  for (const story of stories) {
    await prisma.story.create({ data: story });
  }

  console.log("Seeding Services...");
  for (const service of services) {
    await prisma.service.create({ data: service });
  }

  console.log("Seeding Team...");
  for (const member of team) {
    await prisma.teamMember.create({ data: member });
  }

  console.log("Seeding Site Config...");
  await prisma.siteConfig.upsert({
    where: { key: "main" },
    update: siteConfig,
    create: siteConfig,
  });

  // --- Seed Previous Models ---

  console.log("Seeding Blog Posts...");
  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {
        ...post,
        publishedAt: new Date(post.publishedAt).toISOString(),
      },
      create: {
        ...post,
        publishedAt: new Date(post.publishedAt).toISOString(),
      },
    });
  }

  console.log("Seeding Claims...");
  for (const claim of claims) {
    await prisma.claim.create({
      data: {
        ...claim,
        incidentDate: new Date(claim.incidentDate).toISOString(),
        // Handle nested statusHistory creation if it exists in the JSON
        statusHistory: claim.statusHistory
          ? {
              create: claim.statusHistory.map((h: any) => ({
                status: h.status,
                notes: h.notes,
                createdAt: h.createdAt
                  ? new Date(h.createdAt).toISOString()
                  : undefined,
              })),
            }
          : undefined,
      } as any,
    });
  }

  console.log("Seeding Competitors...");
  for (const comp of competitors) {
    await prisma.competitor.upsert({
      where: { name: comp.name },
      update: comp,
      create: comp,
    });
  }

  console.log("Seeding FAQs...");
  for (const faq of faqs) {
    await prisma.faq.create({ data: faq });
  }

  console.log("Seeding Chatbot Knowledge...");
  for (const kb of knowledgeBase) {
    await prisma.chatbotKnowledge.create({ data: kb });
  }

  console.log("Seeding Pricing Factors...");
  for (const factor of pricingFactors) {
    await prisma.pricingFactor.upsert({
      where: { key: factor.key },
      update: factor,
      create: factor,
    });
  }

  console.log("Seeding Risk Zones...");
  for (const zone of riskZones) {
    await prisma.riskZone.upsert({
      where: { zipCode: zone.zipCode },
      update: zone,
      create: zone,
    });
  }

  console.log("Seeding Subscribers...");
  for (const sub of subscribers) {
    await prisma.subscriber.upsert({
      where: { email: sub.email },
      update: sub,
      create: sub,
    });
  }

  console.log("Seeding Users...");
  const admins = [
    {
      email: "markmae840@gmail.com",
      name: "Mark Mae",
      role: "ADMIN",
      isActive: true,
    },
    {
      email: "neoninsurancebrockersltd@gmail.com",
      name: "Neon Insurance",
      role: "ADMIN",
      isActive: true,
    },
  ];

  for (const admin of admins) {
    await prisma.user.upsert({
      where: { email: admin.email },
      update: {
        role: "ADMIN",
        isActive: true,
      },
      create: {
        email: admin.email,
        name: admin.name,
        role: "ADMIN",
        isActive: true,
      },
    });
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
