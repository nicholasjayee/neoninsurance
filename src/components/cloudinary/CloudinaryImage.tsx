// components/CloudinaryImage.tsx
import React from "react";
import Image from "next/image";
import cloudinaryLoader from "@/lib/cloudinaryLoader"; // Adjust the import path

interface CloudinaryImageProps {
  publicId: string; // The image's public ID on Cloudinary
  alt: string;
  className?: string;
  // You can add other next/image props like priority, etc.
  priority?: boolean;
}

export default function CloudinaryImage({
  publicId,
  alt,
  className = "",
  priority = false,
}: CloudinaryImageProps) {
  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      <Image
        // Pass the custom loader function to the `loader` prop
        loader={cloudinaryLoader}
        src={publicId} // Pass the publicId as the src
        alt={alt}
        fill
        style={{ objectFit: "cover" }}
        sizes="(max-width: 768px) 100vw, 50vw" // This will now work perfectly!
        priority={priority}
        // DO NOT use unoptimized={true}
      />
    </div>
  );
}
