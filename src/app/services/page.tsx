import React from "react";

// Importing the child components for the Services page structure
import ServiceIntroSection from "@/components/pages/services/ServiceIntroSection";
import CoreCoveragesSection from "@/components/pages/services/CoreCoveragesSection";
import HolisticRiskManagementSection from "@/components/pages/services/HolisticRiskManagementSection";
import ClientAdvocacyClaimsSection from "@/components/pages/services/ClientAdvocacyClaimsSection";
import GetAQuoteSection from "@/components/pages/services/GetAQuoteSection";

export default function ServicesPage() {
  return (
    // Using a <main> tag for better semantic HTML
    <main>
      <ServiceIntroSection />
      <CoreCoveragesSection />
      <HolisticRiskManagementSection />
      <ClientAdvocacyClaimsSection />
      <GetAQuoteSection />
    </main>
  );
}
