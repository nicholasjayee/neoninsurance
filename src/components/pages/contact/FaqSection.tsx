"use client"; // This must be a Client Component due to useState and Framer Motion.

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiMinus } from "react-icons/fi";

// --- Type Definitions ---
interface Faq {
  question: string;
  answer: string;
}

interface AccordionItemProps {
  data: Faq;
}

// --- Component Data --- (Preserved exactly, now typed)
const faqData: Faq[] = [
  {
    question:
      "Why should I use an insurance broker instead of going to the insurer directly?",
    answer:
      "An insurance broker works for you, not the insurance company. We save you time, money, and worry by providing impartial advice, accessing a wide market to find the best rates, and acting as your dedicated advocate during claims to ensure a fair settlement.",
  },
  {
    question: "How do you determine the right level of cover for me?",
    answer:
      "Our process begins with a detailed assessment of your unique personal or business risks. We help you understand the complex details of different policies and work with you to choose a level of coverage that is both appropriate and comprehensive, so there are no gaps in your protection.",
  },
  {
    question: "What is your role when I need to make a claim?",
    answer:
      "This is our most critical function. As your claims advocate, we are there when you need us most. We assist with the preparation and settlement of your claim, and we liaise directly with the insurance company to negotiate the best possible outcome on your behalf.",
  },
  {
    question: "Are you licensed and regulated?",
    answer:
      "Yes, absolutely. Neon Insurance Brokers Limited is a fully licensed entity and a proud member of the Insurance Brokers Association of Uganda (IBAU). We adhere to the strict professional and ethical standards set forth by the association to protect the interests of our clients and the public.",
  },
  {
    question: "Can you create custom or tailored insurance plans?",
    answer:
      "Yes. A key advantage of using a broker is our ability to organize insurance covers that are tailored to your individual requirements. We are not tied to one provider, which allows us to build customized plans by selecting the best products from a wide range of leading insurers.",
  },
];

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
const FaqSection: React.FC = () => {
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
