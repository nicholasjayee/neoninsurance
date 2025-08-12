"use client";

import React, { ReactElement } from "react";
import { motion } from "framer-motion";

// Step 1: Import the necessary icons from the library.
import { FiCheckCircle, FiLayers, FiShield } from "react-icons/fi";

// Step 2: Import the TypeScript type definition from your central data file.
import { ProcessStep } from "@/lib/data/holisticRiskData";

// Step 3: Create the Icon Map to translate string identifiers to components.
const iconMap: { [key: string]: ReactElement } = {
  "check-circle": <FiCheckCircle />,
  layers: <FiLayers />,
  shield: <FiShield />,
};

// Step 4: Define the props for the component.
interface HolisticRiskManagementSectionProps {
  processSteps: ProcessStep[];
}

// This utility map remains as it's part of the component's visual logic.
const colorMap = {
  "brand-accent": { text: "text-brand-accent", bg: "bg-brand-accent/10" },
  "brand-secondary-dark": {
    text: "text-brand-secondary-dark",
    bg: "bg-brand-secondary-dark/10",
  },
  "brand-primary": { text: "text-brand-primary", bg: "bg-brand-primary/10" },
};

// --- Main Exported Component (Updated to accept props) ---
const HolisticRiskManagementSection: React.FC<
  HolisticRiskManagementSectionProps
> = ({
  processSteps = [], // Default to an empty array to prevent crashes.
}) => {
  return (
    <section className="py-20 md:py-32 bg-brand-white">
      {" "}
      {/* Changed background for contrast */}
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-brand-text-primary">
            More Than Just a Policy
          </h2>
          <p className="font-mono text-brand-accent mt-2">
            {"// Our Approach to Your Security"}
          </p>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* This now maps over the 'processSteps' prop */}
          {processSteps.map((step, index) => {
            const classes = colorMap[step.themeColor];
            const IconComponent = iconMap[step.icon]; // Look up the icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="text-center p-8 bg-white rounded-lg shadow-sm border border-brand-border"
              >
                <div
                  className={`inline-block p-4 rounded-full mb-4 ${classes.text} ${classes.bg}`}
                >
                  {React.cloneElement(
                    IconComponent as React.ReactElement<{ size: number }>,
                    { size: 32 }
                  )}
                </div>
                <h3 className="text-2xl font-semibold text-brand-text-primary mb-3">
                  {step.title}
                </h3>
                <p className="text-brand-text-secondary">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HolisticRiskManagementSection;
