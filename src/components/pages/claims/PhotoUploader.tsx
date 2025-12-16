"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiUpload, FiX, FiImage } from "react-icons/fi";
import Image from "next/image";

interface PhotoUploaderProps {
  photos: File[];
  onPhotosChange: (photos: File[]) => void;
  maxPhotos?: number;
}

export default function PhotoUploader({
  photos,
  onPhotosChange,
  maxPhotos = 5,
}: PhotoUploaderProps) {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateAndAddFiles = (files: FileList | null) => {
    if (!files) return;

    const newFiles = Array.from(files);
    setError("");

    // Check if adding these files would exceed the limit
    if (photos.length + newFiles.length > maxPhotos) {
      setError(`You can only upload a maximum of ${maxPhotos} photos`);
      return;
    }

    // Validate each file
    for (const file of newFiles) {
      if (!file.type.startsWith("image/")) {
        setError("Only image files are allowed");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("Each file must be less than 5MB");
        return;
      }
    }

    onPhotosChange([...photos, ...newFiles]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    validateAndAddFiles(e.dataTransfer.files);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    validateAndAddFiles(e.target.files);
  };

  const removePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    onPhotosChange(newPhotos);
    setError("");
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-brand-text-primary mb-2">
          Upload Photos of the Incident
        </h3>
        <p className="text-brand-text-secondary">
          Add clear photos showing the damage or incident (up to {maxPhotos}{" "}
          photos)
        </p>
      </div>

      {/* Upload Zone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all ${
          dragActive
            ? "border-brand-primary bg-brand-primary/5 scale-105"
            : "border-brand-border hover:border-brand-primary"
        } ${photos.length >= maxPhotos ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          disabled={photos.length >= maxPhotos}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
        />
        <FiUpload className="w-12 h-12 text-brand-text-secondary mx-auto mb-4" />
        <p className="text-brand-text-primary font-medium text-lg mb-2">
          Drop photos here or click to browse
        </p>
        <p className="text-sm text-brand-text-secondary">
          Maximum file size: 5MB per photo • {photos.length}/{maxPhotos}{" "}
          uploaded
        </p>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl"
        >
          {error}
        </motion.div>
      )}

      {/* Photo Previews */}
      {photos.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <AnimatePresence>
            {photos.map((photo, index) => (
              <motion.div
                key={`${photo.name}-${index}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative group aspect-square rounded-xl overflow-hidden border-2 border-brand-border"
              >
                <Image
                  src={URL.createObjectURL(photo)}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-full object-cover"
                  fill
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>
                {/* File Name */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-2 truncate">
                  {photo.name}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {photos.length === 0 && (
        <div className="text-center py-8">
          <FiImage className="w-16 h-16 text-brand-text-secondary mx-auto mb-3 opacity-50" />
          <p className="text-brand-text-secondary">No photos uploaded yet</p>
        </div>
      )}
    </div>
  );
}
