"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        scrolled
          ? "bg-brand-white/80 backdrop-blur-md shadow-lg"
          : "bg-gray-500/20"
      )}
    >
      <nav
        className={clsx(
          "container mx-auto px-6 flex justify-between items-center transition-all duration-300",
          scrolled ? "py-3" : "py-5"
        )}
      >
        <Link href="/" className="flex items-center gap-2 font-bold z-50">
          <Image
            src={"/Neon logo orig.svg"}
            width={40}
            height={40}
            className="aspect-square"
            alt="Neon Insurance Logo"
          />

          {/*
            ========================================================================
              THE FIX: Responsive Text for Company Name
              This section now uses two separate spans to show a shorter name on mobile
              and the full name on medium screens and larger.
            ========================================================================
          */}

          {/* Short version for mobile (visible by default, hidden from `md` breakpoint up) */}
          <span
            className={clsx(
              "transition-colors text-xl md:hidden",
              scrolled || isOpen
                ? "text-brand-text-primary"
                : "text-brand-text-onDark"
            )}
          >
            Neon Insurance
          </span>

          {/* Full version for desktop (hidden by default, visible from `md` breakpoint up) */}
          <span
            className={clsx(
              "transition-colors hidden md:inline md:text-2xl",
              scrolled || isOpen
                ? "text-brand-text-primary"
                : "text-brand-text-onDark"
            )}
          >
            Neon Insurance Brokers Ltd
          </span>
        </Link>

        <DesktopNav scrolled={scrolled} />
        <MobileNav isOpen={isOpen} setIsOpen={setIsOpen} scrolled={scrolled} />
      </nav>
    </header>
  );
};

export default Header;
