import DynamicHeroSection from "@/components/pages/home/DynamicHeroSection";
import RiskShowcaseSection from "@/components/pages/home/RiskShowcaseSection";
import CalculatorSection from "@/components/pages/home/CalculatorSection";
import ServiceJourneySection from "@/components/pages/home/ServiceJourneySection";
import SolutionsCarouselSection from "@/components/pages/home/SolutionsCarouselSection";
import PartnersSection from "@/components/pages/home/PartnersSection";
import FinalCtaSection from "@/components/pages/home/FinalCtaSection";

import { Metadata } from "next";
import { getSiteConfig } from "@/lib/siteConfig";

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig();
  
  return {
    title: config?.defaultTitle || "Neon Insurance Brokers Ltd | Expert Risk Management in Kampala",
    description: config?.defaultDescription || "Neon Insurance Brokers provides expert risk assessment, tailored insurance solutions, and dedicated claims advocacy in Uganda.",
    alternates: {
      canonical: config?.url || "https://www.neoninsurancebrokerltd.org",
    },
  };
}

export default async function Home() {
  const config = await getSiteConfig();
  
  if (!config) return null;

  const insuranceAgencySchema = {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    name: config.name,
    image: `${config.url}/og-image.png`,
    url: config.url,
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
    sameAs: [
      config.facebookUrl,
      config.linkedinUrl,
      config.twitterUrl,
      config.instagramUrl,
      config.youtubeUrl
    ].filter(Boolean),
  };

  return (
    <main className="flex flex-col bg-brand-light overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(insuranceAgencySchema),
        }}
      />
      <DynamicHeroSection />
      <RiskShowcaseSection />
      <CalculatorSection />
      <ServiceJourneySection />
      <SolutionsCarouselSection />
      <PartnersSection />
      <FinalCtaSection />
    </main>
  );
}
