"use client";

import React from "react";
import { motion } from "framer-motion";
import PremiumCalculator from "@/components/tools/PremiumCalculator";

export default function CalculatorSection() {
  return (
    <section className="py-24 bg-brand-light relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-64 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-brand-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-brand-text-primary mb-6 leading-tight">
              Calculate Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
                Perfect Premium
              </span>
            </h2>
            <p className="text-xl text-brand-text-secondary mb-8 leading-relaxed">
              See how much you can save with our transparent, AI-driven pricing model. No hidden fees, just fair rates tailored to your lifestyle.
            </p>
            
            <ul className="space-y-4 mb-8">
              {[
                "Real-time rate adjustments",
                "Discounts for safe drivers",
                "Bundle and save up to 20%",
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-brand-text-primary font-medium">
                  <div className="w-6 h-6 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                    ✓
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <PremiumCalculator />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
