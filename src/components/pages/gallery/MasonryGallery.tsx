"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FiX, FiMaximize2 } from "react-icons/fi";
import { GalleryItem } from "@/lib/data/galleryData";

interface MasonryGalleryProps {
  items: GalleryItem[];
}

export default function MasonryGallery({ items }: MasonryGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  // Extract unique categories
  const categories = ["All", ...Array.from(new Set(items.map((item) => item.category)))];

  // Filter items
  const filteredItems =
    selectedCategory === "All"
      ? items
      : items.filter((item) => item.category === selectedCategory);

  return (
    <section className="py-20 bg-brand-light">
      <div className="container mx-auto px-6">
        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-brand-primary text-white shadow-lg scale-105"
                  : "bg-white text-brand-text-secondary hover:bg-brand-neutral-subtle border border-brand-border"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <motion.div layout className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                key={index} // Ideally use a unique ID if available
                className="break-inside-avoid mb-8 group relative cursor-pointer rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                onClick={() => setSelectedImage(item)}
              >
                <div className="relative">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                    placeholder="blur"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <FiMaximize2 className="text-white text-3xl drop-shadow-lg" />
                  </div>
                </div>
                <div className="p-4 bg-white border-t border-brand-border">
                  <p className="text-xs font-bold text-brand-primary uppercase tracking-wider mb-1">
                    {item.category}
                  </p>
                  <h3 className="text-lg font-bold text-brand-text-primary leading-tight">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <FiX size={40} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl max-h-[90vh] w-full rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[80vh]">
                 <Image
                  src={selectedImage.imageUrl}
                  alt={selectedImage.title}
                  fill
                  style={{ objectFit: "contain" }}
                  className="rounded-lg"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-black/90 to-transparent text-white">
                <p className="text-brand-primary font-bold text-sm uppercase tracking-wider mb-1">
                  {selectedImage.category}
                </p>
                <h2 className="text-2xl font-bold">{selectedImage.title}</h2>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
