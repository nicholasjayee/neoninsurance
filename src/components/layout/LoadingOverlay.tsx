"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export function LoadingOverlay() {
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      if (!svgRef.current) return;

      // This properties object is already correct.
      const properties = {
        c1: { x: 25, r: 6, color: "#F97316" }, // Accent Orange
        c2: { x: 60, r: 12, color: "#C41E24" }, // Primary Red
        c3: { x: 95, r: 6, color: "#FBCB0A" }, // Secondary Yellow
      };

      // The animation timeline is preserved as it correctly uses the properties object.
      const tl = gsap.timeline({
        repeat: -1,
        defaults: { duration: 0.8, ease: "power2.inOut" },
      });

      tl.to("#c1", { attr: { cx: properties.c2.x } }, "start")
        .to("#c2", { attr: { cx: properties.c3.x } }, "start")
        .to("#c3", { attr: { cx: properties.c1.x } }, "start")
        .to("#c1", { fill: properties.c2.color }, "start+=0.4")
        .to("#c2", { fill: properties.c3.color }, "start+=0.4")
        .to("#c3", { fill: properties.c1.color }, "start+=0.4")
        .to("#c1", { attr: { r: properties.c2.r } }, "start+=0.2")
        .to("#c2", { attr: { r: properties.c3.r } }, "start+=0.2")
        .to("#c3", { attr: { r: properties.c1.r } }, "start+=0.2");
    },
    { scope: svgRef }
  );

  return (
    // THE FIX: The background is updated to use the on-brand light theme.
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-brand-light/80 backdrop-blur-sm">
      <svg ref={svgRef} viewBox="0 0 120 40" width="120" height="40">
        {/* THE FIX: The initial fill colors now match your brand colors. */}
        <circle id="c1" cx="25" cy="20" r="6" fill="#F97316" />
        <circle id="c2" cx="60" cy="20" r="12" fill="#C41E24" />
        <circle id="c3" cx="95" cy="20" r="6" fill="#FBCB0A" />
      </svg>
    </div>
  );
}
