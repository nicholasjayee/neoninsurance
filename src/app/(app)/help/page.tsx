import React from "react";
import { getFaqs } from "@/app/(app)/actions/faq";
import FaqSection from "@/components/pages/contact/FaqSection";
import { FiSearch } from "react-icons/fi";
import type { Metadata } from "next";
import { getSiteConfig } from "@/lib/siteConfig";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig();
  const siteUrl = config?.url || "https://www.neoninsurancebrokerltd.org";

  return {
    title: "Help Center | FAQs & Support | Neon Insurance",
    description: config?.defaultDescription || "Find answers to common questions about our insurance policies, claims, and services. We are here to help.",
    keywords: [
      "insurance help center",
      "insurance faqs",
      "neon insurance support",
      "claims help",
      "policy questions",
    ],
    openGraph: {
      title: "Help Center | Neon Insurance Broker Ltd",
      description: "Find answers to common questions about our insurance policies, claims, and services.",
      url: `${siteUrl}/help`,
      type: "website",
    },
    alternates: {
      canonical: `${siteUrl}/help`,
    },
  };
}

export default async function HelpPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const query = params.q || "";
  const { faqs } = await getFaqs(query);

  return (
    <main className="min-h-screen bg-brand-light pt-24 pb-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-text-primary mb-4">
            Help Center
          </h1>
          <p className="text-xl text-brand-text-secondary max-w-2xl mx-auto mb-8">
            Find answers to common questions about our insurance policies, claims, and services.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-brand-text-tertiary">
              <FiSearch className="text-xl" />
            </div>
            <form action="/help" method="GET">
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="Search for answers..."
                className="w-full pl-12 pr-4 py-4 bg-white border border-brand-border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all text-lg"
              />
            </form>
          </div>
        </div>

        {faqs && faqs.length > 0 ? (
          <FaqSection faqData={faqs} />
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-brand-text-secondary">
              No results found for &quot;{query}&quot;. Try a different search term.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
