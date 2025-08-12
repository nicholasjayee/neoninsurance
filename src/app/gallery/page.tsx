import React from "react";
import type { Metadata } from "next";

// Importing the child components
import GalleryHeroSection from "@/components/pages/gallery/GalleryHeroSection";
import CaseStudiesSection from "@/components/pages/gallery/CaseStudiesSection";
import CommunityInvolvementSection from "@/components/pages/gallery/CommunityInvolvementSection";
import OurPartnersShowcaseSection from "@/components/pages/gallery/OurPartnersShowcaseSection";

import { communityGalleryData } from "@/lib/data/galleryData";
import { caseStudiesData } from "@/lib/data/caseStudiesData";
// --- STEP 1: IMPORT ALL DATA AND IMAGES AT THE PAGE LEVEL ---
// This makes the data available on the server for SEO schema generation.

// Static imports for the community gallery images

// Data for the community gallery

// Data for Case Studies (from CaseStudiesSection)

// --- SEO METADATA (Your original metadata is preserved) ---
export const metadata: Metadata = {
  title: "Gallery | Our Work, Community & Partners | Neon Insurance Broker Ltd",
  description:
    "Explore the gallery of Neon Insurance Broker Ltd. See our team in action at community events, view case studies, and discover our network of trusted partners in Uganda.",
  keywords: [
    "neon insurance gallery",
    "insurance broker events",
    "corporate social responsibility uganda",
    "insurance case studies",
    "our partners",
    "community involvement kampala",
    "company gallery",
  ],
  openGraph: {
    title: "Gallery | Neon Insurance Broker Ltd in Action",
    description:
      "See our commitment to community, our expert work through case studies, and the strong partnerships we've built.",
    images: [
      {
        url: "https://neoninsurancebrokerltd.org/og-image.png",
        width: 1200,
        height: 630,
        alt: "A collage of Neon Insurance Broker Ltd events and partners",
      },
    ],
    url: "https://neoninsurancebrokerltd.org/gallery",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gallery | Neon Insurance Broker Ltd in Action",
    description:
      "See our commitment to community, our expert work through case studies, and the strong partnerships we've built.",
    images: ["https://neoninsurancebrokerltd.org/og-image.png"],
  },
  alternates: {
    canonical: "/gallery",
  },
};

// --- MAIN PAGE COMPONENT WITH DYNAMICALLY GENERATED STRUCTURED DATA ---
export default function GalleryPage() {
  const siteUrl = "https://neoninsurancebrokerltd.org";

  // --- 2. Generate ImageGallery schema from your actual data ---
  const imageGallerySchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "Neon Insurance Brokers Community & Work Gallery",
    description:
      "A showcase of our work, client success stories, community involvement, and trusted partners.",
    image: communityGalleryData.map((item) => ({
      "@type": "ImageObject",
      // Construct the full, absolute URL for Google
      contentUrl: `${siteUrl}${item.imageUrl.src}`,
      name: item.title,
      caption: `${item.category}: ${item.title}`,
    })),
  };

  // --- 3. Generate Article schema for each case study ---

  const caseStudiesSchema = caseStudiesData.map((study) => ({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `Case Study: ${study.client}`,
    // ... (rest of the schema is the same as it doesn't use the icon)
    author: {
      "@type": "Organization",
      name: "Neon Insurance Brokers Ltd",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Neon Insurance Brokers Ltd",
      logo: { "@type": "ImageObject", url: `${siteUrl}/og-image.png` },
    },
    description: study.challenge,
    articleBody: `Solution: ${study.solution}. Outcome: ${study.outcome}.`,
  }));

  return (
    <main>
      {/* Injecting the ImageGallery schema for the whole page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(imageGallerySchema) }}
      />

      {/* Injecting a separate Article schema for each case study */}
      {caseStudiesSchema.map((schema, index) => (
        <script
          key={`case-study-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Your existing visual components render below */}
      <GalleryHeroSection />
      <CaseStudiesSection caseStudies={caseStudiesData} />
      <CommunityInvolvementSection galleryData={communityGalleryData} />
      <OurPartnersShowcaseSection />
    </main>
  );
}
