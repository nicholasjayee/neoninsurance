"use client"; // This must be a Client Component due to useState and Framer Motion.

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiMinus } from "react-icons/fi";

import { Faq } from "@/lib/data/faqData";

// --- Type Definitions ---

interface FaqSectionProps {
  faqData: Faq[];
}

interface AccordionItemProps {
  data: Faq;
}

// --- Component Data --- (Preserved exactly, now typed)

// --- Helper Component --- (Preserved as an arrow function)
const AccordionItem: React.FC<AccordionItemProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-brand-border">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left py-4"
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-semibold text-brand-text-primary">
          {data.question}
        </h3>
        <div className="text-brand-primary">
          {isOpen ? <FiMinus /> : <FiPlus />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-brand-text-secondary">{data.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main Exported Component --- (Preserved as an arrow function)
const FaqSection: React.FC<FaqSectionProps> = ({ faqData = [] }) => {
  return (
    <section className="py-20 md:py-32 bg-brand-light">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-brand-text-primary">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <AccordionItem key={index} data={faq} />
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Export Statement --- (Preserved exactly)
export default FaqSection;
