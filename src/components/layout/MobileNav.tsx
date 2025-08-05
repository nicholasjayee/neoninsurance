"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import clsx from "clsx";
import Portal from "@/components/common/Portal";
import { navLinks } from "@/data/navigationData";
import type { NavLinkItem } from "@/data/navigationData";

// --- Props ---
interface MobileNavProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  scrolled: boolean;
}

// --- Animation Variants ---
const menuVariants: Variants = {
  open: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
  closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
};
const menuItemVariants: Variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: { y: { stiffness: 1000, velocity: -100 } },
  },
  closed: { y: 50, opacity: 0, transition: { y: { stiffness: 1000 } } },
};

// --- Reusable Nav Item with Accordion Logic ---
const MobileNavItem = ({
  link,
  closeMenu,
}: {
  link: NavLinkItem;
  closeMenu: () => void;
}) => {
  const pathname = usePathname();
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const isActive = pathname === link.href;

  if (!link.dropdownItems) {
    return (
      <motion.li variants={menuItemVariants}>
        <Link
          href={link.href}
          onClick={closeMenu}
          className={clsx(
            "block text-lg font-semibold rounded-md p-3 transition-colors",
            isActive
              ? "bg-brand-primary/10 text-brand-primary"
              : "text-brand-text-secondary hover:bg-gray-100"
          )}
        >
          {link.label}
        </Link>
      </motion.li>
    );
  }

  return (
    <motion.li variants={menuItemVariants} className="overflow-hidden">
      <div className="flex items-center justify-between">
        <Link
          href={link.href}
          onClick={closeMenu}
          className={clsx(
            "flex-grow text-lg font-semibold rounded-md p-3 transition-colors",
            isActive
              ? "bg-brand-primary/10 text-brand-primary"
              : "text-brand-text-secondary hover:bg-gray-100"
          )}
        >
          {link.label}
        </Link>
        <motion.button
          onClick={() => setIsAccordionOpen(!isAccordionOpen)}
          className="p-3 text-brand-text-secondary"
          aria-label="Toggle submenu"
          animate={{ rotate: isAccordionOpen ? 180 : 0 }}
        >
          <FiChevronDown />
        </motion.button>
      </div>
      <AnimatePresence>
        {isAccordionOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="pl-4"
          >
            <ul className="py-2 border-l-2 border-brand-border">
              {link.dropdownItems.map((category) => (
                <li key={category.id} className="mb-2">
                  <h4
                    className="font-bold text-sm text-brand-text-tertiary px-4 py-1"
                    style={{ color: category.color }}
                  >
                    {category.label}
                  </h4>
                  <ul>
                    {category.services.map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={`/display/${service.slug}`}
                          onClick={closeMenu}
                          className="block text-base font-medium text-brand-text-secondary hover:text-brand-primary p-3 pl-4 rounded-md hover:bg-gray-100"
                        >
                          {service.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
};

// --- The Main MobileNav Component ---
const MobileNav: React.FC<MobileNavProps> = ({
  isOpen,
  setIsOpen,
  scrolled,
}) => {
  return (
    <div className="md:hidden">
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
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/50 z-40"
                onClick={() => setIsOpen(false)}
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: "0%" }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 400, damping: 40 }}
                className="fixed top-0 right-0 h-full w-full max-w-sm bg-brand-white z-50 flex flex-col"
              >
                {/* --- 1. FIXED HEADER --- */}
                <div className="flex-shrink-0 flex items-center justify-between p-6 border-b border-brand-border">
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

                {/* --- 2. SCROLLABLE CONTENT AREA --- */}
                {/* `flex-grow` and `overflow-y-auto` are the key properties here. */}
                <div className="flex-grow overflow-y-auto p-6">
                  <motion.ul
                    variants={menuVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    className="flex flex-col space-y-2"
                  >
                    {navLinks.map((link) => (
                      <MobileNavItem
                        key={link.href}
                        link={link}
                        closeMenu={() => setIsOpen(false)}
                      />
                    ))}
                  </motion.ul>
                </div>

                {/* --- 3. FIXED FOOTER / CTA --- */}
                <div className="flex-shrink-0 p-6 border-t border-brand-border">
                  <motion.div
                    // We can reuse the menu item variant for a nice animation on the CTA
                    variants={menuItemVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                  >
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
