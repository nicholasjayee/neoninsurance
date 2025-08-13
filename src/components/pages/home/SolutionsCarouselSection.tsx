"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FaRegCheckCircle } from "react-icons/fa";
import { PlusCircle } from "lucide-react"; // Import the icon
import { solutionsData } from "@/data/navigationData";
import type { Solution } from "@/data/navigationData";

const listContainerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const listItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

export default function SolutionsCarouselSection() {
  const [activeTab, setActiveTab] = useState<string>(solutionsData[0].id);
  const activeSolution = solutionsData.find(
    (s) => s.id === activeTab
  ) as Solution;

  const dynamicStyles = {
    "--active-color": activeSolution.color,
  } as React.CSSProperties;

  return (
    <section className="bg-brand-dark py-20 md:py-32" style={dynamicStyles}>
      <div className="container mx-auto px-6">
        {/* --- NO CHANGES TO THIS PART --- */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-brand-text-onDark md:text-4xl">
            Solutions Tailored for Every Need
          </h2>
          <p className="mt-4 text-base text-brand-text-onDark/70 md:text-lg">
            Whether for an individual or business, we build a shield of
            protection that fits you perfectly.
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          {/* --- NO CHANGES TO THIS PART --- */}
          <div className="mb-12 flex justify-center border-b border-white/10">
            {solutionsData.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="relative w-1/3 py-3 px-4 font-semibold text-brand-text-onDark/60 transition-colors duration-300 hover:text-brand-text-onDark md:px-6"
              >
                <div className="flex flex-col items-center gap-1 md:flex-row md:gap-2">
                  <div
                    className="text-xl md:text-2xl"
                    style={{
                      color: activeTab === tab.id ? "var(--active-color)" : "",
                    }}
                  >
                    {tab.icon}
                  </div>
                  <span
                    className="text-sm leading-tight md:text-base"
                    style={{
                      color: activeTab === tab.id ? "var(--active-color)" : "",
                    }}
                  >
                    {tab.label}
                  </span>
                </div>
                {activeTab === tab.id && (
                  <motion.div
                    className="absolute bottom-[-1px] left-0 right-0 h-1"
                    style={{ backgroundColor: "var(--active-color)" }}
                    layoutId="underline"
                  />
                )}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex flex-col items-center gap-8 text-center md:flex-row md:items-start md:gap-12 md:text-left"
            >
              {/* --- NO CHANGES TO THIS PART --- */}
              <motion.div
                key={`${activeTab}-icon`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-7xl md:text-8xl"
                style={{ color: "var(--active-color)" }}
              >
                {activeSolution.icon}
              </motion.div>

              {/* --- STRUCTURAL CHANGE IS HERE --- */}
              {/* This new div wraps the list AND the button, ensuring they are laid out correctly together */}
              <div className="flex flex-1 flex-col">
                {/* Your original list of services remains completely untouched */}
                <motion.div
                  className="space-y-3" // Removed flex-1 from here
                  variants={listContainerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {activeSolution.services.map((service, index) => (
                    <motion.div
                      key={index}
                      variants={listItemVariants}
                      className="flex items-center justify-center gap-3 md:justify-start"
                    >
                      <FaRegCheckCircle
                        className="flex-shrink-0 text-lg md:text-xl"
                        style={{ color: "var(--active-color)", opacity: 0.5 }}
                      />
                      {service.slug ? (
                        <Link
                          href={`/display/${service.slug}`}
                          className="text-base text-brand-text-onDark hover:underline md:text-lg"
                        >
                          {service.name}
                        </Link>
                      ) : (
                        <span className="cursor-not-allowed text-base text-brand-text-onDark/70 md:text-lg">
                          {service.name}
                        </span>
                      )}
                    </motion.div>
                  ))}
                </motion.div>

                {/* --- THIS IS THE NEW PLUS BUTTON --- */}
                {/* It is now placed correctly AFTER the list, with its own animation */}
                <motion.div
                  className="mt-6 flex justify-center md:justify-start"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.5, duration: 0.4 }, // Fades in after the list animates
                  }}
                >
                  <Link
                    href={`/solutions/${activeSolution.id}`}
                    aria-disabled
                    className="group inline-flex items-center gap-3 rounded-full py-2 px-5 text-sm font-semibold transition-all duration-300 md:text-base text-[var(--active-color)] bg-[var(--active-color)]/10 border border-[var(--active-color)]/30 hover:bg-[var(--active-color)]/20"
                  >
                    <PlusCircle
                      size={20}
                      className="transition-transform duration-300 group-hover:rotate-90"
                    />
                    <span>Explore More Options</span>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
