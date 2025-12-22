'use server';

import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

export const getFaqs = unstable_cache(
  async (query?: string) => {
    try {
      const where = query
        ? {
            OR: [
              { question: { contains: query, mode: "insensitive" as const } },
              { answer: { contains: query, mode: "insensitive" as const } },
            ],
          }
        : {};

      const faqs = await prisma.faq.findMany({
        where,
        orderBy: { createdAt: "asc" },
      });

      return { success: true, faqs };
    } catch (error) {
      console.error("Error fetching FAQs:", error);
      return { success: false, error: "Failed to fetch FAQs" };
    }
  },
  ["get-faqs"],
  { revalidate: 60 }
);
