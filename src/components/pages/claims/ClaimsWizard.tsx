"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import WizardStepper from "./WizardStepper";
import IncidentTypeSelector from "./IncidentTypeSelector";
import LocationPicker from "./LocationPicker";
import PhotoUploader from "./PhotoUploader";
import VoiceRecorder from "./VoiceRecorder";
import { FiArrowLeft, FiArrowRight, FiCheck } from "react-icons/fi";
import { createClaim } from "@/app/(app)/actions/claims";

interface ClaimsWizardProps {
  verificationData: {
    policyNumber: string;
    fullName: string;
    email: string;
    phoneNumber: string;
  };
  onSubmitSuccess: () => void;
}

const steps = ["Incident Type", "Location", "Photos", "Voice Note"];

export default function ClaimsWizard({
  verificationData,
  onSubmitSuccess,
}: ClaimsWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    incidentType: null as "car" | "home" | "health" | null,
    location: null as { latitude: number; longitude: number } | null,
    photos: [] as File[],
    voiceNote: null as Blob | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return formData.incidentType !== null;
      case 1:
        return formData.location !== null;
      case 2:
        return formData.photos.length > 0;
      case 3:
        return true; // Voice note is optional
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Split full name into first and last name
      const names = verificationData.fullName.split(" ");
      const firstName = names[0];
      const lastName = names.length > 1 ? names.slice(1).join(" ") : "Unknown";

      // Convert incident type to uppercase to match enum
      const incidentType = formData.incidentType?.toUpperCase() as
        | "CAR"
        | "HOME"
        | "HEALTH"
        | "CYBER"
        | "TRAVEL";

      // Mock photo URLs for now (since we don't have a real upload backend yet)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const photoUrls = formData.photos.map((p) => URL.createObjectURL(p));
      // In a real app, we would upload these files to S3/Cloudinary first and get real URLs.
      // For this demo, we'll just pass a placeholder string if it's a blob url,
      // or we can just pass a dummy string to satisfy the schema.
      const dummyPhotoUrls = formData.photos.map(
        () => "https://placehold.co/600x400"
      );

      const result = await createClaim({
        firstName,
        lastName,
        email: verificationData.email,
        phoneNumber: verificationData.phoneNumber,
        policyNumber: verificationData.policyNumber,
        incidentType: incidentType,
        incidentDate: new Date(), // Default to now if not selected, but we should add date picker
        address: "Location from map", // We should reverse geocode or just pass coords
        latitude: formData.location?.latitude || 0,
        longitude: formData.location?.longitude || 0,
        description: "Claim submitted via wizard", // We should add a description field
        photos: dummyPhotoUrls,
      });

      if (result.success) {
        onSubmitSuccess();
      } else {
        console.error("Submission failed:", result.error);
        // Handle error state (show toast etc)
      }
    } catch (error) {
      console.error("Error submitting claim:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Stepper */}
      <WizardStepper currentStep={currentStep} steps={steps} />

      {/* Step Content */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-8 rounded-3xl shadow-xl border border-brand-border"
      >
        {currentStep === 0 && (
          <IncidentTypeSelector
            selectedType={formData.incidentType}
            onSelect={(type) =>
              setFormData({ ...formData, incidentType: type })
            }
          />
        )}

        {currentStep === 1 && (
          <LocationPicker
            location={formData.location}
            onLocationChange={(location) =>
              setFormData({ ...formData, location })
            }
          />
        )}

        {currentStep === 2 && (
          <PhotoUploader
            photos={formData.photos}
            onPhotosChange={(photos) => setFormData({ ...formData, photos })}
          />
        )}

        {currentStep === 3 && (
          <VoiceRecorder
            voiceNote={formData.voiceNote}
            onVoiceNoteChange={(voiceNote) =>
              setFormData({ ...formData, voiceNote })
            }
          />
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-brand-border">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-brand-border text-brand-text-primary font-medium hover:border-brand-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiArrowLeft />
            Back
          </button>

          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-primary text-white font-medium hover:bg-brand-primary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <FiArrowRight />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting || !canProceed()}
              className="flex items-center gap-2 px-8 py-3 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <FiCheck />
                  Submit Claim
                </>
              )}
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
