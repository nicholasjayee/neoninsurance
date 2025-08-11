import React from "react";
// --- 1. Import the Metadata type from Next.js ---
import type { Metadata } from "next";

// Importing the child components for the Contact page structure
import ContactHeroSection from "@/components/pages/contact/ContactHeroSection";
import ContactDetailsSection from "@/components/pages/contact/ContactDetailsSection";
import ContactFormSection from "@/components/pages/contact/ContactFormSection";
import FaqSection from "@/components/pages/contact/FaqSection";

// --- 2. Define and export the SEO metadata for the Contact page ---
export const metadata: Metadata = {
  // A clear and action-oriented title
  title: "Contact Us | Get a Quote or Visit Our Office in Kampala",

  // A description focused on how and why to get in touch
  description:
    "Get in touch with Neon Insurance Broker Ltd. Find our Kampala office address, phone number, and email. Use our contact form for inquiries or to request a free insurance quote.",

  // Keywords specific to contacting your business
  keywords: [
    "contact neon insurance",
    "neon insurance brokers contact",
    "get insurance quote uganda",
    "request insurance consultation",
    "insurance broker phone number",
    "neon insurance kampala office",
    "insurance broker location uganda",
  ],

  // --- Open Graph (for social media sharing) ---
  openGraph: {
    title: "Contact Neon Insurance Broker Ltd - We're Here to Help",
    description:
      "Reach out for expert insurance advice, get a free quote, or find our office location in Kampala. We look forward to assisting you.",
    // Using the absolute URL for the social sharing image is a best practice.
    images: [
      {
        url: "https://neoninsurancebrokerltd.org/og-image.png", // Uses the same og-image as the homepage
        width: 1200,
        height: 630,
        alt: "Contact Neon Insurance Broker Ltd for expert support",
      },
    ],
    // The canonical URL for this specific page
    url: "https://neoninsurancebrokerltd.org/contact",
    type: "website",
  },

  // --- Twitter Card (for sharing on Twitter) ---
  twitter: {
    card: "summary_large_image",
    title: "Contact Neon Insurance Broker Ltd - We're Here to Help",
    description:
      "Reach out for expert insurance advice, get a free quote, or find our office location in Kampala.",
    images: ["https://neoninsurancebrokerltd.org/og-image.png"], // Using the absolute URL
  },

  // Define the canonical URL to avoid duplicate content issues
  alternates: {
    canonical: "https://neoninsurancebrokerltd.org/contact",
  },
};

// --- Your existing page component remains unchanged ---
export default function ContactPage() {
  return (
    // Using a <main> tag for better semantic HTML
    <main>
      <ContactHeroSection />
      <ContactDetailsSection />
      <ContactFormSection />
      <FaqSection />
    </main>
  );
}
