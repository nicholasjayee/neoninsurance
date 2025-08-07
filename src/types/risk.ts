// risks.ts
import type { ReactNode } from "react";
// --- 1. Import the StaticImageData type from next/image ---

// This interface defines the shape of a single "Risk" object.
export interface Risk {
  id: string; // A unique identifier for the risk
  icon: ReactNode; // The icon component for the timeline
  title: string; // The main title of the risk, e.g., "Cyber Security"
  description: string; // A brief description of the risk

  // --- 2. UPDATED to use StaticImageData ---
  // This supports optimized, statically imported images and enables features like `placeholder="blur"`.
  imageUrl: string;
}
