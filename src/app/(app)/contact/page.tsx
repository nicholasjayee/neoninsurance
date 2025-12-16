import React from "react";
import type { Metadata } from "next";

// Importing the child components for the Contact page structure
import ContactHeroSection from "@/components/pages/contact/ContactHeroSection";
import ContactDetailsSection from "@/components/pages/contact/ContactDetailsSection";
import ContactFormSection from "@/components/pages/contact/ContactFormSection";
import FaqSection from "@/components/pages/contact/FaqSection";

import { getSiteConfig } from "@/lib/siteConfig";
import { contactFaqData } from "@/lib/data/faqData";
import { ContactInfo } from "@/components/pages/contact/ContactDetailsSection";

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig();
  
  return {
    title: "Contact Us | Get a Quote or Visit Our Office in Kampala",
    description: config?.defaultDescription || "Get in touch with Neon Insurance Broker Ltd. Find our Kampala office address, phone number, and email.",
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
      description: config?.defaultDescription || "Reach out for expert insurance advice, get a free quote, or find our office location in Kampala.",
      images: [
        {
          url: `${config?.url || "https://www.neoninsurancebrokerltd.org"}/og-image.png`,
          width: 1200,
          height: 630,
          alt: "Contact Neon Insurance Broker Ltd for expert support",
        },
      ],
      url: `${config?.url || "https://www.neoninsurancebrokerltd.org"}/contact`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Contact Neon Insurance Broker Ltd - We're Here to Help",
      description: config?.defaultDescription || "Reach out for expert insurance advice, get a free quote, or find our office location in Kampala.",
      images: [`${config?.url || "https://www.neoninsurancebrokerltd.org"}/og-image.png`],
    },
    alternates: {
      canonical: "/contact",
    },
  };
}

export default async function ContactPage() {
  const config = await getSiteConfig();
  
  if (!config) return null;

  // Construct contact info from dynamic config
  const contactInfoData: ContactInfo[] = [
    {
      icon: "map-pin",
      title: "Our Office",
      details: [
        config.addressLine1,
        config.addressLine2,
        config.poBox,
      ],
      color: "brand-accent",
    },
    {
      icon: "phone",
      title: "Give Us a Call",
      details: [config.telephone],
      color: "brand-primary",
    },
    {
      icon: "mail",
      title: "Send Us an Email",
      details: [config.email],
      color: "brand-secondary-dark",
    },
  ];

  const insuranceAgencySchema = {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    name: config.name,
    image: `${config.url}/og-image.png`,
    url: `${config.url}/contact`,
    telephone: config.telephone,
    email: config.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${config.addressLine1}, ${config.addressLine2}`,
      addressLocality: "Kampala",
      addressCountry: "UG",
      postOfficeBoxNumber: config.poBox.replace("P.O.Box ", ""),
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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: contactFaqData.map((faq) => ({
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

      <ContactHeroSection />
      <ContactDetailsSection contactInfo={contactInfoData} />
      <ContactFormSection />
      <FaqSection faqData={contactFaqData} />
    </main>
  );
}
