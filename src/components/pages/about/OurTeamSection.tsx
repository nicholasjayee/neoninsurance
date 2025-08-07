"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import OptimizedImage from "@/components/common/OptimizedImage";
// CORRECT: Importing your existing, correct useMediaQuery hook.
import useMediaQuery from "@/hooks/useMediaQuery";

// --- Type Definitions ---
interface TeamMember {
  name: string;
  role: string;
  imageUrl: string;
  quote: string;
  roleColor: string;
}

// --- Component Data --- (Image paths are updated for the /public directory)
const teamData: TeamMember[] = [
  {
    name: "Musasizi-Elizabeth",
    role: "chief Operations officer",
    imageUrl: "/img/about/Musasizi-Elizabeth(chief Operations officer).png",
    quote:
      "We build trust through seamless execution. My goal is to ensure our operational process is as reliable and clear as the protection we provide.",
    roleColor: "brand-primary",
  },
  {
    name: "KIgemuzi-Rashid",
    role: "Manager",
    imageUrl: "/img/about/KIgemuzi-Rashid(Manager).png",
    quote:
      "Our team is your advocate. We lead with expertise to navigate the complexities of insurance, ensuring you are always protected and prioritized.",
    roleColor: "brand-primary",
  },
  {
    name: "Nambiro-Winfred",
    role: "Marketing",
    imageUrl: "/img/about/Nambiro-Winfred(-Marketing).png",
    quote:
      "My passion is connecting our promise of security with the community we serve, making complex insurance simple and accessible for everyone",
    roleColor: "brand-accent",
  },
  {
    name: "Mr.Gilbert Akampa",
    role: "UnderWriting",
    imageUrl: "/img/about/Mr.Gilbert Akampa (UnderWritting).png",
    quote: "",
    roleColor: "brand-primary",
  },
  {
    name: "Orishaba Patience Akankwatsa",
    role: "Finance",
    imageUrl: "/img/about/Patience.png",
    quote: "",
    roleColor: "brand-secondary-dark",
  },
  {
    name: "Umar-Semambo",
    role: "Assessor",
    imageUrl: "/img/about/Umar-Semambo(Assessor).png",
    quote: "",
    roleColor: "brand-secondary-dark",
  },
  {
    name: "Ndiho-Gregory",
    role: "Acounts-Executive & IT",
    imageUrl: "/img/about/Ndiho-Gregory(-Acounts-Executive.png",
    quote: "",
    roleColor: "brand-accent",
  },
];

// This mapping is essential for Tailwind to correctly build the dynamic class names.
const roleColorMap: { [key: string]: { bg: string; text: string } } = {
  "brand-primary": { bg: "bg-brand-primary", text: "text-brand-primary" },
  "brand-accent": { bg: "bg-brand-accent", text: "text-brand-accent" },
  "brand-secondary-dark": {
    bg: "bg-brand-secondary-dark",
    text: "text-brand-secondary-dark",
  },
};

// --- Main Exported Component ---
const OurTeamSection: React.FC = () => {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // This now correctly uses your external hook.
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const navigate = useCallback((direction: "next" | "prev") => {
    setActiveIndex((prevIndex) => {
      return direction === "next"
        ? (prevIndex + 1) % teamData.length
        : (prevIndex - 1 + teamData.length) % teamData.length;
    });
  }, []);

  useEffect(() => {
    if (!isHovering) {
      intervalRef.current = setInterval(() => navigate("next"), 4000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovering, navigate]);

  const getCardStyle = (index: number) => {
    const offset = index - activeIndex;
    const isVisible = Math.abs(offset) <= 2;
    if (!isVisible)
      return {
        opacity: 0,
        scale: 0.5,
        x: "-50%",
        y: "-50%",
        pointerEvents: "none",
      };
    return {
      x: isDesktop ? `${-50 + offset * 35}%` : `${-50 + offset * 30}%`,
      y: "-50%",
      scale: 1 - Math.abs(offset) * 0.15,
      opacity: isHovering && offset !== 0 ? 0.3 : 1 - Math.abs(offset) * 0.3,
      zIndex: teamData.length - Math.abs(offset),
      pointerEvents: "auto",
    };
  };

  const activeRoleColors = roleColorMap[teamData[activeIndex].roleColor];

  if (!hasMounted) {
    // Returning null or a skeleton loader prevents the hydration mismatch.
    return null;
  }

  return (
    <section
      className="py-16 md:py-32 bg-brand-light overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-brand-text-primary">
            Meet Our Leadership
          </h2>
          <p className="font-mono text-brand-accent mt-2 text-sm md:text-base">
            || The People Behind The Promise
          </p>
          <div
            className="w-20 md:w-24 h-1 mx-auto mt-4"
            style={{
              background: "linear-gradient(90deg, #F97316, #C41E24, #FBCB0A)",
            }}
          />
        </motion.div>

        <div className="relative h-48 md:h-56 w-full max-w-xs md:max-w-lg mx-auto mb-8 md:mb-12">
          {teamData.map((member, index) => (
            <motion.div
              key={index}
              className="absolute w-32 h-32 md:w-40 md:h-40 top-1/2 left-1/2 cursor-pointer"
              initial={false}
              animate={getCardStyle(index)}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              onClick={() => setActiveIndex(index)}
            >
              <div className="w-full h-full rounded-full border-4 border-brand-white shadow-lg overflow-hidden">
                <OptimizedImage srcUrl={member.imageUrl} alt={member.name} />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="relative max-w-2xl mx-auto flex items-center justify-center">
          <motion.button
            onClick={() => navigate("prev")}
            className="p-2 rounded-full text-brand-text-tertiary hover:text-brand-primary transition-colors z-20"
            whileTap={{ scale: 0.9 }}
          >
            <FiArrowLeftCircle className="w-6 h-6 md:w-8 md:h-8" />
          </motion.button>

          <div className="relative w-full h-36 md:h-32 mx-2 text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute inset-0 flex flex-col justify-center"
              >
                <h3
                  className={`text-xl md:text-2xl font-bold ${activeRoleColors.text}`}
                >
                  {teamData[activeIndex].name}
                </h3>
                <p className="text-brand-text-secondary font-medium text-sm md:text-base">
                  {teamData[activeIndex].role}
                </p>
                {teamData[activeIndex].quote && (
                  <p className="text-brand-text-tertiary text-sm italic mt-2 hidden md:block px-4">
                    &quot;{teamData[activeIndex].quote}&quot;
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-1">
              <div
                className={`w-full h-full rounded-full transition-colors duration-300 ${activeRoleColors.bg}`}
              />
            </div>
          </div>

          <motion.button
            onClick={() => navigate("next")}
            className="p-2 rounded-full text-brand-text-tertiary hover:text-brand-primary transition-colors z-20"
            whileTap={{ scale: 0.9 }}
          >
            <FiArrowRightCircle className="w-6 h-6 md:w-8 md:h-8" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default OurTeamSection;
