"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiChevronDown } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import type { NavLinkItem as NavItemType } from "@/data/navigationData";

// --- Custom Hook for Click Outside ---
const useOutsideAlerter = (
  ref: React.RefObject<HTMLElement | null>,
  callback: () => void
) => {
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
};

interface MegaMenuNavItemProps {
  link: NavItemType;
}

const MegaMenuNavItem: React.FC<MegaMenuNavItemProps> = ({
  link,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useOutsideAlerter(containerRef, () => setIsOpen(false));

  const isActive = pathname === link.href;

  return (
    <div className="relative" ref={containerRef}>
      <div className="flex items-center">
        {link.href ? (
          <>
            <Link href={link.href}>
              <div className="relative group cursor-pointer">
                <span
                  className={clsx(
                    "transition-colors font-medium pr-1 text-lg",
                    isActive
                      ? "text-brand-primary"
                      : "text-brand-text-secondary hover:text-brand-text-primary"
                  )}
                >
                  {link.label}
                </span>
                {isActive && (
                  <motion.div
                    className="absolute bottom-[-4px] left-0 right-0 h-0.5 bg-brand-primary"
                    layoutId="underline"
                    initial={false}
                  />
                )}
              </div>
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="transition-colors p-1 text-brand-text-secondary hover:text-brand-text-primary"
              aria-expanded={isOpen}
              aria-label={`Toggle ${link.label} menu`}
            >
              <FiChevronDown size={18} className={clsx("transition-transform duration-300", isOpen && "rotate-180")} />
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center relative group cursor-pointer"
            aria-expanded={isOpen}
            aria-label={`Toggle ${link.label} menu`}
          >
            <span
              className="transition-colors font-medium pr-1 text-lg text-brand-text-secondary hover:text-brand-text-primary"
            >
              {link.label}
            </span>
            <FiChevronDown size={18} className={clsx("transition-transform duration-300 ml-1", isOpen && "rotate-180")} />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[90vw] max-w-5xl bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 z-50 overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
              {/* Continue to main page link - only show if href exists */}
              {link.href && (
                <div className="col-span-1 md:col-span-3 -mt-2 mb-2">
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-primary to-brand-primary-light text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-brand-primary/30 transition-all group"
                  >
                    <span>Continue to {link.label}</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              )}
              
              {link.dropdownItems?.map((category) => (
                <div key={category.id} className="space-y-4">
                  <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                    <div 
                      className="p-2 rounded-lg bg-gray-50 text-xl"
                      style={{ color: category.color }}
                    >
                      {category.icon}
                    </div>
                    <h3 className="font-bold text-lg text-gray-900">
                      {category.label}
                    </h3>
                  </div>
                  
                  <ul className="space-y-2">
                    {category.services.map((service) => {
                      const href = category.useDisplayRoute 
                        ? `/display/${service.slug}` 
                        : `/${service.slug}`;
                      
                      return (
                        <li key={service.slug}>
                          <Link
                            href={href}
                            onClick={() => setIsOpen(false)}
                            className="group flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <span className="text-gray-600 font-medium group-hover:text-brand-primary transition-colors">
                              {service.name}
                            </span>
                            <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-brand-primary">
                              →
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
              
              {/* Featured / Callout Section */}
              <div className="col-span-1 md:col-span-3 mt-4 pt-6 border-t border-gray-100 flex justify-between items-center bg-gray-50/50 -mx-8 -mb-8 p-8">
                <div>
                  <h4 className="font-bold text-brand-text-primary mb-1">Need Expert Advice?</h4>
                  <p className="text-sm text-gray-500">Our brokers are ready to help you find the perfect coverage.</p>
                </div>
                <Link 
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2 bg-brand-primary text-white rounded-full font-semibold hover:bg-brand-primary-light transition-colors shadow-lg shadow-brand-primary/20"
                >
                  Get a Quote
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MegaMenuNavItem;
