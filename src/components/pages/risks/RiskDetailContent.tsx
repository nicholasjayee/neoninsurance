"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowLeft, FiCheckCircle } from "react-icons/fi";

interface Risk {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  benefits: string[];
  imageUrl: string;
}

export default function RiskDetailContent({ risk }: { risk: Risk }) {
  return (
    <main className="min-h-screen bg-brand-light pt-24 pb-12">
      <div className="container mx-auto px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-brand-primary font-semibold mb-8 hover:underline"
        >
          <FiArrowLeft /> Back to Home
        </Link>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl"
          >
             {/* Placeholder for image - using a div for now if CloudinaryImage isn't ready */}
            <div className="w-full h-full bg-brand-secondary/20 flex items-center justify-center">
                <span className="text-brand-secondary font-bold text-xl">Image for {risk.title}</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-brand-text-primary mb-6">
              {risk.title}
            </h1>
            <p className="text-xl text-brand-text-secondary mb-8 leading-relaxed">
              {risk.longDescription}
            </p>

            <div className="bg-white/50 p-8 rounded-2xl border border-brand-border">
              <h3 className="text-2xl font-bold text-brand-text-primary mb-4">
                Key Benefits
              </h3>
              <ul className="space-y-3">
                {risk.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3 text-brand-text-secondary">
                    <FiCheckCircle className="text-brand-secondary flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button className="mt-8 w-full md:w-auto bg-brand-primary text-white font-bold py-4 px-8 rounded-full shadow-lg hover:bg-brand-primary-light transition-colors">
              Get a Quote Now
            </button>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
