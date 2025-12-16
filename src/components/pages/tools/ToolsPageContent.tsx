"use client";

import React from "react";
import { motion } from "framer-motion";
import PremiumCalculator from "@/components/tools/PremiumCalculator";
import PolicyRecommender from "@/components/tools/PolicyRecommender";
import RiskAssessment from "@/components/tools/RiskAssessment";
import SavingsEstimator from "@/components/tools/SavingsEstimator";

export default function ToolsPageContent() {
  return (
    <main className="min-h-screen bg-brand-light pt-24 pb-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-brand-text-primary mb-4"
          >
            Interactive Tools
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-brand-text-secondary max-w-2xl mx-auto"
          >
            Explore our suite of smart calculators and assessment tools designed to help you make informed decisions.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Premium Calculator - Takes full width on mobile, half on large */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 max-w-4xl mx-auto w-full"
          >
            <PremiumCalculator />
          </motion.div>

          {/* Policy Recommender - Takes full width on mobile, half on large */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
            className="lg:col-span-2 max-w-4xl mx-auto w-full"
          >
            <PolicyRecommender />
          </motion.div>

          {/* Risk Assessment */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <RiskAssessment />
          </motion.div>

          {/* Savings Estimator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <SavingsEstimator />
          </motion.div>
        </div>
      </div>
    </main>
  );
}
