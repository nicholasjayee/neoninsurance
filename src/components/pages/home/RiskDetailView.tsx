"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";
// // CORRECTED: Importing your custom OptimizedImage component, not next/image.
// import OptimizedImage from "@/components/common/OptimizedImage";
import type { Risk } from "@/types/risk";
import Image from "next/image";

// --- Type Definition for Component Props ---
interface RiskDetailViewProps {
  risk: Risk | null;
  onBack: () => void;
}

export default function RiskDetailView({ risk, onBack }: RiskDetailViewProps) {
  if (!risk) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-brand-light"
    >
      {/* Background Banner */}
      <div className="relative h-[50vh] md:h-[60vh]">
        {/* 
          CORRECTED: Using your custom OptimizedImage component, which handles 
          the blur-up effect with its own internal logic.
        */}
        {/* <OptimizedImage srcUrl={risk.imageUrl} alt={risk.title} /> */}
        <div className={`relative h-full w-full overflow-hidden`}>
          <Image
            src={risk.imageUrl}
            alt={risk.title}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="container absolute inset-0 mx-auto flex items-end px-4 pb-8 sm:px-6 md:pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
            className="flex items-center gap-3 sm:gap-4"
          >
            <span className="text-4xl text-brand-accent sm:text-5xl">
              {risk.icon}
            </span>
            <h1 className="text-4xl font-bold text-white drop-shadow-lg sm:text-5xl md:text-6xl">
              {risk.title}
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12 sm:px-6 md:py-16">
        <div className="mx-auto max-w-4xl">
          <motion.button
            onClick={onBack}
            className="mb-8 flex items-center gap-2 font-semibold text-brand-text-secondary transition-colors hover:text-brand-primary"
            whileHover={{ x: -5 }}
          >
            <FiArrowLeft />
            Back to Homepage
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.4 } }}
          >
            <h2 className="mb-4 text-2xl font-bold text-brand-text-primary sm:text-3xl">
              Coverage Details
            </h2>
            <p className="text-base leading-relaxed text-brand-text-secondary sm:text-lg">
              {risk.description} Our {risk.title} policy is designed to offer
              robust protection against a variety of incidents. We work with top
              insurers to provide flexible coverage that can be tailored to your
              specific assets and circumstances, ensuring you have the right
              protection when you need it most.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
