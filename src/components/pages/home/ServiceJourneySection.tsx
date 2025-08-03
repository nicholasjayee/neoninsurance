"use client";

import React, { useRef, useState, useEffect } from "react"; // Added useState and useEffect
import {
  useScroll,
  useTransform,
  motion,
  type MotionValue,
} from "framer-motion";
import {
  FiPhoneCall,
  FiFilePlus,
  FiCheckSquare,
  FiAward,
} from "react-icons/fi";

import useMediaQuery from "@/hooks/useMediaQuery";
import LargeScreenJourney from "./LargeScreenJourney";
import SmallScreenJourney from "./SmallScreenJourney"; // Your comment is preserved

// --- Type Definitions ---
export interface ClaimStep {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  position: { x: number; y: number };
  progressPoint: number;
}
interface ScrollPrompterProps {
  opacity: MotionValue<number>;
}

// --- Component Data ---
const claimsJourneyData: ClaimStep[] = [
  {
    id: "gsap-step-1",
    icon: <FiPhoneCall />,
    title: "Claim Reported",
    description:
      "You notify us, and we immediately register the claim on your behalf.",
    position: { x: 120, y: 0 },
    progressPoint: 0.1,
  },
  {
    id: "gsap-step-2",
    icon: <FiFilePlus />,
    title: "Inspection & Document sharing",
    description: "We visit the site and advise on required documents",
    position: { x: 520, y: 140 },
    progressPoint: 0.35,
  },
  {
    id: "gsap-step-3",
    icon: <FiCheckSquare />,
    title: "Claim Review",
    description: "Claim documents are collected, reviewed and submited",
    position: { x: 200, y: 380 },
    progressPoint: 0.65,
  },
  {
    id: "gsap-step-4",
    icon: <FiAward />,
    title: "Claim settlement",
    description: "We ensure timely payments",
    position: { x: 500, y: 540 },
    progressPoint: 0.9,
  },
];

// --- Reusable Scroll Prompter Component ---
const ScrollPrompter: React.FC<ScrollPrompterProps> = ({ opacity }) => (
  <motion.div style={{ opacity }}>
    <motion.div
      initial="start"
      animate="end"
      transition={{ staggerChildren: 0.2 }}
    >
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          variants={{
            start: { opacity: 0, y: 0 },
            end: {
              opacity: [0, 1, 0],
              y: [0, 20, 40],
              transition: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2,
              },
            },
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-brand-text-primary"
          >
            <path
              d="M19.9201 8.9502L13.4001 15.4702C12.6301 16.2402 11.3701 16.2402 10.6001 15.4702L4.08008 8.9502"
              stroke="currentColor"
              strokeWidth="2"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      ))}
    </motion.div>
  </motion.div>
);

// --- Main Exported Component ---
const ServiceJourneySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isLargeScreen = useMediaQuery("(min-width: 768px)");

  // THE FIX: This state prevents the component from rendering its responsive logic
  // on the server and during the initial client render, solving the hydration error.
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const topPrompterOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const bottomPrompterOpacity = useTransform(
    scrollYProgress,
    [0.95, 1],
    [0, 1]
  );

  // THE FIX: The component's dynamic height depends on `isLargeScreen`, which causes the hydration error.
  // We return a simple, fixed-height placeholder until the component has mounted on the client.
  if (!hasMounted) {
    return (
      <section ref={sectionRef} className="relative bg-brand-light h-[400vh]" />
    );
  }

  return (
    <section
      ref={sectionRef}
      className={`relative bg-brand-light ${isLargeScreen ? "h-[250vh]" : ""}`}
    >
      <div
        className={`${
          isLargeScreen ? "sticky top-0 h-screen" : ""
        } w-full flex flex-col items-center`}
      >
        <div className="text-center pt-16 md:pt-24 px-4 relative z-20">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-text-primary">
            Your Advocate in Action
          </h2>
          <p className="mt-4 text-base md:text-lg text-brand-text-secondary max-w-2xl mx-auto">
            See our transparent and supportive claims process from start to
            finish.
          </p>
          {isLargeScreen && (
            <div className="absolute top-[calc(100%+3rem)] left-1/2 -translate-x-1/2">
              <ScrollPrompter opacity={topPrompterOpacity} />
            </div>
          )}
        </div>

        <div className="w-full h-full flex-grow">
          {isLargeScreen ? (
            <LargeScreenJourney
              scrollYProgress={scrollYProgress}
              claimsJourneyData={claimsJourneyData}
            />
          ) : (
            // Your commented-out code is preserved exactly.
            <SmallScreenJourney
              scrollYProgress={scrollYProgress}
              claimsJourneyData={claimsJourneyData}
            />
          )}
        </div>
      </div>

      {isLargeScreen && (
        <div className="absolute bottom-56 left-1/2 -translate-x-1/2 z-30 pb-10">
          <ScrollPrompter opacity={bottomPrompterOpacity} />
        </div>
      )}
    </section>
  );
};

export default ServiceJourneySection;
