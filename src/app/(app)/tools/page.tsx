import React from "react";
import type { Metadata } from "next";
import ToolsPageContent from "@/components/pages/tools/ToolsPageContent";
import { getSiteConfig } from "@/lib/siteConfig";

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig();
  const siteUrl = config?.url || "https://www.neoninsurancebrokerltd.org";

  return {
    title: "Interactive Insurance Tools | Calculators & Assessments | Neon Insurance",
    description: config?.defaultDescription || "Explore our suite of smart calculators and assessment tools. Estimate premiums, assess risks, and calculate potential savings.",
    keywords: [
      "insurance tools",
      "premium calculator",
      "risk assessment tool",
      "insurance savings estimator",
      "interactive insurance tools",
    ],
    openGraph: {
      title: "Interactive Insurance Tools | Neon Insurance Broker Ltd",
      description: "Smart tools to help you make informed insurance decisions.",
      url: `${siteUrl}/tools`,
      type: "website",
    },
    alternates: {
      canonical: `${siteUrl}/tools`,
    },
  };
}

export default function ToolsPage() {
  return <ToolsPageContent />;
}
