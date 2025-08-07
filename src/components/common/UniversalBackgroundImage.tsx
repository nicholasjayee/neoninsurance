// You can save this as `components/common/UniversalBackgroundImage.tsx`

import React from "react";
import Image, { StaticImageData } from "next/image";

// --- Type Definition for Component Props ---
interface UniversalBackgroundImageProps {
  // The src can be a string (for remote URLs) or a StaticImageData object (for local imports)
  src: string | StaticImageData;
  alt: string; // Alt text is required for accessibility
  className?: string; // Optional className for the container
  priority?: boolean; // Optional: set to true for LCP images
}

/**
 * A universal, optimized background image component that uses the built-in Next.js
 * <Image> component. It replaces manual CSS background logic with a much more
 * performant and simpler solution.
 */
export default function UniversalBackgroundImage({
  src,
  alt,
  className = "",
  priority = false,
}: UniversalBackgroundImageProps) {
  // Return null if no source is provided to prevent errors
  if (!src) {
    return null;
  }

  return (
    // This outer container defines the area the image will fill.
    // It must have position: relative.
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        priority={priority}
        // The `fill` prop makes the image behave like a background image.
        fill
        // This style is equivalent to the CSS `background-size: cover`.
        style={{ objectFit: "cover" }}
        // This automatically enables the "blur-up" effect for static imports
        // and provides a simpler blur for remote images. It replaces all the
        // manual useState/useEffect logic.
        placeholder="blur"
        // This is crucial for performance. It tells Next.js to generate smaller
        // versions of the image for smaller screens.
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );
}
