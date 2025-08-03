"use client";

import React, { useState, useEffect } from "react";
import clsx from "clsx";

// --- Type Definition for Component Props ---
interface OptimizedBgImageProps {
  srcUrl: string;
  className?: string;
}

// --- Main Exported Component ---
export default function OptimizedBgImage({
  srcUrl,
  className,
}: OptimizedBgImageProps) {
  // HOOK 1: Call useState unconditionally at the top.
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // HOOK 2: Call useEffect unconditionally at the top.
  useEffect(() => {
    // It is safe to have conditional logic *inside* the hook.
    // If there's no URL, the effect simply does nothing.
    if (!srcUrl) {
      return;
    }

    const fullImageUrl = srcUrl.replace(
      "/upload/",
      "/upload/q_auto:good,f_auto/"
    );

    const img = new window.Image();
    img.src = fullImageUrl;
    img.onload = () => {
      setIsLoaded(true);
    };
  }, [srcUrl]); // The effect now correctly depends only on the prop that can change.

  // THE FIX: The conditional return (early exit) is now moved to *after* all hook calls.
  // This ensures that the hooks are always called in the same order on every render.
  if (!srcUrl) {
    return null;
  }

  // The rest of your component's logic runs only when it's safe to do so.
  const placeholderUrl = srcUrl.replace(
    "/upload/",
    "/upload/q_auto:low,w_100,e_blur:2000/"
  );
  const fullImageUrl = srcUrl.replace(
    "/upload/",
    "/upload/q_auto:good,f_auto/"
  );

  return (
    <div
      className={clsx(
        "absolute inset-0 transition-all duration-1000",
        className
      )}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${placeholderUrl})` }}
      />
      <div
        className={clsx(
          "absolute inset-0 bg-cover bg-center transition-opacity duration-1000",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
        style={{ backgroundImage: `url(${fullImageUrl})` }}
      />
    </div>
  );
}
