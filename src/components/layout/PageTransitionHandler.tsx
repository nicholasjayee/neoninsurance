"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { LoadingOverlay } from "./LoadingOverlay";

export function PageTransitionHandler() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  // Use a ref to track the previous path
  const previousPath = useRef(pathname);

  useEffect(() => {
    // If the path has changed, trigger the loading sequence
    if (previousPath.current !== pathname) {
      setIsLoading(true);

      // Set a timeout to guarantee a minimum display time
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 800); // 800ms minimum display time

      // Update the ref to the new path
      previousPath.current = pathname;

      // Cleanup the timer if the component unmounts
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return <AnimatePresence>{isLoading && <LoadingOverlay />}</AnimatePresence>;
}
