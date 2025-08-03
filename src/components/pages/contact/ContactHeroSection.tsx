"use client"; // This must be a Client Component due to the use of Framer Motion's `animate` prop.

import React from "react";
import { motion } from "framer-motion";
// Preserving your exact import of your custom component.
import OptimizedBgImage from "@/components/common/OptimizedBgImage";

// Preserving your exact Cloudinary URL.
const contactimage =
  "https://res.cloudinary.com/dnaaxfifx/image/upload/contact_btico2";

// Preserving your original arrow function component structure.
const ContactHeroSection: React.FC = () => {
  return (
    <section className="relative h-[60vh] flex items-center justify-center text-center bg-cover bg-center">
      {/* The OptimizedBgImage component call is preserved exactly. */}
      <OptimizedBgImage srcUrl={contactimage} />

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
          Let&apos;s Connect
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-4 text-lg md:text-xl text-brand-text-onDark/90 max-w-3xl mx-auto"
        >
          Have a question or ready to get started? We&apos;re here to help.
        </motion.p>
      </div>
    </section>
  );
};

// Preserving your exact export statement.
export default ContactHeroSection;
