"use client"; // This component is interactive and runs on the client.

import React, { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowLeft, FiCheck } from "react-icons/fi";
import type { DetailedContentItem, Service } from "@/data/navigationData";
import ServiceIntroSection from "@/components/pages/services/ServiceIntroSection";

// --- Type Definition for the Renderer ---
interface ContentRendererProps {
  item: DetailedContentItem;
}

// --- Helper Component: Content Renderer ---
const ContentRenderer: React.FC<ContentRendererProps> = ({ item }) => {
  // ... (Your ContentRenderer switch statement is preserved exactly)
  switch (item.type) {
    case "heading":
      const level = item.level || 2;
      const className =
        "text-2xl md:text-3xl font-bold text-brand-text-primary mt-8 mb-4";
      if (level === 2) return <h2 className={className}>{item.text}</h2>;
      if (level === 3) return <h3 className={className}>{item.text}</h3>;
      if (level === 4) return <h4 className={className}>{item.text}</h4>;
      return <h2 className={className}>{item.text}</h2>;
    case "paragraph":
      return (
        <p className="text-lg text-brand-text-secondary leading-relaxed mb-4">
          {item.text}
        </p>
      );
    case "list":
      return (
        <ul className="space-y-3 pl-5 mt-4 mb-6">
          {item.items.map((listItem, index) => (
            <li key={index} className="flex items-start gap-3">
              <FiCheck className="text-brand-primary mt-1 flex-shrink-0" />
              <span className="text-brand-text-secondary">{listItem}</span>
            </li>
          ))}
        </ul>
      );
    case "highlight":
      return (
        <p className="p-4 my-6 bg-brand-secondary-light border-l-4 border-brand-secondary-dark text-brand-secondary-dark font-semibold">
          {item.text}
        </p>
      );
    case "table":
      return (
        <div className="my-6 overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b-2 border-brand-border">
                {item.headers.map((header, index) => (
                  <th
                    key={index}
                    className="p-3 text-sm font-semibold text-brand-text-primary"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {item.rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-b border-brand-border">
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="p-3 text-brand-text-secondary"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return null;
  }
};

// --- Main Exported Component ---
// This now receives the service data as a prop from the server component.
export default function DisplayClientPage({ service }: { service: Service }) {
  // Your scroll-to-top logic is preserved.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [service.slug]);

  const { name: title, content: data = [] } = service;

  return (
    <div className="bg-brand-light min-h-screen">
      <ServiceIntroSection />
      <div className="container mx-auto px-6 py-24 md:py-32">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link
              href="/services"
              className="flex items-center gap-2 font-semibold text-brand-text-secondary hover:text-brand-primary mb-8"
            >
              <FiArrowLeft />
              Back to Services
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <p className="text-brand-accent font-semibold">Our Services</p>
            <h1 className="text-4xl md:text-6xl font-bold text-brand-text-primary mt-2">
              {title}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-12 border-t border-brand-border pt-8"
          >
            {data.map((item, index) => (
              <ContentRenderer key={index} item={item} />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
