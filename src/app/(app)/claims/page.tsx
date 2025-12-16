import React from "react";
import type { Metadata } from "next";
import ClaimsPageContent from "@/components/pages/claims/ClaimsPageContent";
import { getSiteConfig } from "@/lib/siteConfig";

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig();
  const siteUrl = config?.url || "https://www.neoninsurancebrokerltd.org";

  return {
    title: "Claims Center | File & Track Insurance Claims | Neon Insurance",
    description: config?.defaultDescription || "Report a new insurance claim or track the status of an existing one. Our dedicated claims team is here to advocate for you and ensure a smooth settlement process.",
    keywords: [
      "insurance claims uganda",
      "file insurance claim",
      "track claim status",
      "claims advocacy",
      "motor accident claim",
      "theft claim reporting",
      "neon insurance claims",
    ],
    openGraph: {
      title: "Claims Center | Neon Insurance Broker Ltd",
      description: "Fast, transparent, and supportive claims processing. We are your advocates.",
      url: `${siteUrl}/claims`,
      type: "website",
      images: [
        {
          url: `${siteUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: "Neon Insurance Claims Center",
        },
      ],
    },
    alternates: {
      canonical: `${siteUrl}/claims`,
    },
  };
}

export default function ClaimsPage() {
  return <ClaimsPageContent />;
}
