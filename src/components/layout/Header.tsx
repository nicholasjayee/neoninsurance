"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";
// THE FIX: Import the 'Variants' type from Framer Motion
import { motion, AnimatePresence, type Variants } from "framer-motion";
import clsx from "clsx";
import Portal from "@/components/common/Portal";
import { navLinks } from "@/data/navigationData";
import DropdownNavItem from "@/components/common/DropdownNavItem";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

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

  // THE FIX: Add the 'Variants' type annotation here.
  const mobileMenuVariants: Variants = {
    hidden: {
      x: "100%",
      transition: { type: "tween", duration: 0.3, ease: "easeOut" },
    },
    visible: {
      x: "0%",
      transition: { type: "tween", duration: 0.3, ease: "easeIn" },
    },
  };

  // It's good practice to also type this one for consistency.
  const mobileLinkVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 w-full z-40 transition-all duration-300 ",
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
        <Link href="/" className="flex items-center gap-2 font-bold">
          <Image
            src={"/Neon logo orig.svg"}
            width={40}
            height={40}
            className="aspect-square"
            alt="Neon Insurance Logo"
          />
          <span
            className={clsx(
              "transition-colors text-xl md:text-2xl",
              scrolled ? "text-brand-text-primary" : "text-brand-text-onDark"
            )}
          >
            Neon Insurance Brokers Ltd
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) =>
            link.dropdownItems ? (
              <DropdownNavItem
                key={link.label}
                link={link}
                scrolled={scrolled}
              />
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

        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={clsx(
              "transition-colors relative z-50",
              scrolled || isOpen
                ? "text-brand-text-primary"
                : "text-brand-text-onDark"
            )}
          >
            {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>
      </nav>

      <Portal>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="md:hidden fixed z-50 inset-0 bg-brand-white flex flex-col items-center justify-center space-y-8"
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  variants={mobileLinkVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={clsx(
                      "text-3xl font-semibold transition-colors",
                      pathname === link.href
                        ? "text-brand-primary"
                        : "text-brand-text-primary hover:text-brand-primary"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                variants={mobileLinkVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 + navLinks.length * 0.1 }}
              >
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="bg-brand-primary px-8 py-3 rounded-full text-white text-xl font-semibold hover:bg-brand-primary-light transition-colors"
                >
                  Contact Us
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Portal>
    </header>
  );
};

export default Header;
