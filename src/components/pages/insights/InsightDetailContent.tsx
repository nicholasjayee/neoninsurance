"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowLeft, FiCalendar, FiUser, FiTag } from "react-icons/fi";
import { format } from "date-fns";
import Image from "next/image";

interface Article {
  id: string;
  title: string;
  category: string;
  publishedAt: Date;
  author: string;
  imageUrl: string;
  content: string;
}

export default function InsightDetailContent({
  article,
}: {
  article: Article;
}) {
  return (
    <main className="min-h-screen bg-brand-light pt-24 pb-12">
      <article className="container mx-auto px-6 max-w-4xl">
        <Link
          href="/insights"
          className="inline-flex items-center gap-2 text-brand-primary font-semibold mb-8 hover:underline"
        >
          <FiArrowLeft /> Back to Insights
        </Link>

        {/* Article Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="inline-block bg-brand-primary text-white text-sm font-bold px-4 py-1 rounded-full mb-4">
            <FiTag className="inline mr-1" />
            {article.category}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-brand-text-primary mb-4">
            {article.title}
          </h1>

          <div className="flex items-center gap-6 text-brand-text-tertiary mb-6">
            <span className="flex items-center gap-2">
              <FiCalendar />{" "}
              {format(new Date(article.publishedAt), "MMM dd, yyyy")}
            </span>
            <span className="flex items-center gap-2">
              <FiUser /> {article.author}
            </span>
          </div>
        </motion.div>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl mb-12"
        >
          <Image
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover"
            fill
          />
        </motion.div>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="prose prose-lg max-w-none"
        >
          <div
            className="article-content text-brand-text-secondary leading-relaxed"
            dangerouslySetInnerHTML={{ __html: article.content }}
            style={{
              fontSize: "1.125rem",
              lineHeight: "1.75",
            }}
          />
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 bg-linear-to-r from-brand-primary to-brand-secondary p-8 rounded-3xl text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Need Expert Advice?</h3>
          <p className="mb-6 text-white/90">
            Our insurance experts are here to help you find the perfect coverage
            for your needs.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-brand-primary font-bold py-3 px-8 rounded-full shadow-lg hover:bg-brand-light transition-colors"
          >
            Contact Us Today
          </Link>
        </motion.div>
      </article>

      <style jsx global>{`
        .article-content h2 {
          font-size: 1.875rem;
          font-weight: 700;
          color: var(--brand-text-primary);
          margin-top: 2rem;
          margin-bottom: 1rem;
        }

        .article-content p {
          margin-bottom: 1.5rem;
          color: var(--brand-text-secondary);
        }

        .article-content ul {
          list-style-type: disc;
          margin-left: 2rem;
          margin-bottom: 1.5rem;
        }

        .article-content li {
          margin-bottom: 0.75rem;
          color: var(--brand-text-secondary);
        }

        .article-content strong {
          color: var(--brand-text-primary);
          font-weight: 600;
        }
      `}</style>
    </main>
  );
}
