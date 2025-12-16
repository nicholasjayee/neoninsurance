"use client";

import React, { useRef } from "react";
import { motion, useInView, UseInViewOptions, TargetAndTransition } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  viewport?: UseInViewOptions;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  width = "fit-content",
  delay = 0,
  duration = 0.5,
  direction = "up",
  className = "",
  viewport = { once: true, margin: "-50px" },
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, viewport);

  const getVariants = () => {
    const distance = 50;
    const hidden: TargetAndTransition = { opacity: 0 };
    const visible: TargetAndTransition = { opacity: 1 };

    switch (direction) {
      case "up":
        hidden.y = distance;
        visible.y = 0;
        break;
      case "down":
        hidden.y = -distance;
        visible.y = 0;
        break;
      case "left":
        hidden.x = distance;
        visible.x = 0;
        break;
      case "right":
        hidden.x = -distance;
        visible.x = 0;
        break;
      case "none":
      default:
        break;
    }

    return { hidden, visible };
  };

  return (
    <div ref={ref} style={{ position: "relative", width, overflow: "hidden" }} className={className}>
      <motion.div
        variants={getVariants()}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration, delay, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ScrollReveal;
