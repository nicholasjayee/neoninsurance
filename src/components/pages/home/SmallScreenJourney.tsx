"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import type { ClaimStep } from "./ServiceJourneySection";

// --- Type Definitions ---
interface MilestoneProps {
  data: ClaimStep;
  isLast: boolean;
}

interface SmallScreenJourneyProps {
  claimsJourneyData: ClaimStep[];
  // The scrollYProgress prop is no longer needed by this component,
  // but we can keep it for API consistency if the parent requires it.
  scrollYProgress?: MotionValue<number>;
}

// --- Helper Component for a single step ---
// This component is now self-animating based on its position in the viewport.
const Milestone: React.FC<MilestoneProps> = ({ data, isLast }) => {
  const ref = useRef<HTMLDivElement>(null);

  // THE FIX: Use `useScroll` to track this specific component's progress
  // as it moves through the viewport.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.5"], // Animation starts when the top of the element is 90% from the top of the viewport and ends when it's at 50%.
    // This offset ensures the item is fully visible as it animates in.
  });

  // Map this component's local scroll progress to its opacity and scale.
  // The text will now fade in perfectly as it enters the desired screen area.
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const y = useTransform(scrollYProgress, [0, 1], ["20px", "0px"]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale, y }}
      className="flex items-start space-x-6"
    >
      {/* Left side: Icon and connecting line */}
      <div className="flex flex-col items-center h-full">
        <div className="flex-shrink-0 text-3xl text-brand-accent p-2 z-10 bg-brand-light rounded-full shadow-md">
          {data.icon}
        </div>
        {!isLast && (
          // The line grows to connect the steps.
          <div className="w-0.5 grow bg-gray-200 mt-2 -mb-12" />
        )}
      </div>

      {/* Right side: Text content */}
      <div className="pt-2">
        <h3 className="font-bold text-brand-text-primary text-lg">
          {data.title}
        </h3>
        <p className="text-sm text-brand-text-secondary mt-1">
          {data.description}
        </p>
      </div>
    </motion.div>
  );
};

// --- Main Exported Component ---
const SmallScreenJourney: React.FC<SmallScreenJourneyProps> = ({
  claimsJourneyData,
}) => {
  // This component is now much simpler. It just lays out the Milestone components vertically.
  // The parent `ServiceJourneySection` provides the necessary scrollable height (e.g., h-[400vh]).
  return (
    <div className="relative w-full max-w-md mx-auto px-4 py-32 md:hidden">
      <div className="flex flex-col gap-y-20">
        {claimsJourneyData.map((step, index) => (
          <Milestone
            key={step.id}
            data={step}
            isLast={index === claimsJourneyData.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default SmallScreenJourney;
