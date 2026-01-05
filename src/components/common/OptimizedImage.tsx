import React from "react";
import Image from "next/image";

// --- Type Definition for Component Props ---
interface OptimizedImageProps {
  srcUrl: string; // The base Cloudinary URL
  alt: string;
  className?: string; // Optional className for the container
}

/**
 * An optimized image component for Cloudinary that uses the Next.js Image
 * component to create a "blur-up" placeholder effect.
 */
import { getDirectImageUrl, isCloudinaryUrl } from "@/lib/imageUtils";

/**
 * An optimized image component that handles both Cloudinary and external images (like Google Drive).
 */
export default function OptimizedImage({
  srcUrl,
  alt,
  className = "",
}: OptimizedImageProps) {
  // Return null if no source URL is provided to prevent errors
  if (!srcUrl) {
    return null;
  }

  const processedUrl = getDirectImageUrl(srcUrl);
  const isCloudinary = isCloudinaryUrl(processedUrl);

  // --- Cloudinary Logic ---
  let fullImageUrl = processedUrl;
  let placeholderUrl: string | undefined = undefined;

  if (isCloudinary) {
    // 1. Create a tiny, blurred placeholder URL for the blurDataURL prop.
    placeholderUrl = processedUrl.replace(
      "/upload/",
      "/upload/q_auto:low,w_20,e_blur:500/"
    );

    // 2. Create the full-quality, auto-formatted URL for the main image.
    fullImageUrl = processedUrl.replace(
      "/upload/",
      "/upload/q_auto:good,f_auto/"
    );
  }

  return (
    // The container is still relative to allow the Image component to fill it.
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      <Image
        src={fullImageUrl}
        alt={alt}
        // --- Next.js Optimization Props ---
        placeholder={isCloudinary ? "blur" : "empty"} // Only blur if we have a placeholder
        blurDataURL={placeholderUrl} // This provides the image for the blur.
        fill // This makes the image fill its parent container.
        style={{ objectFit: "cover" }} // Equivalent to object-cover.
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Helps Next.js select the right image size.
        unoptimized={!isCloudinary || fullImageUrl.includes("google.com")} // Explicitly unoptimize for Google Drive to avoid server-side fetch errors
        // Note: For Google Drive images, unoptimized={true} is often safer to avoid "hostname not configured" if the redirect changes hostname, 
        // but we added the hostnames to config so we can try unoptimized={false} or true. 
        // Let's keep unoptimized={false} for Cloudinary (as per original) and maybe true for others to be safe? 
        // Actually, original had unoptimized={false}. Let's stick to that but maybe for Google Drive we might want it true if it fails.
        // For now, let's use unoptimized={false} generally, but if it's not Cloudinary, we might not want to force it.
        // However, the user's error was "hostname is not configured", which implies they ARE using Next.js optimization.
        // So we should keep unoptimized={false} (default) or explicit false, provided the host is in config.
      />
    </div>
  );
}
