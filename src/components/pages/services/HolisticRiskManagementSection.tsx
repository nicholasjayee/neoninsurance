"use client";

import React, { ReactElement } from "react";
import { motion } from "framer-motion";
import { FiCheckCircle, FiLayers, FiShield } from "react-icons/fi";

// --- Type Definitions ---
interface ProcessStep {
  icon: ReactElement;
  title: string;
  description: string;
  themeColor: "brand-accent" | "brand-secondary-dark" | "brand-primary";
}

// Mapping object to ensure Tailwind generates the dynamic class names.
const colorMap = {
  "brand-accent": { text: "text-brand-accent", bg: "bg-brand-accent/10" },
  "brand-secondary-dark": {
    text: "text-brand-secondary-dark",
    bg: "bg-brand-secondary-dark/10",
  },
  "brand-primary": { text: "text-brand-primary", bg: "bg-brand-primary/10" },
};

// --- Component Data ---
const processSteps: ProcessStep[] = [
  {
    icon: <FiCheckCircle />,
    title: "Risk Assessment",
    description:
      "We analyze your unique situation to identify potential exposures and gaps in coverage.",
    themeColor: "brand-accent",
  },
  {
    icon: <FiLayers />,
    title: "Policy Customization",
    description:
      "We access a wide market to select and tailor policies that precisely fit your needs.",
    themeColor: "brand-secondary-dark",
  },
  {
    icon: <FiShield />,
    title: "360° Protection",
    description:
      "The result is a comprehensive shield of protection, giving you complete peace of mind.",
    themeColor: "brand-primary",
  },
];

// --- Main Exported Component ---
const HolisticRiskManagementSection: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-brand-light">
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
          {processSteps.map((step, index) => {
            const classes = colorMap[step.themeColor];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="text-center p-8 bg-brand-white rounded-lg shadow-sm border border-brand-border"
              >
                <div
                  className={`inline-block p-4 rounded-full mb-4 ${classes.text} ${classes.bg}`}
                >
                  {/*
                    THE FIX: We cast the `step.icon` element to a type that is known
                    to accept a `size` prop. This is a type-safe way to tell TypeScript
                    "I know what I'm doing" and it satisfies both the compiler and the linter.
                  */}
                  {React.cloneElement(
                    step.icon as React.ReactElement<{ size: number }>,
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
