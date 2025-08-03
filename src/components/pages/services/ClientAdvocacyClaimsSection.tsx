"use client"; // This must be a Client Component due to the use of Framer Motion's whileInView.

import React from "react";
import { motion } from "framer-motion";
// Preserving your exact import of your custom component.
import OptimizedImage from "@/components/common/OptimizedImage";

// Preserving your exact Cloudinary URL.
const serviceimage =
  "https://res.cloudinary.com/dnaaxfifx/image/upload/services_bibxrl";

// Preserving your original arrow function component structure.
const ClientAdvocacyClaimsSection: React.FC = () => {
  return (
    <section className="relative py-20 md:py-32 bg-brand-dark">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-mono text-brand-accent mb-2">
            {"// Your Strongest Ally"}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-brand-text-onDark">
            Our Commitment Shines Brightest During a Claim.
          </h2>
          <p className="text-brand-text-onDark/70">
            When you need us most, we are more than just your broker; we are
            your dedicated advocate. We manage the entire claims process, from
            preparation to negotiation, ensuring you receive a fair, fast, and
            favorable outcome. You are never alone.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="h-80 rounded-lg overflow-hidden shadow-lg"
        >
          {/* Preserving your exact component call. */}
          <OptimizedImage
            srcUrl={serviceimage}
            alt="A professional insurance broker assisting a client."
          />
        </motion.div>
      </div>
    </section>
  );
};

// Preserving your exact export statement.
export default ClientAdvocacyClaimsSection;
