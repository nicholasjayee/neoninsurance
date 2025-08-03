"use client"; // This must be a Client Component due to the use of Framer Motion's `animate` prop.

import React from "react";
import { motion } from "framer-motion";

// Preserving your exact import path and usage of your custom component.
import OptimizedBgImage from "@/components/common/OptimizedBgImage";

// Preserving your exact Cloudinary URL.
const serviceimage =
  "https://res.cloudinary.com/dnaaxfifx/image/upload/services_bibxrl";

// Preserving your original arrow function component structure.
const ServiceIntroSection: React.FC = () => {
  return (
    <section className="relative h-[60vh] flex items-center justify-center text-center">
      {/* The component call is preserved exactly as you have it. */}
      <OptimizedBgImage srcUrl={serviceimage} />

      {/* The overlay div is preserved with your exact classes. */}
      <div className="absolute inset-0 bg-brand-dark opacity-60"></div>

      <div className="relative z-10 p-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          // Preserving your exact class names.
          className="text-4xl md:text-6xl font-bold text-brand-white drop-shadow-lg"
        >
          Comprehensive Insurance Solutions
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-4 text-lg md:text-xl text-brand-text-onDark/90 max-w-3xl mx-auto"
        >
          From personal protection to commercial security, we tailor coverage
          that empowers your future.
        </motion.p>
      </div>
    </section>
  );
};

// Preserving your exact export statement.
export default ServiceIntroSection;
