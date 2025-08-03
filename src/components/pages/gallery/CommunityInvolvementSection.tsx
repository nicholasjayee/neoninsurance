"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";

// --- Type Definitions ---
interface GalleryItem {
  category: string;
  title: string;
  imageUrl: string;
}

interface SelectedImage {
  src: string;
  index: number;
}

// --- Component Data --- (Preserved exactly, now typed)
const galleryData: GalleryItem[] = [
  {
    category: "Industry Leadership",
    title: "IBAU Annual Conference",
    imageUrl: "https://ibau.ug/sites/default/files/2022-04/DSC_4968_1.jpg",
  },
  {
    category: "Community Health",
    title: "Sponsoring the Kampala Health Run",
    imageUrl: "https://ibau.ug/sites/default/files/2022-04/DSC_4560.jpg",
  },
  {
    category: "Financial Literacy",
    title: "Workshop for Small Business Owners",
    imageUrl: "https://ibau.ug/sites/default/files/2022-04/DSC_4549%203.jpg",
  },
  {
    category: "Youth Empowerment",
    title: "Local Youth Football Team Sponsorship",
    imageUrl: "https://ibau.ug/sites/default/files/2022-04/DSC_4849.jpg",
  },
];

// --- Main Exported Component ---
const CommunityInvolvementSection: React.FC = () => {
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
              <div className="relative">
                {/* The <img> tag is preserved, with an ESLint comment to handle the warning */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
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
            {/* The <img> tag is preserved in the modal as well */}

            <motion.img
              key={selectedImage.src}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              src={selectedImage.src}
              alt="Enlarged community view"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
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
