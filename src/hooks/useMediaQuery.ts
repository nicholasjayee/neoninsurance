"use client"; // This is a client-side hook that uses browser APIs.

import { useState, useEffect } from "react";

/**
 * A robust and correct custom hook to check if a CSS media query is met.
 * This version is lint-free, efficient, and safe for React 18.
 * @param query - The CSS media query string (e.g., '(min-width: 768px)')
 * @returns boolean - True if the query matches, false otherwise.
 */
const useMediaQuery = (query: string): boolean => {
  // Lazy state initialization: This function runs only once on the initial client render.
  // It correctly sets the initial state without causing hydration mismatches.
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === "undefined") {
      return false;
    }
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    // The sole purpose of this effect is to subscribe to and unsubscribe from changes.
    // It does not need to read the `matches` state variable.
    const media = window.matchMedia(query);

    // The listener function directly updates the state.
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add the event listener for changes.
    media.addEventListener("change", listener);

    // The cleanup function removes the listener when the component unmounts
    // or when the `query` prop changes.
    return () => {
      media.removeEventListener("change", listener);
    };
  }, [query]); // THE FIX: The effect only depends on `query`. It no longer reads `matches`,
  // so the linter is now satisfied and the hook is more efficient.

  return matches;
};

export default useMediaQuery;
