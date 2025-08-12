"use client"; // This must be a Client Component due to the use of Framer Motion's whileInView.

import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { FaTruck, FaHardHat, FaHospital } from "react-icons/fa";

import { CaseStudy } from "@/lib/data/caseStudiesData";

const iconMap: { [key: string]: ReactNode } = {
  truck: <FaTruck />,
  hardhat: <FaHardHat />,
  hospital: <FaHospital />,
};

interface CaseStudyCardProps {
  data: CaseStudy;
  index: number;
}

interface CaseStudiesSectionProps {
  caseStudies: CaseStudy[];
}

// --- Helper Component --- (Preserved as an arrow function)
const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ data, index }) => {
  // Preserving your exact CSS variable implementation
  const cardStyle = {
    "--case-study-color": data.themeColor,
  } as React.CSSProperties;

  const IconComponent = iconMap[data.icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      style={cardStyle}
      className="bg-brand-white rounded-lg p-8 border border-brand-border shadow-sm flex flex-col border-t-4 border-[--case-study-color]"
    >
      <div className="flex-grow">
        <div className="flex items-center gap-3 mb-4">
          <div
            className="text-2xl"
            style={{ color: "var(--case-study-color)" }}
          >
            {IconComponent} {/* <-- Render the looked-up icon component */}
          </div>
          <h3 className="text-xl font-bold text-brand-text-primary">
            {data.client}
          </h3>
        </div>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-brand-text-primary mb-1">
              The Challenge
            </h4>
            <p className="text-brand-text-secondary text-sm">
              {data.challenge}
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-brand-text-primary mb-1">
              Our Solution
            </h4>
            <p className="text-brand-text-secondary text-sm">{data.solution}</p>
          </div>
        </div>
      </div>
      <div className="pt-4 mt-auto">
        <h4
          className="text-lg font-bold text-center"
          style={{ color: "var(--case-study-color)" }}
        >
          {data.outcome}
        </h4>
      </div>
    </motion.div>
  );
};

// --- Main Exported Component --- (Preserved as an arrow function)
const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({
  caseStudies,
}) => {
  return (
    <section className="py-20 md:py-32 bg-brand-light">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-brand-text-primary">
            Client Success Stories
          </h2>
          <p className="mt-4 text-lg text-brand-text-secondary">
            Real-world examples of our commitment and expertise.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <CaseStudyCard key={index} data={study} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Export Statement --- (Preserved exactly)
export default CaseStudiesSection;
