import React from "react";
// --- 1. Import the Metadata type from Next.js ---
import type { Metadata } from "next";

// Importing the child components for the Gallery page structure
import GalleryHeroSection from "@/components/pages/gallery/GalleryHeroSection";
import CaseStudiesSection from "@/components/pages/gallery/CaseStudiesSection";
import CommunityInvolvementSection from "@/components/pages/gallery/CommunityInvolvementSection";
import OurPartnersShowcaseSection from "@/components/pages/gallery/OurPartnersShowcaseSection";

// --- 2. Define and export the SEO metadata for the Gallery page ---
export const metadata: Metadata = {
  // A descriptive title for the gallery page
  title: "Gallery | Our Work, Community & Partners | Neon Insurance Broker Ltd",

  // A description that summarizes the visual content of the page
  description:
    "Explore the gallery of Neon Insurance Broker Ltd. See our team in action at community events, view case studies, and discover our network of trusted partners in Uganda.",

  // Keywords specific to the gallery's content
  keywords: [
    "neon insurance gallery",
    "insurance broker events",
    "corporate social responsibility uganda",
    "insurance case studies",
    "our partners",
    "community involvement kampala",
    "company gallery",
  ],

  // --- Open Graph (for social media sharing) ---
  openGraph: {
    title: "Gallery | Neon Insurance Broker Ltd in Action",
    description:
      "See our commitment to community, our expert work through case studies, and the strong partnerships we've built.",
    // It's a good practice to create a unique social sharing image for key pages.
    images: [
      {
        url: "https://neoninsurancebrokerltd.org/img/seo/gallery-og-image.png", // Create a specific 1200x630px image for this page
        width: 1200,
        height: 630,
        alt: "A collage of Neon Insurance Broker Ltd events and partners",
      },
    ],
    // The canonical URL for this specific page
    url: "https://neoninsurancebrokerltd.org/gallery",
    type: "website",
  },

  // --- Twitter Card (for sharing on Twitter) ---
  twitter: {
    card: "summary_large_image",
    title: "Gallery | Neon Insurance Broker Ltd in Action",
    description:
      "See our commitment to community, our expert work through case studies, and the strong partnerships we've built.",
    images: ["https://neoninsurancebrokerltd.org/img/seo/gallery-og-image.png"], // Using the absolute URL
  },

  // Define the canonical URL to avoid duplicate content issues
  alternates: {
    canonical: "https://neoninsurancebrokerltd.org/gallery",
  },
};

// --- Your existing page component remains unchanged ---
export default function GalleryPage() {
  return (
    // Using a <main> tag for better semantic HTML
    <main>
      <GalleryHeroSection />
      <CaseStudiesSection />
      <CommunityInvolvementSection />
      <OurPartnersShowcaseSection />
    </main>
  );
}
