"use client"; // This must be a Client Component due to the use of Framer Motion's whileInView.

import React from "react";
import { motion } from "framer-motion";
// Preserving your exact import of the custom OptimizedBgImage component.
import OptimizedBgImage from "@/components/common/OptimizedBgImage";

// Preserving your exact Cloudinary URL.
const heroImageUrl =
  "https://res.cloudinary.com/dnaaxfifx/image/upload/hero_image_kvdq0z";

// Preserving your original arrow function component structure.
const AboutHeroSection: React.FC = () => {
  return (
    <section className="relative h-[70vh] flex items-center justify-center text-center overflow-hidden">
      {/* The OptimizedBgImage component is used exactly as in your original code. */}
      <OptimizedBgImage srcUrl={heroImageUrl} />

      {/* 
        The gradient overlay is preserved with your exact brand color classes.
      */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-light via-brand-dark/20 to-brand-dark/50 z-10"></div>

      <div className="relative z-20 p-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          // Preserving your exact class names.
          className="text-4xl md:text-6xl font-bold text-brand-white drop-shadow-lg"
        >
          About Neon Insurance
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-4 text-lg md:text-xl text-brand-text-onDark/90 max-w-3xl mx-auto"
        >
          Discover the story, values, and the dedicated team committed to your
          protection.
        </motion.p>
      </div>
    </section>
  );
};

export default AboutHeroSection;
