import React from "react";
// --- 1. Import the Metadata type from Next.js ---
import type { Metadata } from "next";

// Importing the child components for the Services page structure
import ServiceIntroSection from "@/components/pages/services/ServiceIntroSection";
import CoreCoveragesSection from "@/components/pages/services/CoreCoveragesSection";
import HolisticRiskManagementSection from "@/components/pages/services/HolisticRiskManagementSection";
import ClientAdvocacyClaimsSection from "@/components/pages/services/ClientAdvocacyClaimsSection";
import GetAQuoteSection from "@/components/pages/services/GetAQuoteSection";

import {
  personalCoveragesData,
  commercialCoveragesData,
} from "@/lib/data/servicesData";
import { processStepsData } from "@/lib/data/holisticRiskData"; // <-- Import the new data
import { siteConfig } from "@/lib/data/siteConfig";

// --- 2. Define and export the SEO metadata for the Services page ---
export const metadata: Metadata = {
  // A title rich with service-related keywords
  title: "Insurance Services | Motor, Medical & Business Coverage in Uganda",

  // A description that outlines your key services and value proposition
  description:
    "Explore comprehensive insurance services at Neon Insurance Broker Ltd. We specialize in motor, medical, travel, and business insurance, backed by holistic risk management and expert claims support.",

  // A mix of broad and specific service keywords
  keywords: [
    "insurance services uganda",
    "motor comprehensive insurance",
    "medical insurance uganda",
    "business insurance kampala",
    "group personal accident insurance",
    "fire and perils insurance",
    "travel insurance",
    "professional indemnity",
    "holistic risk management",
    "insurance claims advocacy",
  ],

  // --- Open Graph (for social media sharing) ---
  openGraph: {
    title: "Full-Service Insurance Solutions | Neon Insurance Broker Ltd",
    description:
      "From personal auto and health to comprehensive business coverage, discover our full suite of insurance services designed to protect what matters most.",
    // A dedicated social sharing image for services would be effective.
    images: [
      {
        url: "https://www.neoninsurancebrokerltd.org/img/seo/services-og-image.png", // Create a specific 1200x630px image for this page
        width: 1200,
        height: 630,
        alt: "An overview of insurance services offered by Neon Insurance Broker Ltd",
      },
    ],
    // The canonical URL for this specific page
    url: "https://www.neoninsurancebrokerltd.org/services",
    type: "website",
  },

  // --- Twitter Card (for sharing on Twitter) ---
  twitter: {
    card: "summary_large_image",
    title: "Full-Service Insurance Solutions | Neon Insurance Broker Ltd",
    description:
      "From personal auto and health to comprehensive business coverage, discover our full suite of insurance services.",
    images: [
      "https://www.neoninsurancebrokerltd.org/img/seo/services-og-image.png",
    ], // Using the absolute URL
  },

  // Define the canonical URL to avoid duplicate content issues
  alternates: {
    canonical: "https://www.neoninsurancebrokerltd.org/services",
  },
};

// --- Your existing page component remains unchanged ---
export default function ServicesPage() {
  const allServices = [...personalCoveragesData, ...commercialCoveragesData];

  const insuranceServicesSchema = {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    name: siteConfig.name,
    url: "https://www.neoninsurancebrokerltd.org/services",
    description:
      "Comprehensive insurance services in Uganda, including motor, medical, and business coverage.",
    makesOffer: allServices.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.name,
      },
    })),
  };

  return (
    // Using a <main> tag for better semantic HTML
    <main>
      {/* Inject the SEO schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(insuranceServicesSchema),
        }}
      />
      <ServiceIntroSection />
      <CoreCoveragesSection
        personalCoverages={personalCoveragesData}
        commercialCoverages={commercialCoveragesData}
      />
      <HolisticRiskManagementSection processSteps={processStepsData} />
      <ClientAdvocacyClaimsSection />
      <GetAQuoteSection />
    </main>
  );
}
