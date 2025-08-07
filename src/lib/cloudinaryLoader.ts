// lib/cloudinaryLoader.ts

interface CloudinaryLoaderParams {
  src: string;
  width: number;
  quality?: number;
}

// IMPORTANT: Replace 'YOUR_CLOUD_NAME' with your actual Cloudinary cloud name.
const CLOUDINARY_CLOUD_NAME = "dnaaxfifx";

export default function cloudinaryLoader({
  src,
  width,
  quality,
}: CloudinaryLoaderParams): string {
  // Create a set of transformation parameters
  const params = ["f_auto", "c_limit", `w_${width}`, `q_${quality || "auto"}`];

  // Combine them with the base URL and the public ID (src)
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${params.join(
    ","
  )}/${src}`;
}
