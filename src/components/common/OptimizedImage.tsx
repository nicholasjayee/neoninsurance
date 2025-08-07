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
export default function OptimizedImage({
  srcUrl,
  alt,
  className = "",
}: OptimizedImageProps) {
  // Return null if no source URL is provided to prevent errors
  if (!srcUrl) {
    return null;
  }

  // --- URL Generation (Preserved from your original component) ---

  // 1. Create a tiny, blurred placeholder URL for the blurDataURL prop.
  // This generates a 20px wide image with a 500-level blur.
  const placeholderUrl = srcUrl.replace(
    "/upload/",
    "/upload/q_auto:low,w_20,e_blur:500/"
  );

  // 2. Create the full-quality, auto-formatted URL for the main image.
  const fullImageUrl = srcUrl.replace(
    "/upload/",
    "/upload/q_auto:good,f_auto/"
  );

  return (
    // The container is still relative to allow the Image component to fill it.
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      <Image
        src={fullImageUrl}
        alt={alt}
        // --- Next.js Optimization Props ---
        placeholder="blur" // This enables the blur-up effect.
        blurDataURL={placeholderUrl} // This provides the image for the blur.
        fill // This makes the image fill its parent container.
        style={{ objectFit: "cover" }} // Equivalent to object-cover.
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Helps Next.js select the right image size.
        unoptimized={false} // Recommended for Cloudinary to prevent double optimization and costs.
      />
    </div>
  );
}
