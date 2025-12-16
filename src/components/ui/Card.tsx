"use client";

import React from "react";
import { Tilt } from "react-tilt";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

const defaultTiltOptions = {
  reverse:        false,  // reverse the tilt direction
  max:            10,     // max tilt rotation (degrees)
  perspective:    1000,   // Transform perspective, the lower the more extreme the tilt gets.
  scale:          1.02,   // 2 = 200%, 1.5 = 150%, etc..
  speed:          1000,   // Speed of the enter/exit transition
  transition:     true,   // Set a transition on enter/exit.
  axis:           null,   // What axis should be disabled. Can be X or Y.
  reset:          true,   // If the tilt effect has to be reset on exit.
  easing:         "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
};

export function Card({ children, className, hoverEffect = true }: CardProps) {
  const Content = (
    <div className={cn(
      "glass-card p-6 relative overflow-hidden group rounded-2xl",
      "bg-white/5 backdrop-blur-xl border border-white/10",
      "transition-all duration-300",
      hoverEffect && "hover:shadow-[0_0_30px_rgba(0,240,255,0.15)] hover:border-neon-blue/30",
      className
    )}>
      {/* Glow effect on hover */}
      {hoverEffect && (
        <div className="absolute -inset-px bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500 -z-10" />
      )}
      {children}
    </div>
  );

  if (hoverEffect) {
    return (
      <Tilt options={defaultTiltOptions} className={cn("h-full", className)}>
        {Content}
      </Tilt>
    );
  }

  return Content;
}
