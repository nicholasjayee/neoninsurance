import { prisma } from "@/lib/prisma";
import { cache } from 'react';
import { unstable_noStore as noStore } from 'next/cache';

export const getSiteConfig = cache(async () => {
  noStore();
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
