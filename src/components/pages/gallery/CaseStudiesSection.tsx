"use client"; // This must be a Client Component due to the use of Framer Motion's whileInView.

import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { FaTruck, FaHardHat, FaHospital } from "react-icons/fa";

// --- Type Definitions ---
interface CaseStudy {
  icon: ReactNode;
  client: string;
  challenge: string;
  solution: string;
  outcome: string;
  themeColor: string; // The hex code for the color
}

interface CaseStudyCardProps {
  data: CaseStudy;
  index: number;
}

// --- Component Data --- (Preserved exactly, now typed)
const caseStudiesData: CaseStudy[] = [
  {
    icon: <FaTruck />,
    client: "Cross-Border Logistics Firm",
    challenge:
      "A client's truck carrying high-value cargo was involved in a multi-vehicle accident in a neighboring country, leading to complex liability claims.",
    solution:
      "We managed all cross-border communication and paperwork, acting as the primary negotiator with the multiple insurers involved.",
    outcome: "Full Cargo Value Recovered & Liability Settled",
    themeColor: "#C41E24",
  },
  {
    icon: <FaHardHat />,
    client: "Kampala Construction Project",
    challenge:
      "A major construction site experienced a setback due to unexpected torrential rains, causing water damage to materials and delaying the project timeline.",
    solution:
      "We navigated the client's 'Contractors All Risk' policy, meticulously documenting the damage and presenting a robust claim.",
    outcome: "Successful Claim Payout, Preventing Penalties",
    themeColor: "#F97316",
  },
  {
    icon: <FaHospital />,
    client: "Corporate Group Medical Scheme",
    challenge:
      "An employee required emergency specialized medical treatment abroad, which involved complex pre-authorization and cost management.",
    solution:
      "Our team liaised directly with the insurer's international desk, fast-tracking all approvals and ensuring financial guarantees were in place.",
    outcome: "Emergency Treatment Authorized in 24 Hours",
    themeColor: "#D97706",
  },
];

// --- Helper Component --- (Preserved as an arrow function)
const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ data, index }) => {
  // Preserving your exact CSS variable implementation
  const cardStyle = {
    "--case-study-color": data.themeColor,
  } as React.CSSProperties;

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
            {data.icon}
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
const CaseStudiesSection: React.FC = () => {
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
          {caseStudiesData.map((study, index) => (
            <CaseStudyCard key={index} data={study} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Export Statement --- (Preserved exactly)
export default CaseStudiesSection;
