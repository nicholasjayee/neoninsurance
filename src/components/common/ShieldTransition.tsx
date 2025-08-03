"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// --- Main Exported Component --- (Preserved as an arrow function)
const ShieldTransition: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], // Preserving your exact animation trigger offsets
  });

  // --- Animation Logic --- (Preserved exactly as is)
  const topLeftX = useTransform(
    scrollYProgress,
    [0.3, 0.5, 0.7],
    [-20, 0, -20]
  );
  const topLeftY = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [-20, 0, 20]);
  const topLeftRotate = useTransform(
    scrollYProgress,
    [0.3, 0.5, 0.7],
    [-45, 0, 45]
  );
  const topLeftOpacity = useTransform(
    scrollYProgress,
    [0.3, 0.5, 0.65, 0.7],
    [0, 1, 1, 0]
  );

  const topRightX = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [20, 0, 20]);
  const topRightY = useTransform(
    scrollYProgress,
    [0.3, 0.5, 0.7],
    [-20, 0, 20]
  );
  const topRightRotate = useTransform(
    scrollYProgress,
    [0.3, 0.5, 0.7],
    [45, 0, -45]
  );
  const topRightOpacity = useTransform(
    scrollYProgress,
    [0.3, 0.5, 0.65, 0.7],
    [0, 1, 1, 0]
  );

  const btmLeftX = useTransform(
    scrollYProgress,
    [0.35, 0.5, 0.7],
    [-20, 0, -20]
  );
  const btmLeftY = useTransform(
    scrollYProgress,
    [0.35, 0.5, 0.7],
    [20, 0, -20]
  );
  const btmLeftOpacity = useTransform(
    scrollYProgress,
    [0.35, 0.5, 0.65, 0.7],
    [0, 1, 1, 0]
  );

  const btmRightX = useTransform(
    scrollYProgress,
    [0.35, 0.5, 0.7],
    [20, 0, 20]
  );
  const btmRightY = useTransform(
    scrollYProgress,
    [0.35, 0.5, 0.7],
    [20, 0, -20]
  );
  const btmRightOpacity = useTransform(
    scrollYProgress,
    [0.35, 0.5, 0.65, 0.7],
    [0, 1, 1, 0]
  );

  return (
    <div
      ref={ref}
      className="relative w-full h-24 flex items-center justify-center"
    >
      <div className="relative z-50 w-24 h-24 ">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full overflow-visible"
        >
          {/* Piece 1: Top-Left Curve */}
          <motion.path
            d="M 12 3 C 10.1128 4.93478 7.73199 6 5.00009 6"
            stroke="#D92D20" // brand-red
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              x: topLeftX,
              y: topLeftY,
              rotate: topLeftRotate,
              opacity: topLeftOpacity,
            }}
          />

          {/* Piece 2: Top-Right Curve */}
          <motion.path
            d="M 12 3 C 13.8871 4.93485 16.2681 6 19.0001 6"
            stroke="#F79009" // brand-orange
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              x: topRightX,
              y: topRightY,
              rotate: topRightRotate,
              opacity: topRightOpacity,
            }}
          />

          {/* Piece 3: Bottom-Left Wall */}
          <motion.path
            d="M 5.00009 6 C 4.81589 6 4.00009 6 4.00009 6 C 4.00009 6 4 8 4 9.16611 C 4 14.8596 7.3994 19.6436 12 21"
            stroke="#D92D20" // brand-red
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ x: btmLeftX, y: btmLeftY, opacity: btmLeftOpacity }}
          />

          {/* Piece 4: Bottom-Right Wall */}
          <motion.path
            d="M 19.0001 6 C 19.1843 6 20 6 20 6 C 20 6 20 8 20 9.16611 C 20 14.8596 16.6006 19.6436 12 21"
            stroke="#FDB022" // brand-yellow
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ x: btmRightX, y: btmRightY, opacity: btmRightOpacity }}
          />
        </svg>
      </div>
    </div>
  );
};

export default ShieldTransition;
