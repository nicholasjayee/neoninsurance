import { z } from "zod";

// Step 0: Client Verification Schema
export const clientVerificationSchema = z.object({
  policyNumber: z
    .string()
    .min(5, "Policy number must be at least 5 characters")
    .regex(/^[A-Z0-9-]+$/i, "Policy number can only contain letters, numbers, and hyphens"),
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Valid email is required"),
  phoneNumber: z.string().min(10, "Valid phone number is required"),
  // ID document is handled separately as a File object, but we can validate its presence in the form handler
});

export type ClientVerificationData = z.infer<typeof clientVerificationSchema>;

// Step 1: Incident Type Schema
export const incidentTypeSchema = z.object({
  incidentType: z.enum(["CAR", "HOME", "HEALTH", "CYBER", "TRAVEL"]),
  incidentDate: z.date(),
});

export type IncidentTypeData = z.infer<typeof incidentTypeSchema>;

// Step 2: Location Schema
export const locationSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  address: z.string().optional(),
});

export type LocationData = z.infer<typeof locationSchema>;

// Step 3: Photo Upload Schema
// Files are handled as File objects, but we can validate the array length
export const photoUploadSchema = z.object({
  photos: z
    .array(z.any()) // We'll validate File objects manually or use a custom refinement
    .min(1, "Please upload at least one photo of the incident")
    .max(5, "You can upload a maximum of 5 photos"),
});

export type PhotoUploadData = z.infer<typeof photoUploadSchema>;

// Step 4: Voice Note Schema (Optional)
export const voiceNoteSchema = z.object({
  voiceNote: z.any().optional(), // Blob or File
});

export type VoiceNoteData = z.infer<typeof voiceNoteSchema>;

// Combined Claims Schema
export const claimsSchema = z.object({
  ...clientVerificationSchema.shape,
  ...incidentTypeSchema.shape,
  ...locationSchema.shape,
  photos: z.array(z.string()).default([]),
  // Voice note is handled separately or added here if needed
  description: z.string().min(10, "Please provide a brief description of the incident"),
});

export type ClaimsData = z.infer<typeof claimsSchema>;
