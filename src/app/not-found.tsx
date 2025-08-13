// src/app/(app)/not-found.tsx

"use client"; // Required for hooks and animations

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { AlertTriangle, Home, Search } from "lucide-react";
import { useState, useEffect } from "react"; // --- 1. IMPORT useState and useEffect ---

// A simple, reusable Button component for consistency
const Button = ({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline";
}) => {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-center transition-all duration-300";
  const variants = {
    primary: "bg-brand-primary text-brand-white hover:bg-brand-primary-dark",
    outline:
      "border-2 border-brand-border text-brand-text-tertiary hover:border-brand-primary hover:text-brand-primary",
  };
  return (
    <Link href={href} className={`${baseClasses} ${variants[variant]}`}>
      {children}
    </Link>
  );
};

// --- 2. ADD A HELPER FUNCTION TO TRUNCATE TEXT ---
const truncateUrl = (url: string, maxLength: number = 60) => {
  if (url.length <= maxLength) return url;
  return url.slice(0, maxLength - 3) + "...";
};

export default function NotFound() {
  const pathname = usePathname();
  // --- 3. MANAGE THE FULL URL IN STATE ---
  // We do this to safely access window.location only on the client side
  const [fullUrl, setFullUrl] = useState("");

  useEffect(() => {
    // This code only runs in the browser, preventing SSR errors
    if (typeof window !== "undefined") {
      setFullUrl(window.location.href);
    }
  }, [pathname]); // Re-run if the path changes for some reason

  return (
    <div
      suppressHydrationWarning
      className="relative flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] text-center px-4 py-16 bg-brand-dark text-brand-text-onDark overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-radial-gradient from-brand-primary/10 to-transparent rounded-full" />

      <motion.div
        className="relative z-10 max-w-lg w-full"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.7, 0.9, 0.7],
          }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        >
          <AlertTriangle className="mx-auto h-20 w-20 text-brand-primary mb-6" />
        </motion.div>

        <h1 className="text-7xl md:text-8xl font-bold font-sans text-brand-text-onDark">
          404
        </h1>
        <h2 className="mt-2 text-2xl md:text-3xl font-semibold text-brand-text-onDark/90">
          Page Not Found
        </h2>
        <p className="mt-3 text-base md:text-lg text-brand-text-onDark/70 max-w-md mx-auto">
          Oops! The page you&apos;re looking for doesn&apos;t exist. Contact
          Neon Insurance Brockers
        </p>

        {/* --- 4. DISPLAY THE FAILED URL --- */}
        {fullUrl && (
          <div className="mt-4">
            <p className="text-sm text-brand-text-onDark/60">
              The requested path:
            </p>
            <div className="mt-2 inline-block bg-brand-dark/50 rounded-md px-4 py-2 text-sm font-mono text-brand-accent-light/80 border border-white/10">
              {/* Use the truncate helper here */}
              <code>{truncateUrl(fullUrl)}</code>
            </div>
          </div>
        )}

        <div className="mt-8 space-y-6">
          <form
            action="/search"
            method="get"
            className="relative max-w-sm mx-auto"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-text-tertiary" />
            <input
              type="search"
              name="q"
              placeholder="Try searching for what you need..."
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-brand-light border-2 border-brand-border text-brand-text-primary focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all"
            />
          </form>

          <div className="flex justify-center flex-wrap gap-4">
            <Button href="/">
              <Home size={18} />
              Go Back Home
            </Button>
            <Button href="/contact" variant="outline">
              Contact Support
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
