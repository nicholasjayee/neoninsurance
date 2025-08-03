"use client"; // This must be a Client Component due to the use of Framer Motion's whileInView.

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link"; // Using Next.js Link for client-side navigation

// Preserving your original arrow function component structure.
const GetAQuoteSection: React.FC = () => {
  return (
    <section className="py-20 md:py-24 bg-brand-light">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="relative rounded-2xl p-10 md:p-16 text-center max-w-4xl mx-auto overflow-hidden shadow-2xl"
          // Preserving your exact inline style for the gradient.
          style={{
            background: "linear-gradient(135deg, #F97316, #C41E24, #FBCB0A)",
          }}
        >
          {/* 
            CONVERTED: The background URL path now points to the /public directory.
            Ensure your subtle-pattern.svg is in /public/patterns/
          */}
          <div className="absolute inset-0 bg-[url('/patterns/subtle-pattern.svg')] opacity-10"></div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-extrabold text-brand-white">
              Ready for Comprehensive Protection?
            </h2>
            <p className="mt-6 text-lg text-brand-text-onDark/80 max-w-2xl mx-auto">
              Let&apos;s build a policy that fits you perfectly. Get in touch
              with our experts for a free, no-obligation consultation and quote.
            </p>
            {/* The <a> tag is now a Next.js Link component. */}
            <Link
              href="/contact"
              className="mt-10 inline-block bg-brand-white text-brand-primary font-bold py-4 px-10 rounded-full shadow-lg hover:bg-brand-light hover:text-brand-primary-dark transition-all transform hover:scale-105"
            >
              Get a Free Quote
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Preserving your exact export statement.
export default GetAQuoteSection;
