"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { FaCar, FaHome, FaPlane, FaUsers } from "react-icons/fa";
import { gsap } from "gsap";
import type { Risk } from "@/types/risk";

// import accident from "/public/img/risks/accident.png";
// import travel from "/public/img/risks/usman-malik-cbXfPEOc1-k-unsplash.jpg";

// --- Component Data & Types ---
const riskData: Risk[] = [
  {
    id: "motor",
    icon: <FaCar />,
    title: "Motor Comprehensive",
    description:
      "Complete protection for your vehicle against accidents, theft, and third-party liabilities.",
    imageUrl: "/img/risks/accident.png",
    // "https://res.cloudinary.com/dnaaxfifx/image/upload/v1721081593/accident_hogjub",
  },
  {
    id: "travel",
    icon: <FaPlane />,
    title: "Travel Insurance",
    description:
      "Journey with confidence. Our policies cover medical emergencies, trip cancellations, and lost luggage.",
    imageUrl: "/img/risks/usman-malik-cbXfPEOc1-k-unsplash.jpg",
    // "https://res.cloudinary.com/dnaaxfifx/image/upload/v1721245695/usman-malik-cbXfPEOc1-k-unsplash_knf3ko",
  },
  {
    id: "gpa",
    icon: <FaUsers />,
    title: "Group Personal Accident (GPA)",
    description:
      "An essential employee benefit that provides 24-hour coverage for your team against accidental death or disability.",
    imageUrl: "/img/about/hero_image.png",
    //"https://res.cloudinary.com/dnaaxfifx/image/upload/v1721081593/hero_image_kvdq0z",
  },
  {
    id: "fire",
    icon: <FaHome />,
    title: "Fire & Burglary",
    description:
      "Safeguard your home or business premises and the valuable contents within against specific perils.",
    imageUrl: "/img/risks/fire.png",
    // "https://res.cloudinary.com/dnaaxfifx/image/upload/v1721081593/fire_b3ud1a",
  },
];

interface RiskShowcaseSectionProps {
  onSelectRisk: (risk: Risk) => void;
}
interface RiskTimelineCardProps {
  data: Risk;
  index: number;
  onSelectRisk: (risk: Risk) => void;
}
interface RiskImageCardProps {
  srcUrl: string;
  alt: string;
  children: React.ReactNode;
}

// --- Helper Components ---

// Replaces OptimizedImageCard with a Next.js-native implementation
const RiskImageCard: React.FC<RiskImageCardProps> = ({
  srcUrl,
  alt,
  children,
}) => (
  <div className="relative h-full w-full overflow-hidden">
    <Image
      src={srcUrl}
      alt={alt}
      fill
      style={{ objectFit: "cover" }}
      className="transition-transform duration-500 group-hover:scale-110"
      unoptimized={true} // For Cloudinary
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 flex flex-col justify-end">
      {children}
    </div>
  </div>
);

const RiskTimelineCard: React.FC<RiskTimelineCardProps> = ({
  data,
  index,
  onSelectRisk,
}) => {
  const isEven = index % 2 === 0;
  return (
    <motion.div
      className="w-full md:w-5/12"
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <div
        className="group rounded-lg shadow-2xl overflow-hidden"
        style={{ aspectRatio: "4/3" }}
      >
        <RiskImageCard srcUrl={data.imageUrl} alt={data.title}>
          <h3 className="text-2xl font-bold text-brand-accent">{data.title}</h3>
          <p className="mt-1 text-brand-text-onDark/80 text-sm">
            {data.description}
          </p>
          <button
            onClick={() => onSelectRisk(data)}
            className="group/button mt-4 inline-flex items-center gap-2 font-semibold text-brand-primary-light transition-colors hover:text-brand-white"
          >
            Learn More{" "}
            <FiArrowRight className="transition-transform group-hover/button:translate-x-1" />
          </button>
        </RiskImageCard>
      </div>
    </motion.div>
  );
};

// --- Main Exported Component ---
export default function RiskShowcaseSection({
  onSelectRisk,
}: RiskShowcaseSectionProps) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const animatedLineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    gsap.to(animatedLineRef.current, {
      height: `${latest * 100}%`,
      ease: "none",
    });

    const milestones = gsap.utils.toArray<HTMLElement>(".risk-showcase-icon");
    const currentLineHeight = animatedLineRef.current?.offsetHeight ?? 0;

    milestones.forEach((icon) => {
      if (currentLineHeight >= icon.offsetTop) {
        gsap.to(icon, { scale: 1.1, color: "#F97316", duration: 0.3 }); // brand-accent
      } else {
        gsap.to(icon, { scale: 1, color: "#C41E24", duration: 0.3 }); // brand-primary
      }
    });
  });

  return (
    <section className="overflow-x-hidden bg-brand-dark py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 md:mb-24">
          <h2
            className="text-4xl font-bold text-brand-text-onDark md:text-5xl"
            style={{ fontFamily: "Centra, sans-serif" }}
          >
            We See the Risk, So You Can See the Opportunity.
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-brand-text-onDark/70">
            Life comes with challenges. We&apos;re here to turn them into
            stepping stones.
          </p>
        </div>

        <div ref={timelineRef} className="relative">
          <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-black/30 md:block"></div>
          <div
            ref={animatedLineRef}
            className="absolute left-1/2 top-0 hidden h-0 w-0.5 -translate-x-1/2 bg-brand-primary md:block"
          ></div>

          {riskData.map((risk, index) => (
            <div
              key={risk.id}
              className="relative mb-12 flex items-center justify-center md:mb-0"
            >
              <div
                className={`flex w-full items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <RiskTimelineCard
                  data={risk}
                  index={index}
                  onSelectRisk={onSelectRisk}
                />
                <div className="hidden w-7/12 md:block"></div>
              </div>
              <div className="risk-showcase-icon absolute left-1/2 top-1/2 z-20 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-brand-primary bg-brand-dark md:flex">
                <div className="text-xl text-brand-primary">{risk.icon}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
