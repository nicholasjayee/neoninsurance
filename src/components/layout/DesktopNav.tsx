"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import clsx from "clsx";
import { navLinks } from "@/data/navigationData";
import DropdownNavItem from "@/components/common/DropdownNavItem";

interface DesktopNavProps {
  scrolled: boolean;
}

const DesktopNav: React.FC<DesktopNavProps> = ({ scrolled }) => {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex items-center space-x-8">
      {navLinks.map((link) =>
        link.dropdownItems ? (
          <DropdownNavItem key={link.label} link={link} scrolled={scrolled} />
        ) : (
          <Link key={link.label} href={link.href}>
            <div className="relative group">
              <span
                className={clsx(
                  "transition-colors font-medium",
                  pathname === link.href
                    ? "text-brand-primary"
                    : scrolled
                    ? "text-brand-text-secondary hover:text-brand-text-primary"
                    : "text-brand-text-onDark hover:opacity-80"
                )}
              >
                {link.label}
              </span>
              {pathname === link.href && (
                <motion.div
                  className="absolute bottom-[-4px] left-0 right-0 h-0.5 bg-brand-primary"
                  layoutId="underline"
                  initial={false}
                />
              )}
            </div>
          </Link>
        )
      )}
      <Link
        href="/contact"
        className="bg-brand-primary px-6 py-2 rounded-full text-white font-semibold hover:bg-brand-primary-light transition-colors"
      >
        Contact Us
      </Link>
    </div>
  );
};

export default DesktopNav;
