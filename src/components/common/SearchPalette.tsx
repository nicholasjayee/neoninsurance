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
        return <FiFileText className="text-blue-500" />;
      case "FAQ":
        return <FiHelpCircle className="text-green-500" />;
      case "Tool":
        return <FiTool className="text-purple-500" />;
      default:
        return <FiLayout className="text-muted-foreground" />;
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
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-60"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-[20%] left-1/2 transform -translate-x-1/2 w-full max-w-2xl bg-card border border-border rounded-xl shadow-2xl z-70 overflow-hidden"
            >
              <div className="flex items-center border-b border-border p-4">
                <FiSearch className="text-muted-foreground w-6 h-6 mr-3" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search for pages, articles, help..."
                  className="flex-1 text-lg outline-none bg-transparent text-foreground placeholder-muted-foreground"
                  value={query}
                  onChange={handleSearch}
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-secondary rounded-full transition-colors"
                >
                  <FiX className="text-muted-foreground w-5 h-5" />
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-2">
                {query === "" ? (
                  <div className="p-8 text-center text-muted-foreground">
                    <p>Type to search...</p>
                    <div className="mt-4 flex justify-center gap-2 text-xs">
                      <span className="px-2 py-1 bg-secondary rounded border border-border">
                        Claims
                      </span>
                      <span className="px-2 py-1 bg-secondary rounded border border-border">
                        Travel
                      </span>
                      <span className="px-2 py-1 bg-secondary rounded border border-border">
                        Help
                      </span>
                    </div>
                  </div>
                ) : isPending ? (
                  <div className="p-8 text-center text-muted-foreground">
                    Searching...
                  </div>
                ) : results.length > 0 ? (
                  <ul className="space-y-1">
                    {results.map((result) => (
                      <li key={`${result.type}-${result.id}`}>
                        <Link
                          href={result.url}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center justify-between p-3 rounded-xl hover:bg-secondary group transition-colors"
                        >
                          <div className="flex items-center gap-3 overflow-hidden">
                            <div className="p-2 bg-secondary/50 rounded-lg shrink-0">
                              {getIcon(result.type)}
                            </div>
                            <div className="min-w-0">
                              <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                                {result.title}
                              </h4>
                              <p className="text-xs text-muted-foreground truncate">
                                <span className="font-medium uppercase tracking-wider text-[10px] mr-2 border border-border px-1 rounded">
                                  {result.type}
                                </span>
                                {result.description}
                              </p>
                            </div>
                          </div>
                          <FiArrowRight className="text-muted-foreground group-hover:text-primary transition-colors shrink-0 ml-2" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-8 text-center text-muted-foreground">
                    No results found for &quot;{query}&quot;
                  </div>
                )}
              </div>

              <div className="bg-secondary/50 p-3 text-xs text-muted-foreground text-right border-t border-border">
                Press{" "}
                <kbd className="font-sans px-1 py-0.5 bg-card border border-border rounded">
                  Esc
                </kbd>{" "}
                to close
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Portal>
  );
};

export default SearchPalette;
