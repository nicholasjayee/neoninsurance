"use client";

import React, { useState, useEffect } from "react";
// import Image from "next/image"; // Replaces custom image component
import Link from "next/link"; // Replaces the 'a' tag for navigation
import { motion, AnimatePresence } from "framer-motion";
import { FiHome, FiTrendingUp, FiHeart, FiShield } from "react-icons/fi";
import { FaCar, FaBriefcase } from "react-icons/fa";
import OptimizedBgImage from "@/components/common/OptimizedImage";

// --- Type Definitions for our data structures ---
interface HeroContent {
  headline: string;
  subheadline: string;
  imageUrl: string;
}

interface FloatingIconProps {
  icon: React.ReactNode;
  className: string;
  duration: number;
}

// --- Component Data ---
const rotatingTextData: HeroContent[] = [
  {
    headline: "Clarity in Complexity.",
    subheadline:
      "We are your unwavering advocates, turning the tide on risk and securing your world.",
    imageUrl:
      "https://res.cloudinary.com/dnaaxfifx/image/upload/v1721081593/banner02_parfef.png",
  },
  {
    headline: "Your Future, Secured.",
    subheadline:
      "Tailored insurance solutions designed to protect what you've built and what's to come.",
    imageUrl:
      "https://res.cloudinary.com/dnaaxfifx/image/upload/v1721081593/fire_b3ud1a.png",
  },
  {
    headline: "Partners in Protection.",
    subheadline:
      "Navigating the world of insurance so you can focus on what matters most.",
    imageUrl:
      "https://res.cloudinary.com/dnaaxfifx/image/upload/v1721081593/services_bibxrl.png",
  },
  {
    headline: "Confidence for Tomorrow.",
    subheadline:
      "From personal assets to business ventures, we provide the peace of mind you deserve.",
    imageUrl:
      "https://res.cloudinary.com/dnaaxfifx/image/upload/v1721081593/hero_image_kvdq0z.png",
  },
  {
    headline: "Beyond a Policy. A Promise.",
    subheadline:
      "Our commitment is to you – your advocate in claims, your guide in coverage.",
    imageUrl:
      "https://res.cloudinary.com/dnaaxfifx/image/upload/v1721081593/ChatGPT_Image_Jul_12_2025_04_40_04_PM_jjvgb3.png",
  },
];

// --- Helper Component --- (Kept inside as it's only used here)
const FloatingIcon: React.FC<FloatingIconProps> = ({
  icon,
  className,
  duration,
}) => (
  <motion.div
    className={`absolute text-brand-secondary/10 hidden md:block ${className}`}
    animate={{ y: [0, -20, 0, 10, 0], x: [0, 10, -10, 0, 10] }}
    transition={{ duration, ease: "easeInOut", repeat: Infinity }}
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
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-brand-light p-4 sm:p-6">
      <AnimatePresence>
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          {/* CONVERTED to next/image for optimized, responsive backgrounds */}
          <OptimizedBgImage
            srcUrl={rotatingTextData[index].imageUrl}
            alt={rotatingTextData[index].headline}
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 z-10 bg-gradient-to-t from-brand-light via-brand-light/80 to-transparent"></div>

      <div className="absolute inset-0 z-20">
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

        {/* CONVERTED to next/link for optimized client-side navigation */}
        <Link
          href="/contact"
          className="mt-8 inline-block transform rounded-full bg-brand-primary py-3 px-8 font-bold text-white shadow-lg shadow-brand-primary/20 transition-all hover:scale-105 hover:bg-brand-primary-light md:mt-10 md:py-4 md:px-10"
        >
          Begin Your Journey to Security
        </Link>
      </div>
    </section>
  );
}
