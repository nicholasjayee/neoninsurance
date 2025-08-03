"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  FaCar,
  // FaHome,
  FaHeartbeat,
  FaShieldAlt,
  FaBriefcase,
  FaBuilding,
  // FaPlane,
  FaAnchor,
  FaUsersCog,
  FaQrcode,
} from "react-icons/fa";

// --- Type Definitions ---
interface CoverageItem {
  icon: ReactNode;
  name: string;
}

interface CoverageCardProps {
  items: CoverageItem[];
  title: string;
  titleColor: "brand-accent" | "brand-primary"; // Restrict the prop to valid keys
}

// THE FIX: Tailwind needs full class names to exist in the source code to generate them.
// This mapping object provides those full class names, solving the dynamic class issue.
const colorMap = {
  "brand-accent": {
    text: "text-brand-accent",
    bg: "bg-brand-accent/10",
  },
  "brand-primary": {
    text: "text-brand-primary",
    bg: "bg-brand-primary/10",
  },
};

// --- Component Data --- (Preserved exactly, now typed)
const personalCoverages: CoverageItem[] = [
  { icon: <FaCar />, name: "Motor Comprehensive" },
  { icon: <FaShieldAlt />, name: "Motor Third Party" },
  { icon: <FaQrcode />, name: "Digital Stickers" },
  { icon: <FaHeartbeat />, name: "Life Assurance" },
];

const commercialCoverages: CoverageItem[] = [
  { icon: <FaBuilding />, name: "Industrial All Risks (IAR)" },
  { icon: <FaBriefcase />, name: "Professional Indemnity" },
  { icon: <FaUsersCog />, name: "VSLA" },
  { icon: <FaAnchor />, name: "Marine & Goods-in-Transit" },
];

// --- Helper Component --- (Preserved as an arrow function)
const CoverageCard: React.FC<CoverageCardProps> = ({
  items,
  title,
  titleColor,
}) => {
  // Use the color map to get the correct, full class names
  const classes = colorMap[titleColor];

  return (
    <div className="bg-brand-white rounded-lg p-8 border border-brand-border shadow-sm">
      <h3 className={`text-3xl font-bold mb-6 ${classes.text}`}>{title}</h3>
      <div className="space-y-4">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex items-center gap-4"
          >
            <div className={`p-2 rounded-md ${classes.bg}`}>
              <div className={`text-2xl ${classes.text}`}>{item.icon}</div>
            </div>
            <span className="font-medium text-brand-text-secondary">
              {item.name}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// --- Main Exported Component --- (Preserved as an arrow function)
const CoreCoveragesSection: React.FC = () => {
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
            Covering Every Aspect of Your Life
          </h2>
          <p className="mt-4 text-lg text-brand-text-secondary">
            We provide tailored solutions for both individuals and businesses.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-8">
          <CoverageCard
            items={personalCoverages}
            title="For You & Your Family"
            titleColor="brand-accent"
          />
          <CoverageCard
            items={commercialCoverages}
            title="For Your Business"
            titleColor="brand-primary"
          />
        </div>
      </div>
    </section>
  );
};

export default CoreCoveragesSection;
