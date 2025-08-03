"use client";

import React, { useState, useEffect } from "react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

/**
 * This component is a client-side-only wrapper around the progress bar.
 * It uses the `isMounted` pattern to prevent hydration errors, ensuring
 * that the ProgressBar is only rendered in the browser after the initial page load.
 */
const ClientOnlyProgressBar = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // This effect runs only once on the client, after initial hydration.
    setIsMounted(true);
  }, []);

  // On the server and during initial hydration, this returns null,
  // preventing the hydration mismatch error.
  if (!isMounted) {
    return null;
  }

  // After mounting on the client, it renders the ProgressBar.
  // The ProgressBar will then attach itself to the router events and work correctly.
  return (
    <ProgressBar
      height="4px"
      color="#C41E24" // Your brand-primary red color
      options={{ showSpinner: true }}
      shallowRouting
    />
  );
};

export default ClientOnlyProgressBar;
