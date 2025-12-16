"use server";

import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

export const getKnowledgeBase = unstable_cache(
  async () => {
    try {
      const knowledge = await prisma.chatbotKnowledge.findMany({
        where: { isActive: true },
        orderBy: { priority: 'desc' }, // Higher priority first
      });
      return { success: true, knowledge };
    } catch (error) {
      console.error("Error fetching chatbot knowledge:", error);
      return { success: false, error: "Failed to fetch knowledge base" };
    }
  },
  ["chatbot-knowledge"],
  { revalidate: 3600 } // Cache for 1 hour
);
