import React from "react";
import { notFound } from "next/navigation";
import { riskData } from "@/data/riskData";
import RiskDetailContent from "@/components/pages/risks/RiskDetailContent";
import type { Metadata } from "next";
import { getSiteConfig } from "@/lib/siteConfig";

const risks = riskData;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const risk = risks.find((r) => r.id === resolvedParams.id);
  const config = await getSiteConfig();
  const siteUrl = config?.url || "https://www.neoninsurancebrokerltd.org";

  if (!risk) {
    return {
      title: "Risk Not Found | Neon Insurance",
    };
  }

  return {
    title: `${risk.title} | Risk Management | Neon Insurance`,
    description: risk.description || `Learn about ${risk.title} and how to manage it.`,
    openGraph: {
      title: `${risk.title} | Risk Management`,
      description: risk.description,
      url: `${siteUrl}/risks/${risk.id}`,
      type: "article",
      images: [
        {
          url: `${siteUrl}/og-image.png`, // Assuming generic image for now as riskData might not have images
          width: 1200,
          height: 630,
          alt: risk.title,
        },
      ],
    },
    alternates: {
      canonical: `${siteUrl}/risks/${risk.id}`,
    },
  };
}

export default async function RiskDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const risk = risks.find((r) => r.id === resolvedParams.id);

  if (!risk) {
    notFound();
  }

  return <RiskDetailContent risk={risk} />;
}

