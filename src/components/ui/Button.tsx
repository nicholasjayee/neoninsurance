"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils"; // Assuming utils exists, if not I'll create it or use clsx directly

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "ghost" | "neon";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    
    const baseStyles = "relative inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none overflow-hidden";
    
    const variants = {
      primary: "bg-gradient-to-r from-brand-primary to-brand-primary-dark text-white shadow-[0_0_15px_rgba(163,22,27,0.3)] hover:shadow-[0_0_25px_rgba(163,22,27,0.5)] border border-transparent",
      secondary: "bg-white/10 backdrop-blur-md border border-white/20 text-brand-text-primary hover:bg-white/20 hover:border-white/40",
      ghost: "bg-transparent text-brand-text-primary hover:bg-white/5",
      neon: "bg-transparent border border-brand-accent text-brand-accent shadow-[0_0_10px_rgba(245,158,11,0.3)] hover:shadow-[0_0_20px_rgba(245,158,11,0.6)] hover:bg-brand-accent/10"
    };

    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-11 px-6 text-base",
      lg: "h-14 px-8 text-lg",
    };

    return (
      <motion.button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">{children}</span>
        {variant === 'primary' && (
             <div className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export { Button };
