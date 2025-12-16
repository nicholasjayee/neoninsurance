import React from "react";
import type { Metadata } from "next";

// Importing the child components
import GalleryHeroSection from "@/components/pages/gallery/GalleryHeroSection";
import CaseStudiesSection from "@/components/pages/gallery/CaseStudiesSection";
import MasonryGallery from "@/components/pages/gallery/MasonryGallery";
import OurPartnersShowcaseSection from "@/components/pages/gallery/OurPartnersShowcaseSection";

// Data imports
import { communityGalleryData } from "@/lib/data/galleryData";
import { caseStudiesData } from "@/lib/data/caseStudiesData";

import { getSiteConfig } from "@/lib/siteConfig";

// --- SEO METADATA ---
export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig();
  const siteUrl = config?.url || "https://www.neoninsurancebrokerltd.org";

  return {
    title: "Gallery | Our Work, Community & Partners | Neon Insurance Broker Ltd",
    description: config?.defaultDescription || "Explore the gallery of Neon Insurance Broker Ltd. See our team in action at community events, view case studies, and discover our network of trusted partners in Uganda.",
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
      description: config?.defaultDescription || "See our commitment to community, our expert work through case studies, and the strong partnerships we've built.",
      images: [
        {
          url: `${siteUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: "A collage of Neon Insurance Broker Ltd events and partners",
        },
      ],
      url: `${siteUrl}/gallery`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Gallery | Neon Insurance Broker Ltd in Action",
      description: config?.defaultDescription || "See our commitment to community, our expert work through case studies, and the strong partnerships we've built.",
      images: [`${siteUrl}/og-image.png`],
    },
    alternates: {
      canonical: `${siteUrl}/gallery`,
    },
  };
}

// --- MAIN PAGE COMPONENT WITH DYNAMICALLY GENERATED STRUCTURED DATA ---
export default async function GalleryPage() {
  const config = await getSiteConfig();
  const siteUrl = config?.url || "https://www.neoninsurancebrokerltd.org";

  // Generate ImageGallery schema from actual data
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

  // Generate Article schema for each case study

  const caseStudiesSchema = caseStudiesData.map((study) => ({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `Case Study: ${study.client}`,
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
      {/* Replaced CommunityInvolvementSection with the new MasonryGallery */}
      <MasonryGallery items={communityGalleryData} />
      <OurPartnersShowcaseSection />
    </main>
  );
}
