"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import clsx from "clsx";
import { FiSearch } from "react-icons/fi";
import { navLinks } from "@/data/navigationData";
import MegaMenuNavItem from "@/components/common/MegaMenuNavItem";
import { Button } from "@/components/ui/Button";
interface DesktopNavProps {
  scrolled: boolean;
  openSearch: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DesktopNav: React.FC<DesktopNavProps> = ({ scrolled, openSearch }) => {
  const pathname = usePathname();

  return (
    <>
      <div className="hidden md:flex items-center space-x-8">
        {navLinks.map((link) =>
          link.dropdownItems ? (
            <MegaMenuNavItem key={link.label} link={link} />
          ) : (
            <Link key={link.label} href={link.href}>
              <div className="relative group">
                <span
                  className={clsx(
                    "transition-colors font-medium text-lg",
                    pathname === link.href
                      ? "text-brand-primary"
                      : "text-brand-text-secondary hover:text-brand-text-primary"
                  )}
                >
                  {link.label}
                </span>
                {pathname === link.href && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-primary"
                    layoutId="underline"
                    initial={false}
                  />
                )}
              </div>
            </Link>
          )
        )}

        <button
          onClick={openSearch}
          className="transition-colors p-2 rounded-full hover:bg-black/5 text-brand-text-secondary hover:text-brand-text-primary"
          aria-label="Search"
        >
          <FiSearch size={20} />
        </button>
        <Link href="/contact">
          <Button variant="primary" size="md" className="shadow-neon-blue/20">
            Contact Us
          </Button>
        </Link>
      </div>
    </>
  );
};

export default DesktopNav;
