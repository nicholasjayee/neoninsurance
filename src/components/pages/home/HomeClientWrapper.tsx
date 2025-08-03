"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Risk } from "@/types/risk"; // Assuming a type definition for 'Risk'

// Importing the necessary components as per your original file.
// The code for these components is NOT provided here, as you instructed.
import DynamicHeroSection from "./DynamicHeroSection";
import RiskShowcaseSection from "./RiskShowcaseSection";
import ServiceJourneySection from "./ServiceJourneySection";
import SolutionsCarouselSection from "./SolutionsCarouselSection";
import PartnersSection from "./PartnersSection";
import FinalCtaSection from "./FinalCtaSection";
import RiskDetailView from "./RiskDetailView";

export function HomeClientWrapper() {
  // State to track which risk is active, if any.
  const [activeRisk, setActiveRisk] = useState<Risk | null>(null);

  // This effect scrolls to the top when a risk is selected or deselected.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeRisk]);

  return (
    <div className="bg-brand-light overflow-x-hidden">
      <AnimatePresence mode="wait">
        {activeRisk ? (
          // If a risk is active, only show the Detail View
          <RiskDetailView
            key="risk-detail"
            risk={activeRisk}
            onBack={() => setActiveRisk(null)}
          />
        ) : (
          // Otherwise, show all the normal homepage sections
          <motion.div
            key="homepage-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <DynamicHeroSection />
            <RiskShowcaseSection onSelectRisk={setActiveRisk} />
            <ServiceJourneySection />
            <SolutionsCarouselSection />
            <PartnersSection />
            <FinalCtaSection />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
