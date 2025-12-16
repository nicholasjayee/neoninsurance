"use client";

import React from "react";
import { motion } from "framer-motion";

export default function NeonPulseLoader() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-brand-light">
      <div className="relative flex items-center justify-center">
        {/* Outer Ring - Deep Crimson */}
        <motion.div
          className="absolute h-24 w-24 rounded-full border-4 border-brand-primary/30"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Middle Ring - Rich Amber */}
        <motion.div
          className="absolute h-16 w-16 rounded-full border-4 border-brand-secondary/50"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.2,
          }}
        />

        {/* Inner Core - Brand Primary */}
        <motion.div
          className="h-8 w-8 rounded-full bg-brand-primary shadow-[0_0_20px_rgba(163,22,27,0.6)]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
}
