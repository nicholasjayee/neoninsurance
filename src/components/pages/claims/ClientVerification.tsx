"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiUpload, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { clientVerificationSchema } from "@/lib/claimsSchema";

interface ClientVerificationProps {
  onVerificationSuccess: (data: {
    policyNumber: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    idDocument: File;
  }) => void;
}

export default function ClientVerification({ onVerificationSuccess }: ClientVerificationProps) {
  const [formData, setFormData] = useState({
    policyNumber: "",
    fullName: "",
    email: "",
    phoneNumber: "",
  });
  const [idDocument, setIdDocument] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isVerifying, setIsVerifying] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({ ...prev, idDocument: "Please upload an image file" }));
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, idDocument: "File size must be less than 5MB" }));
        return;
      }
      setIdDocument(file);
      setErrors((prev) => ({ ...prev, idDocument: "" }));
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({ ...prev, idDocument: "Please upload an image file" }));
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, idDocument: "File size must be less than 5MB" }));
        return;
      }
      setIdDocument(file);
      setErrors((prev) => ({ ...prev, idDocument: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate form data
    const result = clientVerificationSchema.safeParse(formData);
    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          newErrors[err.path[0].toString()] = err.message;
        }
      });
      setErrors(newErrors);
      return;
    }

    // Validate ID document
    if (!idDocument) {
      setErrors((prev) => ({ ...prev, idDocument: "Please upload your ID document" }));
      return;
    }

    setIsVerifying(true);

    // Simulate backend verification (2 seconds)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // For MVP, we'll accept any valid format
    // In production, this would verify against your policy database
    setIsVerifying(false);
    onVerificationSuccess({
      ...formData,
      idDocument,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-brand-border">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-primary/10 rounded-full mb-4">
            <FiCheckCircle className="w-8 h-8 text-brand-primary" />
          </div>
          <h2 className="text-2xl font-bold text-brand-text-primary mb-2">
            Verify Your Identity
          </h2>
          <p className="text-brand-text-secondary">
            To ensure secure claims processing, please verify your policy details
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Policy Number */}
          <div>
            <label className="block text-sm font-medium text-brand-text-secondary mb-2">
              Policy Number <span className="text-brand-primary">*</span>
            </label>
            <input
              type="text"
              name="policyNumber"
              value={formData.policyNumber}
              onChange={handleChange}
              placeholder="e.g., NEON-123456"
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.policyNumber ? "border-red-500" : "border-brand-border"
              } focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all`}
            />
            {errors.policyNumber && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <FiAlertCircle className="w-4 h-4" />
                {errors.policyNumber}
              </p>
            )}
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-brand-text-secondary mb-2">
              Full Name <span className="text-brand-primary">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="As it appears on your policy"
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.fullName ? "border-red-500" : "border-brand-border"
              } focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all`}
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <FiAlertCircle className="w-4 h-4" />
                {errors.fullName}
              </p>
            )}
          </div>


          {/* Email Address */}
          <div>
            <label className="block text-sm font-medium text-brand-text-secondary mb-2">
              Email Address <span className="text-brand-primary">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.email ? "border-red-500" : "border-brand-border"
              } focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <FiAlertCircle className="w-4 h-4" />
                {errors.email}
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-brand-text-secondary mb-2">
              Phone Number <span className="text-brand-primary">*</span>
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="+256 123 456 789"
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.phoneNumber ? "border-red-500" : "border-brand-border"
              } focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all`}
            />
            {errors.phoneNumber && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <FiAlertCircle className="w-4 h-4" />
                {errors.phoneNumber}
              </p>
            )}
          </div>

          {/* ID Document Upload */}
          <div>
            <label className="block text-sm font-medium text-brand-text-secondary mb-2">
              ID Document <span className="text-brand-primary">*</span>
            </label>
            <p className="text-xs text-brand-text-secondary mb-2">
              Upload National ID, Passport, or Driver&apos;s License
            </p>
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                dragActive
                  ? "border-brand-primary bg-brand-primary/5"
                  : errors.idDocument
                  ? "border-red-500"
                  : "border-brand-border hover:border-brand-primary"
              }`}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              {idDocument ? (
                <div className="flex items-center justify-center gap-3">
                  <FiCheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-brand-text-primary font-medium">
                    {idDocument.name}
                  </span>
                </div>
              ) : (
                <div>
                  <FiUpload className="w-8 h-8 text-brand-text-secondary mx-auto mb-2" />
                  <p className="text-brand-text-primary font-medium">
                    Drop your ID here or click to browse
                  </p>
                  <p className="text-sm text-brand-text-secondary mt-1">
                    Maximum file size: 5MB
                  </p>
                </div>
              )}
            </div>
            {errors.idDocument && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <FiAlertCircle className="w-4 h-4" />
                {errors.idDocument}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isVerifying}
            className="w-full bg-brand-primary text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:bg-brand-primary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isVerifying ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                <FiCheckCircle />
                Verify & Continue
              </>
            )}
          </button>
        </form>
      </div>
    </motion.div>
  );
}
