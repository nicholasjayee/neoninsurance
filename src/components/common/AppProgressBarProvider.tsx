"use client";

import React from "react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

// This is a simple wrapper component around the library's progress bar.
// We are removing the `isMounted` logic to allow the library to initialize correctly.
const AppProgressBarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color="#C41E24" // Your brand-primary red color
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};

export default AppProgressBarProvider;
