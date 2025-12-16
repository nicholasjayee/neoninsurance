"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiHome, FiTrendingUp, FiHeart, FiShield } from "react-icons/fi";
import { FaCar, FaBriefcase } from "react-icons/fa";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/Button";

const Hero3D = dynamic(() => import("./Hero3D"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 -z-10 bg-brand-light" />,
});

// --- 2. UPDATED TYPE DEFINITION ---
interface HeroContent {
  headline: string;
  subheadline: string;
}

interface FloatingIconProps {
  icon: React.ReactNode;
  className: string;
  duration: number;
}

// --- 3. UPDATED COMPONENT DATA ---
const rotatingTextData: HeroContent[] = [
  {
    headline: "Clarity in Complexity.",
    subheadline:
      "We are your unwavering advocates, turning the tide on risk and securing your world.",
  },
  {
    headline: "Your Future, Secured.",
    subheadline:
      "Tailored insurance solutions designed to protect what you've built and what's to come.",
  },
  {
    headline: "Partners in Protection.",
    subheadline:
      "Navigating the world of insurance so you can focus on what matters most.",
  },
  {
    headline: "Confidence for Tomorrow.",
    subheadline:
      "From personal assets to business ventures, we provide the peace of mind you deserve.",
  },
  {
    headline: "Beyond a Policy. A Promise.",
    subheadline:
      "Our commitment is to you – your advocate in claims, your guide in coverage.",
  },
];

// --- Helper Component --- (Kept inside as it's only used here)
const FloatingIcon: React.FC<FloatingIconProps> = ({
  icon,
  className,
  duration,
}) => (
  <motion.div
    className={`absolute p-4 rounded-2xl glass text-brand-secondary/80 hidden md:flex items-center justify-center ${className}`}
    animate={{
      y: [0, -15, 0],
      rotate: [0, 5, -5, 0],
    }}
    transition={{
      duration,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse",
    }}
  >
    {icon}
  </motion.div>
);

// --- Main Exported Component ---
export default function DynamicHeroSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % rotatingTextData.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className=" relative flex min-h-screen items-center justify-center overflow-hidden bg-brand-light p-4 sm:p-6">
      {/* 3D Background Layer */}
      <Hero3D />

      <div className="absolute inset-0 z-10 bg-linear-to-t from-brand-light via-brand-light/50 to-transparent"></div>

      <div className="absolute inset-0 z-20 pointer-events-none">
        <FloatingIcon
          icon={<FiHome size={60} />}
          className="top-1/4 left-1/4"
          duration={15}
        />
        <FloatingIcon
          icon={<FaCar size={40} />}
          className="top-1/2 left-1/5"
          duration={20}
        />
        <FloatingIcon
          icon={<FiHeart size={50} />}
          className="bottom-1/4 left-1/3"
          duration={18}
        />
        <FloatingIcon
          icon={<FaBriefcase size={70} />}
          className="top-1/3 right-1/4"
          duration={22}
        />
        <FloatingIcon
          icon={<FiTrendingUp size={50} />}
          className="bottom-1/3 right-1/5"
          duration={16}
        />
      </div>

      <div className="relative z-30 text-center">
        <motion.div
          className="mb-4 inline-block rounded-full bg-brand-accent/10 p-4 md:mb-6 md:p-5"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
        >
          <FiShield className="h-10 w-10 text-brand-accent md:h-12 md:w-12" />
        </motion.div>

        <div className="relative flex h-56 items-center justify-center md:h-64">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute flex flex-col items-center"
            >
              <div className="px-4 md:min-w-[500px]">
                <h1 className="text-4xl font-extrabold leading-tight text-brand-text-primary sm:text-5xl md:text-6xl">
                  {rotatingTextData[index].headline}
                </h1>
                <p className="mx-auto mt-4 max-w-2xl text-base text-brand-text-secondary sm:mt-6 sm:text-lg md:text-xl">
                  {rotatingTextData[index].subheadline}
                </p>
              </div>

              <div className="mt-4 h-1.5 w-full max-w-sm sm:mt-6">
                <motion.div
                  className="h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  exit={{ width: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  style={{
                    background:
                      "linear-gradient(90deg, #F97316, #C41E24, #FBCB0A)",
                  }}
                ></motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <Link href="/contact">
          <Button
            variant="primary"
            size="lg"
            className="mt-8 md:mt-12 shadow-brand-primary/30 group"
          >
            <span className="relative z-10">Begin Your Journey</span>
            <motion.span
              className="relative z-10 ml-2 inline-block"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </Button>
        </Link>
      </div>
    </section>
  );
}
