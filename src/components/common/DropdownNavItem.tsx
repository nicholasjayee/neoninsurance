"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiChevronDown } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import type { NavLinkItem as NavItemType } from "@/data/navigationData";

// --- Custom Hook with the Fix ---
const useOutsideAlerter = (
  // THE FIX: The ref type is now correctly defined to accept a ref that can be null.
  ref: React.RefObject<HTMLElement | null>,
  callback: () => void
) => {
  useEffect(() => {
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

// --- Type Definition for Component Props ---
interface DropdownNavItemProps {
  link: NavItemType;
  scrolled: boolean;
}

// --- Main Exported Component ---
const DropdownNavItem: React.FC<DropdownNavItemProps> = ({
  link,
  scrolled,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // This ref is now compatible with the updated hook
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useOutsideAlerter(dropdownRef, () => setIsDropdownOpen(false));

  const isActive = pathname === link.href;

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex items-center">
        <Link href={link.href}>
          <div className="relative group">
            <span
              className={clsx(
                "transition-colors font-medium pr-1",
                isActive
                  ? "text-brand-primary"
                  : scrolled
                  ? "text-brand-text-secondary hover:text-brand-text-primary"
                  : "text-brand-text-onDark hover:opacity-80"
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

        <motion.button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={clsx(
            "transition-colors p-1",
            scrolled
              ? "text-brand-text-secondary hover:text-brand-text-primary"
              : "text-brand-text-onDark hover:opacity-80"
          )}
          animate={{ rotate: isDropdownOpen ? 180 : 0 }}
          aria-expanded={isDropdownOpen}
          aria-label="Toggle services menu"
        >
          <FiChevronDown size={16} />
        </motion.button>
      </div>

      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute top-full right-0 mt-2 w-72 bg-brand-white rounded-md shadow-lg border border-brand-border p-2 z-50" // Added z-50 to ensure it's on top
          >
            {link.dropdownItems?.map((category, index) => (
              <div key={category.id}>
                {index > 0 && <hr className="my-2 border-brand-border" />}
                <div className="px-2 pt-2 pb-1">
                  <h3
                    className="font-bold text-sm"
                    style={{ color: category.color }}
                  >
                    {category.label}
                  </h3>
                </div>
                <ul>
                  {category.services.map((service) => (
                    <li key={service.slug}>
                      {service.content && service.slug ? (
                        <Link
                          href={`/display/${service.slug}`}
                          onClick={() => setIsDropdownOpen(false)}
                          className="block p-2 rounded-md hover:bg-brand-light text-brand-text-secondary hover:text-brand-text-primary transition-colors font-medium text-sm"
                        >
                          {service.name}
                        </Link>
                      ) : (
                        <span className="block p-2 text-brand-text-tertiary cursor-not-allowed font-medium text-sm">
                          {service.name}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropdownNavItem;
