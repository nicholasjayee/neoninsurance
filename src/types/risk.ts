import type { ReactNode } from "react";

// This interface defines the shape of a single "Risk" object.
export interface Risk {
  id: string; // A unique identifier for the risk
  icon: ReactNode; // The icon component for the timeline
  title: string; // The main title of the risk, e.g., "Cyber Security"
  description: string; // A brief description of the risk
  imageUrl: string; // The path to the representative image, e.g., "/images/cyber.jpg"
}
