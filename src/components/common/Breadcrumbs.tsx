"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiChevronRight, FiHome } from "react-icons/fi";
import { cn } from "@/lib/utils";

export default function Breadcrumbs({ className }: { className?: string }) {
  const pathname = usePathname();
  const paths = pathname.split("/").filter((path) => path);

  if (paths.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center text-sm text-brand-text-secondary", className)}>
      <ol className="flex items-center space-x-2">
        <li>
          <Link href="/" className="hover:text-brand-primary transition-colors flex items-center">
            <FiHome className="w-4 h-4" />
          </Link>
        </li>
        {paths.map((path, index) => {
          const href = `/${paths.slice(0, index + 1).join("/")}`;
          const isLast = index === paths.length - 1;
          const label = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, " ");

          return (
            <li key={path} className="flex items-center space-x-2">
              <FiChevronRight className="w-4 h-4 text-brand-text-tertiary" />
              {isLast ? (
                <span className="text-brand-primary font-medium" aria-current="page">
                  {label}
                </span>
              ) : (
                <Link href={href} className="hover:text-brand-primary transition-colors">
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
