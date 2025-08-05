"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import clsx from "clsx";
import Portal from "@/components/common/Portal";
import { navLinks } from "@/data/navigationData";

interface MobileNavProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  scrolled: boolean;
}

// --- Animation Variants for a Professional Stagger Effect ---

// Parent container for the menu items, controls the stagger
const menuVariants: Variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

// Individual menu item animation
const menuItemVariants: Variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const MobileNav: React.FC<MobileNavProps> = ({
  isOpen,
  setIsOpen,
  scrolled,
}) => {
  const pathname = usePathname();

  return (
    <div className="md:hidden">
      {/* Hamburger Icon to OPEN the menu */}
      <button
        onClick={() => setIsOpen(true)}
        className={clsx(
          "transition-colors relative z-50",
          scrolled ? "text-brand-text-primary" : "text-brand-text-onDark"
        )}
        aria-label="Open menu"
      >
        <FiMenu size={28} />
      </button>

      <Portal>
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Dark Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/50 z-40"
                onClick={() => setIsOpen(false)}
              />

              {/* Menu Content Panel */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: "0%" }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 400, damping: 40 }}
                className="fixed top-0 right-0 h-full w-full max-w-sm bg-brand-white z-50 flex flex-col"
              >
                {/* --- Menu Header with Close Button --- */}
                <div className="flex items-center justify-between p-6 border-b border-brand-border">
                  <Link
                    href="/"
                    onClick={() => setIsOpen(false)}
                    className="text-xl font-bold text-brand-text-primary"
                  >
                    Neon Insurance
                  </Link>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-brand-text-secondary"
                    aria-label="Close menu"
                  >
                    <FiX size={24} />
                  </button>
                </div>

                {/* --- Main Navigation Area --- */}
                {/* This wrapper allows the CTA to be pushed to the bottom */}
                <div className="flex flex-col flex-grow p-6 ">
                  <motion.ul
                    variants={menuVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    className="flex flex-col space-y-2"
                  >
                    {navLinks.map((link) => (
                      <motion.li key={link.href} variants={menuItemVariants}>
                        <Link
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className={clsx(
                            "block text-lg font-semibold rounded-md p-3 transition-colors",
                            pathname === link.href
                              ? "bg-brand-primary/10 text-brand-primary"
                              : "text-brand-text-secondary hover:bg-gray-100 hover:text-brand-text-primary"
                          )}
                        >
                          {link.label}
                        </Link>
                      </motion.li>
                    ))}
                  </motion.ul>

                  {/* --- Separator and CTA --- */}
                  <motion.div
                    variants={menuItemVariants}
                    // mt-auto pushes this block to the bottom of the flex container
                    className="mt-auto"
                  >
                    <hr className="my-6 border-1 border-brand-border" />
                    <Link
                      href="/contact"
                      onClick={() => setIsOpen(false)}
                      className="block w-full text-center bg-brand-primary text-white font-bold py-4 px-8 rounded-full text-lg hover:bg-brand-primary-light transition-colors"
                    >
                      Contact Us
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </Portal>
    </div>
  );
};

export default MobileNav;
