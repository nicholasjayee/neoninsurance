import React from "react";

// Importing the child components for the Gallery page structure
import GalleryHeroSection from "@/components/pages/gallery/GalleryHeroSection";
import CaseStudiesSection from "@/components/pages/gallery/CaseStudiesSection";
import CommunityInvolvementSection from "@/components/pages/gallery/CommunityInvolvementSection";
import OurPartnersShowcaseSection from "@/components/pages/gallery/OurPartnersShowcaseSection";

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
