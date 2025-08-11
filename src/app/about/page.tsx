import React from "react";
// --- 1. Import the Metadata type from Next.js ---
import type { Metadata } from "next";

// Importing the child components for the About page structure
import AboutHeroSection from "@/components/pages/about/AboutHeroSection";
import OurPhilosophySection from "@/components/pages/about/OurPhilosophySection";
import OurStorySection from "@/components/pages/about/OurStorySection";
import OurTeamSection from "@/components/pages/about/OurTeamSection";
import ShieldTransition from "@/components/common/ShieldTransition";

export const metadata: Metadata = {
  title: "About Us | Our Story, Mission, and Team | Neon Insurance",

  description:
    "Learn about Neon Insurance's journey, our unwavering commitment to clients, and meet the dedicated team working to secure your future. We are your partners in protection.",

  // Keywords that users might search for to find this page
  keywords: [
    "about neon insurance",
    "insurance brokerage uganda",
    "our team",
    "our story",
    "insurance mission",
    "financial protection",
    "client advocacy",
    "neon insurance brockers",
  ],

  // --- Open Graph (for social media sharing, e.g., Facebook, LinkedIn) ---
  openGraph: {
    title: "About Neon Insurance | Our Story, Mission, and Team",
    description:
      "Discover the people and philosophy behind Neon Insurance. We are more than a brokerage; we are your partners in protection.",
    // You should create a specific image for social sharing (e.g., 1200x630px)
    // and place it in your `public` folder.
    images: [
      {
        url: "/img/seo/about-us-og-image.png", // Replace with your actual social sharing image path
        width: 1200,
        height: 630,
        alt: "The Neon Insurance Team and Office",
      },
    ],
    url: "https://neoninsurancebrokerltd.org/about", // The canonical URL for this page
    type: "website",
  },

  // --- Twitter Card (for sharing on Twitter) ---
  twitter: {
    card: "summary_large_image",
    title: "About Neon Insurance | Our Story, Mission, and Team",
    description:
      "Discover the people and philosophy behind Neon Insurance. We are more than a brokerage; we are your partners in protection.",
    images: ["/img/seo/about-us-og-image.png"], // Replace with your actual social sharing image path
  },

  // Define the canonical URL to avoid duplicate content issues
  alternates: {
    canonical: "https://neoninsurancebrokerltd.org/about",
  },
};

// --- Your existing page component remains unchanged ---
export default function AboutPage() {
  return (
    <div className="bg-background-light">
      <AboutHeroSection />
      <ShieldTransition />
      <OurStorySection />
      <ShieldTransition />
      <OurPhilosophySection />
      <ShieldTransition />
      <OurTeamSection />
    </div>
  );
}
