import { StaticImageData } from "next/image";

// Import your images here, in the central data file
import galleryImg1 from "../../../public/img/gallery/IMG-20250629-WA0075.jpg";
import galleryImg2 from "../../../public/img/gallery/IMG-20250629-WA0103.jpg";
import galleryImg3 from "../../../public/img/gallery/safe-boda.png";
import galleryImg4 from "../../../public/img/gallery/safe-boda--liz.png";

// Define the type for a single gallery item
export interface GalleryItem {
  category: string;
  title: string;
  imageUrl: StaticImageData;
}

// Define and export the array of gallery data
export const communityGalleryData: GalleryItem[] = [
  {
    category: "Industry Leadership",
    title: "Neon team at Insurance sports Gala",
    imageUrl: galleryImg1,
  },
  {
    category: "Community Competition",
    title: "Community participation",
    imageUrl: galleryImg2,
  },
  {
    category: "Financial Literacy",
    title: "Safe boda",
    imageUrl: galleryImg3,
  },
  {
    category: "Digital sticker sensitization",
    title: "Digital sticker sensitization to safe boda",
    imageUrl: galleryImg4,
  },
];
