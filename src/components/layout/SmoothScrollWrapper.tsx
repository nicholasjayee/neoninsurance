"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the GSAP plugin once when the module is imported
gsap.registerPlugin(ScrollTrigger);

export function SmoothScrollWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. Call useLenis at the top level of the component.
  // 2. Pass ScrollTrigger.update directly as the callback.
  // This is the core of the synchronization. It tells Lenis to update
  // ScrollTrigger on every single frame that Lenis calculates.
  useLenis(ScrollTrigger.update);

  // This effect runs once on mount to set the best GSAP ticker settings for smooth scroll.
  useLayoutEffect(() => {
    gsap.ticker.lagSmoothing(0);
  }, []);

  const options = {
    lerp: 0.08,
    duration: 1.2,
    smoothTouch: true,
  };

  return (
    <ReactLenis root options={options}>
      {children}
    </ReactLenis>
  );
}
