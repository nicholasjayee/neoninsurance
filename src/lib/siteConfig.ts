import { prisma } from "@/lib/prisma";
import { cache } from 'react';

export const getSiteConfig = cache(async () => {
  try {
    const config = await prisma.siteConfig.findUnique({
      where: { key: 'main' },
    });
    return config;
  } catch (error) {
    console.error('Failed to fetch site config:', error);
    return null; // Return null if database is unavailable
  }
});
