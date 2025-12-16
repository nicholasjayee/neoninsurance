import PolicyRecommender from "@/components/tools/PolicyRecommender";
import type { Metadata } from "next";
import { getSiteConfig } from "@/lib/siteConfig";

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig();
  const siteUrl = config?.url || "https://www.neoninsurancebrokerltd.org";

  return {
    title: "Get Matched | Find the Right Insurance Policy | Neon Insurance",
    description: config?.defaultDescription || "Not sure what insurance you need? Answer a few questions and get personalized policy recommendations tailored to your lifestyle and assets.",
    keywords: [
      "insurance recommender",
      "policy finder",
      "insurance match uganda",
      "personalized insurance",
    ],
    openGraph: {
      title: "Get Matched | Neon Insurance Broker Ltd",
      description: "Find the perfect insurance policy for your needs.",
      url: `${siteUrl}/get-matched`,
      type: "website",
    },
    alternates: {
      canonical: `${siteUrl}/get-matched`,
    },
  };
}

export default function GetMatchedPage() {
  return <PolicyRecommender />;
}
