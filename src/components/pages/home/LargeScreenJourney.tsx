"use client";

import React, { useLayoutEffect, useRef } from "react";
import { type MotionValue } from "framer-motion";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { FiSend } from "react-icons/fi";
import type { ClaimStep } from "./ServiceJourneySection";

gsap.registerPlugin(MotionPathPlugin);

// --- Type Definitions for Component Props ---
interface MilestoneProps {
  data: ClaimStep;
}

interface LargeScreenJourneyProps {
  scrollYProgress: MotionValue<number>;
  claimsJourneyData: ClaimStep[];
}

// --- Helper Component ---
const Milestone: React.FC<MilestoneProps> = ({ data }) => (
  <foreignObject
    x={data.position.x}
    y={data.position.y}
    width="192"
    height="150"
    id={data.id}
    className="opacity-0 overflow-visible"
  >
    {/* @ts-expect-error -- The 'xmlns' attribute is valid and required for HTML within an SVG foreignObject. */}
    <div xmlns="http://www.w3.org/1999/xhtml" className="text-center">
      <div className="text-brand-accent mb-2 text-4xl inline-block">
        {data.icon}
      </div>
      <h3 className="font-bold text-brand-text-primary text-lg md:text-lg">
        {data.title}
      </h3>
      <p className="text-sm text-brand-text-secondary md:text-sm">
        {data.description}
      </p>
    </div>
  </foreignObject>
);

// --- Main Exported Component ---
const LargeScreenJourney: React.FC<LargeScreenJourneyProps> = ({
  scrollYProgress,
  claimsJourneyData,
}) => {
  // THE FIX: Create a ref for the top-level component to use as the GSAP context scope.
  const componentRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<SVGGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useLayoutEffect(() => {
    if (!pathRef.current || !planeRef.current) {
      return;
    }
    const path = pathRef.current;

    // THE FIX: The context is now scoped to the entire component, `componentRef`.
    // This ensures it correctly manages the plane, the path, AND the milestones.
    const ctx = gsap.context(() => {
      const totalLength = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: totalLength,
        strokeDashoffset: totalLength,
      });

      const tl = gsap.timeline({
        paused: true,
        onUpdate: () => {
          if (scrollYProgress) tl.progress(scrollYProgress.get());
        },
      });

      tl.to(path, { strokeDashoffset: 0, ease: "none" }).to(
        planeRef.current,
        {
          motionPath: {
            path,
            align: path,
            alignOrigin: [0.5, 0.5],
            autoRotate: 90,
          },
          ease: "none",
        },
        0
      );

      // This animation will now work correctly because the milestone elements are inside the context scope.
      claimsJourneyData.forEach((step) => {
        tl.to(
          `#${step.id}`,
          { autoAlpha: 1, y: 0, duration: 0.1 },
          step.progressPoint - 0.08
        ).to(
          `#${step.id}`,
          { autoAlpha: 0, y: -15, duration: 0.1 },
          step.progressPoint + 0.1
        );
      });

      const unsubscribe = scrollYProgress.onChange((latest) =>
        tl.progress(latest)
      );
      return () => unsubscribe();
    }, componentRef); // The scope is now the top-level div.

    return () => ctx.revert();
  }, [scrollYProgress, claimsJourneyData]);

  return (
    // THE FIX: Attach the component ref here.
    <div ref={componentRef} className="absolute top-0 left-0 w-full h-full">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid meet"
        className="overflow-visible relative top-[55vh] md:top-[50vh]"
      >
        <path
          d="M 50,50 C 150,550 650,50 750,550"
          fill="none"
          stroke="#EAECF0"
          strokeWidth="2"
          strokeDasharray="10 10"
        />
        <path
          ref={pathRef}
          d="M 50,50 C 150,550 650,50 750,550"
          fill="none"
          stroke="#C41E24"
          strokeWidth="2.5"
        />
        <g
          ref={planeRef}
          className="text-brand-primary"
          transform="translate(-20, -20)"
        >
          <FiSend size={40} />
        </g>
        {claimsJourneyData.map((step) => (
          <Milestone key={step.id} data={step} />
        ))}
      </svg>
    </div>
  );
};

export default LargeScreenJourney;
