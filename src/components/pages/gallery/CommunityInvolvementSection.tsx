"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Image, { StaticImageData } from "next/image";

// --- STEP 1: Statically import all local images using relative paths ---
// This method is confirmed to work with your project setup.

// --- STEP 2: Update type definitions to use StaticImageData ---
interface GalleryItem {
  category: string;
  title: string;
  imageUrl: StaticImageData;
}

interface CommunityInvolvementSectionProps {
  galleryData: GalleryItem[];
}

interface SelectedImage {
  src: StaticImageData; // Changed from string
  index: number;
}

// Update the data to use the imported image objects

// --- Main Exported Component ---
const CommunityInvolvementSection: React.FC<
  CommunityInvolvementSectionProps
> = ({
  galleryData = [], // Use a default empty array to prevent crashes
}) => {
  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(
    null
  );

  const handleNext = () => {
    if (selectedImage !== null) {
      const nextIndex = (selectedImage.index + 1) % galleryData.length;
      setSelectedImage({
        src: galleryData[nextIndex].imageUrl,
        index: nextIndex,
      });
    }
  };

  const handlePrev = () => {
    if (selectedImage !== null) {
      const prevIndex =
        (selectedImage.index - 1 + galleryData.length) % galleryData.length;
      setSelectedImage({
        src: galleryData[prevIndex].imageUrl,
        index: prevIndex,
      });
    }
  };

  return (
    <section className="py-20 md:py-32 bg-brand-light">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-brand-text-primary">
            Our Commitment in Action
          </h2>
          <p className="mt-4 text-lg text-brand-text-secondary">
            We are more than a brokerage; we are a partner in the community.
          </p>
          <div
            className="w-24 h-1 mx-auto mt-4"
            style={{
              background: "linear-gradient(90deg, #F97316, #C41E24, #FBCB0A)",
            }}
          ></div>
        </motion.div>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {galleryData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="overflow-hidden rounded-lg shadow-lg cursor-pointer group"
              onClick={() => setSelectedImage({ src: item.imageUrl, index })}
            >
              <div className="relative h-80">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  // --- Blur effect is now enabled and will work ---
                  placeholder="blur"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-brand-white text-sm font-semibold">
                    {item.title}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-50"
            >
              <FiX size={32} />
            </button>
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-50 p-2 bg-black/20 rounded-full"
            >
              <FiChevronLeft size={32} />
            </button>

            {/* --- OPTIMIZED MODAL IMAGE --- */}
            <motion.div
              key={selectedImage.index}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full max-w-4xl max-h-[90vh]"
            >
              <Image
                src={selectedImage.src}
                alt="Enlarged community view"
                fill
                style={{ objectFit: "contain" }}
                sizes="100vw"
              />
            </motion.div>

            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-50 p-2 bg-black/20 rounded-full"
            >
              <FiChevronRight size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CommunityInvolvementSection;
