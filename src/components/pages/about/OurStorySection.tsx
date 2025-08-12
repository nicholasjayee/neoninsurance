"use client";

import React, { useRef, ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { FaFlag, FaUsers, FaCertificate, FaGlobe, FaBus } from "react-icons/fa";
import { gsap } from "gsap";

import { Story } from "@/lib/data/storyData";
import OptimizedBgImage from "@/components/common/OptimizedBgImage";

const iconMap: { [key: string]: ReactNode } = {
  flag: <FaFlag />,
  bus: <FaBus />,
  certificate: <FaCertificate />,
  users: <FaUsers />,
  globe: <FaGlobe />,
};

// --- Type Definitions ---
interface StoryCardProps {
  data: Story;
  index: number;
}

interface OurStorySectionProps {
  storyData: Story[];
}

// --- Component Data ---
const aboutimage =
  "https://res.cloudinary.com/dnaaxfifx/image/upload/v1721081593/ChatGPT_Image_Jul_12_2025_04_40_04_PM_jjvgb3";

// --- Helper Component for Desktop View ---
const StoryCard: React.FC<StoryCardProps> = ({ data, index }) => {
  const isEven = index % 2 === 0;
  return (
    <div className="flex items-center w-full mb-8 z-10">
      <div
        className={`flex ${
          isEven ? "flex-row" : "flex-row-reverse"
        } items-center w-full`}
      >
        <motion.div
          className="w-full md:w-5/12"
          initial={{ opacity: 0, x: isEven ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <div className="p-6 bg-brand-white rounded-lg border border-brand-border shadow-sm">
            <p className="text-brand-accent font-semibold text-sm mb-1">
              {data.year}
            </p>
            <h4 className="font-bold text-xl text-brand-text-primary mb-2">
              {data.title}
            </h4>
            <p className="text-brand-text-secondary text-sm">
              {data.description}
            </p>
          </div>
        </motion.div>
        <div className="hidden md:block w-7/12"></div>
      </div>
    </div>
  );
};

// --- Main Exported Component ---
const OurStorySection: React.FC<OurStorySectionProps> = ({
  storyData = [],
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const animatedLineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: timelineScrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end end"],
  });
  const { scrollYProgress: parallaxScrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  useMotionValueEvent(timelineScrollYProgress, "change", (latest) => {
    const ctx = gsap.context(() => {
      gsap.to(animatedLineRef.current, {
        height: `${latest * 100}%`,
        ease: "none",
      });
      const milestones = gsap.utils.toArray<HTMLElement>(".milestone-icon");

      milestones.forEach((icon) => {
        const iconTop = icon.offsetTop;
        const lineHeight = animatedLineRef.current?.offsetHeight ?? 0;
        if (lineHeight >= iconTop) {
          gsap.to(icon, { scale: 1.2, color: "#C41E24", duration: 0.3 });
        } else {
          gsap.to(icon, { scale: 1, color: "#A3161B", duration: 0.3 });
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  });

  const y = useTransform(parallaxScrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <section
      ref={sectionRef}
      className="relative pt-20  md:pt-32 bg-brand-dark overflow-hidden"
    >
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <OptimizedBgImage srcUrl={aboutimage} />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light via-brand-light/80 to-transparent"></div>
      </motion.div>

      <div className="container mx-auto px-6 relative z-10 pb-20 md:pb-32">
        <motion.div className="text-center mb-16 md:mb-24">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-white drop-shadow-md">
            Our Journey
          </h2>
          <p className="font-mono text-brand-accent mt-2 drop-shadow-md">
            {"// A Legacy of Trust and Advocacy"}
          </p>
          <div className="w-24 h-1 bg-brand-primary mx-auto mt-4"></div>
        </motion.div>

        {/* --- Desktop Timeline with GSAP --- */}
        <div ref={timelineRef} className="hidden md:block relative">
          <div className="absolute top-0 left-1/2 w-0.5 h-full bg-brand-border -translate-x-1/2"></div>
          <div
            ref={animatedLineRef}
            className="absolute top-0 left-1/2 w-0.5 h-0 bg-brand-primary -translate-x-1/2"
          ></div>
          {storyData.map((story, index) => (
            <div key={story.id} className="relative flex justify-center">
              <div className="milestone-icon absolute top-8 left-1/2 -translate-x-1/2 w-10 h-10 bg-brand-light rounded-full border-4 border-brand-primary-dark flex items-center justify-center z-20">
                <div className="text-brand-primary-dark text-xl">
                  {iconMap[story.icon]}
                </div>
              </div>
              <StoryCard data={story} index={index} />
            </div>
          ))}
        </div>

        {/* THE FIX: The complete mobile timeline JSX is now restored. */}
        <div className="md:hidden relative">
          <div className="absolute top-0 left-5 w-0.5 h-full bg-brand-border -translate-x-1/2"></div>
          {storyData.map((story, index) => (
            <div key={index} className="relative pl-16 mb-12">
              <motion.div
                className="absolute left-0 top-0 w-10 h-10 bg-brand-light rounded-full border-4 border-brand-primary flex items-center justify-center z-10"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
              >
                <div className="text-brand-primary text-xl">
                  {iconMap[story.icon]}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6 }}
              >
                <div className="p-6 bg-brand-white rounded-lg border border-brand-border shadow-sm">
                  <p className="text-brand-accent font-semibold text-sm mb-1">
                    {story.year}
                  </p>
                  <h4 className="font-bold text-xl text-brand-text-primary mb-2">
                    {story.title}
                  </h4>
                  <p className="text-brand-text-secondary text-sm">
                    {story.description}
                  </p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurStorySection;
