import React from "react";
import Link from "next/link";
import { FiArrowRight, FiCalendar, FiUser } from "react-icons/fi";
import { getBlogPosts } from "@/app/(app)/actions/blog";
import NewsletterForm from "@/components/insights/NewsletterForm";
import { BlogPost } from "@prisma/client";
import { format } from "date-fns";
import type { Metadata } from "next";
import { getSiteConfig } from "@/lib/siteConfig";
import Image from "next/image";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig();
  const siteUrl = config?.url || "https://www.neoninsurancebrokerltd.org";

  return {
    title: "Insights & News | Insurance Trends and Tips | Neon Insurance",
    description:
      config?.defaultDescription ||
      "Stay informed with the latest trends, tips, and updates from the world of insurance. Expert articles from Neon Insurance Brokers.",
    keywords: [
      "insurance blog uganda",
      "insurance news kampala",
      "risk management tips",
      "insurance insights",
      "neon insurance news",
    ],
    openGraph: {
      title: "Insights & News | Neon Insurance Broker Ltd",
      description:
        "Stay informed with the latest trends, tips, and updates from the world of insurance.",
      url: `${siteUrl}/insights`,
      type: "website",
    },
    alternates: {
      canonical: `${siteUrl}/insights`,
    },
  };
}

export default async function InsightsPage() {
  const { posts } = await getBlogPosts();

  return (
    <main className="min-h-screen bg-brand-light pt-24 pb-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-text-primary mb-4">
            Insights & News
          </h1>
          <p className="text-xl text-brand-text-secondary max-w-2xl mx-auto">
            Stay informed with the latest trends, tips, and updates from the
            world of insurance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts?.map((article: BlogPost) => (
            <div
              key={article.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-brand-border flex flex-col"
            >
              <div className="relative h-48 overflow-hidden shrink-0">
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  fill
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-brand-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                  {article.category}
                </div>
              </div>

              <div className="p-6 flex flex-col grow">
                <div className="flex items-center gap-4 text-sm text-brand-text-tertiary mb-3">
                  <span className="flex items-center gap-1">
                    <FiCalendar />{" "}
                    {format(new Date(article.publishedAt), "MMM dd, yyyy")}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiUser /> {article.author}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-brand-text-primary mb-3 group-hover:text-brand-primary transition-colors">
                  {article.title}
                </h3>
                <p className="text-brand-text-secondary mb-4 line-clamp-2 grow">
                  {article.excerpt}
                </p>

                <Link
                  href={`/insights/${article.slug}`}
                  className="inline-flex items-center gap-2 font-semibold text-brand-primary hover:text-brand-primary-dark transition-colors mt-auto"
                >
                  Read Article <FiArrowRight />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <NewsletterForm />
      </div>
    </main>
  );
}
