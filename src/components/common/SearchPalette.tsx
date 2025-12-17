"use client";

import React, { useState, useEffect, useRef, useTransition } from "react";
import Link from "next/link";
import {
  FiSearch,
  FiX,
  FiArrowRight,
  FiFileText,
  FiHelpCircle,
  FiLayout,
  FiTool,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import Portal from "@/components/common/Portal";
import { globalSearch } from "@/app/(app)/actions/search";
import { type SearchResult } from "@/lib/search";

interface SearchPaletteProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const SearchPalette: React.FC<SearchPaletteProps> = ({ isOpen, setIsOpen }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);
  // const debounceTimeout = useRef<NodeJS.Timeout>(null);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout>();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [setIsOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    if (value.length < 2) {
      setResults([]);
      return;
    }

    setDebounceTimeout(
      setTimeout(() => {
        startTransition(async () => {
          const { results } = await globalSearch(value);
          setResults(results);
        });
      }, 300)
    );
    // debounceTimeout.current = ;
  };

  const getIcon = (type: SearchResult["type"]) => {
    switch (type) {
      case "Article":
        return <FiFileText className="text-brand-accent" />;
      case "FAQ":
        return <FiHelpCircle className="text-brand-secondary" />;
      case "Tool":
        return <FiTool className="text-brand-primary" />;
      default:
        return <FiLayout className="text-brand-text-tertiary" />;
    }
  };

  return (
    <Portal>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-brand-dark/60 backdrop-blur-sm z-[60]"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: "-40%" }}
              animate={{ opacity: 1, scale: 1, y: "-50%" }}
              exit={{ opacity: 0, scale: 0.95, y: "-40%" }}
              className="fixed top-[40%] left-1/2 transform -translate-x-1/2 w-full max-w-2xl bg-brand-light/95 backdrop-blur-md border border-brand-primary/20 rounded-2xl shadow-2xl shadow-brand-dark/20 z-[70] overflow-hidden"
            >
              <div className="flex items-center border-b border-brand-primary/10 p-4">
                <FiSearch className="text-brand-primary w-6 h-6 mr-3" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search for pages, articles, help..."
                  className="flex-1 text-lg outline-none bg-transparent text-brand-text-primary placeholder:text-brand-text-secondary/50 font-medium"
                  value={query}
                  onChange={handleSearch}
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-brand-primary/10 rounded-full transition-colors"
                >
                  <FiX className="text-brand-text-secondary w-5 h-5" />
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-2 custom-scrollbar">
                {query === "" ? (
                  <div className="p-8 text-center text-brand-text-secondary">
                    <p className="mb-2">Type to search...</p>
                    <div className="mt-4 flex justify-center gap-2 text-xs">
                      <span className="px-3 py-1 bg-brand-primary/5 text-brand-primary rounded-full border border-brand-primary/10">
                        Claims
                      </span>
                      <span className="px-3 py-1 bg-brand-secondary/5 text-brand-secondary rounded-full border border-brand-secondary/10">
                        Travel
                      </span>
                      <span className="px-3 py-1 bg-brand-accent/5 text-brand-accent rounded-full border border-brand-accent/10">
                        Help
                      </span>
                    </div>
                  </div>
                ) : isPending ? (
                  <div className="p-8 text-center text-brand-text-secondary flex flex-col items-center">
                    <div className="w-6 h-6 border-2 border-brand-primary border-t-transparent rounded-full animate-spin mb-2"></div>
                    Searching...
                  </div>
                ) : results.length > 0 ? (
                  <ul className="space-y-1">
                    {results.map((result) => (
                      <li key={`${result.type}-${result.id}`}>
                        <Link
                          href={result.url}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center justify-between p-3 rounded-xl hover:bg-brand-primary/5 group transition-all duration-200 border border-transparent hover:border-brand-primary/10"
                        >
                          <div className="flex items-center gap-4 overflow-hidden">
                            <div className="p-3 bg-white rounded-lg shrink-0 shadow-sm border border-brand-primary/5 group-hover:border-brand-primary/20 transition-colors">
                              {getIcon(result.type)}
                            </div>
                            <div className="min-w-0">
                              <h4 className="font-bold text-brand-text-primary group-hover:text-brand-primary transition-colors truncate">
                                {result.title}
                              </h4>
                              <p className="text-xs text-brand-text-secondary truncate flex items-center mt-0.5">
                                <span className="font-bold uppercase tracking-wider text-[10px] mr-2 border border-brand-primary/20 px-1.5 py-0.5 rounded bg-brand-primary/5 text-brand-primary">
                                  {result.type}
                                </span>
                                {result.description}
                              </p>
                            </div>
                          </div>
                          <FiArrowRight className="text-brand-text-tertiary group-hover:text-brand-primary transition-colors shrink-0 ml-2 transform group-hover:translate-x-1 duration-200" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-8 text-center text-brand-text-secondary">
                    No results found for &quot;{query}&quot;
                  </div>
                )}
              </div>

              <div className="bg-brand-primary/5 p-3 text-xs text-brand-text-tertiary text-right border-t border-brand-primary/10 flex justify-end items-center gap-2">
                <span>Press</span>
                <kbd className="font-mono px-2 py-1 bg-white border border-brand-primary/20 rounded-md shadow-sm text-brand-primary font-bold text-[10px]">
                  Esc
                </kbd>
                <span>to close</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Portal>
  );
};

export default SearchPalette;
