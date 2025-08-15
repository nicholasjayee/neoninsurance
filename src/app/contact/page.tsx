import React from "react";
import type { Metadata } from "next";

// Importing the child components for the Contact page structure
import ContactHeroSection from "@/components/pages/contact/ContactHeroSection";
import ContactDetailsSection from "@/components/pages/contact/ContactDetailsSection";
import ContactFormSection from "@/components/pages/contact/ContactFormSection";
import FaqSection from "@/components/pages/contact/FaqSection";

import { siteConfig } from "@/lib/data/siteConfig";
import { contactFaqData } from "@/lib/data/faqData";
import { contactInfoData } from "@/lib/data/contactPageData"; // Visual data for

// --- SEO METADATA (Your original, high-quality metadata) ---
export const metadata: Metadata = {
  title: "Contact Us | Get a Quote or Visit Our Office in Kampala",
  description:
    "Get in touch with Neon Insurance Broker Ltd. Find our Kampala office address, phone number, and email. Use our contact form for inquiries or to request a free insurance quote.",
  keywords: [
    "contact neon insurance",
    "neon insurance brokers contact",
    "get insurance quote uganda",
    "request insurance consultation",
    "insurance broker phone number",
    "neon insurance kampala office",
    "insurance broker location uganda",
  ],
  openGraph: {
    title: "Contact Neon Insurance Broker Ltd - We're Here to Help",
    description:
      "Reach out for expert insurance advice, get a free quote, or find our office location in Kampala. We look forward to assisting you.",
    images: [
      {
        url: "https://www.neoninsurancebrokerltd.org/og-image.png",
        width: 1200,
        height: 630,
        alt: "Contact Neon Insurance Broker Ltd for expert support",
      },
    ],
    url: "https://www.neoninsurancebrokerltd.org/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Neon Insurance Broker Ltd - We're Here to Help",
    description:
      "Reach out for expert insurance advice, get a free quote, or find our office location in Kampala.",
    images: ["https://www.neoninsurancebrokerltd.org/og-image.png"],
  },
  alternates: {
    canonical: "/contact",
  },
};

// --- DATA FROM FaqSection.tsx ---
// We define this data here so the server has access to it for generating the JSON-LD schema.

// --- MAIN PAGE COMPONENT WITH INTEGRATED STRUCTURED DATA ---
export default function ContactPage() {
  // --- 1. InsuranceAgency Structured Data ---
  // Matches the data in your ContactDetailsSection
  const insuranceAgencySchema = {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    name: siteConfig.name,
    image: "https://www.neoninsurancebrokerltd.org/og-image.png",
    url: "https://www.neoninsurancebrokerltd.org/contact",
    telephone: siteConfig.telephone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${siteConfig.address.line1}, ${siteConfig.address.line2}`,
      addressLocality: "Kampala",
      addressCountry: "UG",
      postOfficeBoxNumber: siteConfig.address.poBox.replace("P.O.Box ", ""),
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:30",
        closes: "17:00",
      },
    ],
  };

  // --- 2. FAQPage Structured Data (Generated from faqSchemaData array) ---

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: contactFaqData.map((faq) => ({
      // <-- Using imported data
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <main>
      {/* 
        Injecting JSON-LD scripts for InsuranceAgency and FAQPage.
        This provides machine-readable data to Google for rich snippets.
      */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(insuranceAgencySchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Your existing components for the visual layout */}
      <ContactHeroSection />
      <ContactDetailsSection contactInfo={contactInfoData} />
      <ContactFormSection />
      {/* FaqSection renders the visual FAQs which match the schema above */}
      <FaqSection faqData={contactFaqData} />
    </main>
  );
}
