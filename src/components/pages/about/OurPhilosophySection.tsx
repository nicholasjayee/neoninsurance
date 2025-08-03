"use client";

import React, { useState, useEffect, ReactNode } from "react";
import { motion } from "framer-motion";
import { FaHandshake, FaBalanceScale, FaBullseye } from "react-icons/fa";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { IOptions, RecursivePartial } from "@tsparticles/engine";

// --- Type Definitions ---
interface Philosophy {
  icon: ReactNode;
  title: string;
  description: string;
  bgColor: string;
  iconColor: string;
}

interface PhilosophyCardProps {
  data: Philosophy;
  index: number;
}

// --- Component Data ---
const philosophyData: Philosophy[] = [
  {
    icon: <FaBullseye />,
    title: "Clarity Above All",
    description:
      "We translate the fine print into clear, understandable advice so you can make confident decisions.",
    bgColor: "bg-brand-accent/10",
    iconColor: "text-brand-accent",
  },
  {
    icon: <FaBalanceScale />,
    title: "Your Unwavering Advocate",
    description:
      "We work for you, not the insurance companies. In the event of a claim, we are your dedicated champions.",
    bgColor: "bg-brand-primary/10",
    iconColor: "text-brand-primary",
  },
  {
    icon: <FaHandshake />,
    title: "Partnership for the Long Term",
    description:
      "We see ourselves as your lifelong partners in protection, providing proactive advice as your needs evolve.",
    bgColor: "bg-brand-secondary/10",
    iconColor: "text-brand-secondary-dark",
  },
];

// --- Helper Component ---
const PhilosophyCard: React.FC<PhilosophyCardProps> = ({ data, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="flex flex-col items-center text-center p-6 z-10"
    >
      <div
        className={`relative w-24 h-24 rounded-full flex items-center justify-center mb-6 ${data.bgColor}`}
      >
        <div className={`text-4xl ${data.iconColor}`}>{data.icon}</div>
      </div>
      <h3 className="text-xl font-bold text-brand-text-primary mb-3">
        {data.title}
      </h3>
      <p className="text-brand-text-secondary max-w-xs">{data.description}</p>
    </motion.div>
  );
};

// --- Main Exported Component ---
const OurPhilosophySection: React.FC = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesOptions: RecursivePartial<IOptions> = {
    particles: {
      number: {
        value: 25,
        density: {
          enable: true,
          // THE FIX: The `area` (formerly `value_area`) property has been removed.
          // The new library version calculates density automatically.
        },
      },
      color: {
        value: ["#F97316", "#C41E24", "#FBCB0A"],
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: { min: 0.1, max: 0.4 },
        animation: {
          enable: true,
          speed: 1,
          sync: false,
        },
      },
      size: {
        value: { min: 1, max: 6 },
        animation: {
          enable: true,
          speed: 3,
          sync: false,
        },
      },
      move: {
        enable: true,
        speed: 0.8,
        direction: "top",
        random: true,
        straight: false,
        outModes: {
          default: "out",
        },
      },
    },
    interactivity: {
      detectsOn: "canvas",
      events: {
        onHover: {
          enable: false,
          mode: "repulse",
        },
        onClick: {
          enable: false,
          mode: "push",
        },
      },
    },
    detectRetina: true,
  };

  return (
    <section className="relative py-20 md:py-32 bg-brand-light overflow-hidden">
      <div className="absolute inset-0 z-0">
        {init && (
          <Particles id="philosophyParticles" options={particlesOptions} />
        )}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-brand-text-primary">
            Our Guiding Principles
          </h2>
          <p className="font-mono text-brand-accent mt-2">
            {"// The Core Values That Drive Us"}
          </p>
          <div
            className="w-24 h-1 mx-auto mt-4"
            style={{
              background: "linear-gradient(90deg, #F97316, #C41E24, #FBCB0A)",
            }}
          ></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {philosophyData.map((philosophy, index) => (
            <PhilosophyCard key={index} data={philosophy} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurPhilosophySection;
