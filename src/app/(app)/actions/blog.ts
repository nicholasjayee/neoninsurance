"use server";

import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

export async function getBlogPosts() {
  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: { publishedAt: "desc" },
    });
    return { success: true, posts };
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return { success: false, error: "Failed to fetch blog posts" };
  }
}

export const getBlogPostBySlug = unstable_cache(
  async (slug: string) => {
    try {
      const post = await prisma.blogPost.findUnique({
        where: { slug },
      });
      return { success: true, post };
    } catch (error) {
      console.error("Error fetching blog post:", error);
      return { success: false, error: "Failed to fetch blog post" };
    }
  },
  ["blog-post-by-slug"],
  { revalidate: 3600 }
);

export const getBlogPostById = unstable_cache(
  async (id: string) => {
    try {
      const post = await prisma.blogPost.findUnique({
        where: { id },
      });
      return { success: true, post };
    } catch (error) {
      console.error("Error fetching blog post:", error);
      return { success: false, error: "Failed to fetch blog post" };
    }
  },
  ["blog-post-by-id"],
  { revalidate: 3600 }
);
