"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import SearchPalette from "@/components/common/SearchPalette";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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
        "fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out",
        scrolled
          ? "glass py-2 shadow-lg"
          : "bg-white/80 backdrop-blur-md py-6 shadow-sm"
      )}
    >
      <SearchPalette isOpen={isSearchOpen} setIsOpen={setIsSearchOpen} />
      <nav className="container mx-auto px-6 flex justify-between items-center">
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
          <span className="transition-colors text-xl md:hidden text-brand-text-primary">
            Neon Insurance
          </span>

          {/* Full version for desktop (hidden by default, visible from `md` breakpoint up) */}
          <span className="transition-colors hidden md:inline md:text-xl text-brand-text-primary">
            Neon Insurance Brokers Ltd
          </span>
        </Link>

        <DesktopNav
          scrolled={scrolled}
          openSearch={() => setIsSearchOpen(true)}
        />
        <MobileNav
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          scrolled={scrolled}
          openSearch={() => setIsSearchOpen(true)}
        />
      </nav>
    </header>
  );
};

export default Header;
