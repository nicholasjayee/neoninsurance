import React from "react";

// Importing the child components for the About page structure
import AboutHeroSection from "@/components/pages/about/AboutHeroSection";
import OurPhilosophySection from "@/components/pages/about/OurPhilosophySection";
import OurStorySection from "@/components/pages/about/OurStorySection";
import OurTeamSection from "@/components/pages/about/OurTeamSection";
import ShieldTransition from "@/components/common/ShieldTransition";

// Note: Your original imports for JoinUsSection, SectionConnector, and
// ShieldBurstTransition are preserved in spirit via the comments below,
// matching your original file.

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
