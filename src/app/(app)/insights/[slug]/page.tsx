import React from "react";
import { notFound } from "next/navigation";
import { getBlogPostBySlug } from "@/app/(app)/actions/blog";
import InsightDetailContent from "@/components/pages/insights/InsightDetailContent";
import type { Metadata } from "next";
import { getSiteConfig } from "@/lib/siteConfig";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const { post } = await getBlogPostBySlug(resolvedParams.slug);
  const config = await getSiteConfig();
  const siteUrl = config?.url || "https://www.neoninsurancebrokerltd.org";

  if (!post) {
    return {
      title: "Article Not Found | Neon Insurance",
    };
  }

  return {
    title: `${post.title} | Neon Insurance Insights`,
    description: post.excerpt || `Read ${post.title} on Neon Insurance Insights.`,
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
      url: `${siteUrl}/insights/${post.slug}`,
      type: "article",
      images: [
        {
          url: post.imageUrl || `${siteUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      authors: [post.author],
      publishedTime: new Date(post.publishedAt).toISOString(),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || undefined,
      images: [post.imageUrl || `${siteUrl}/og-image.png`],
    },
    alternates: {
      canonical: `${siteUrl}/insights/${post.slug}`,
    },
  };
}

export default async function InsightDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { post } = await getBlogPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return <InsightDetailContent article={post} />;
}

