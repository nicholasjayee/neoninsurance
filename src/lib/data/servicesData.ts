// Define the TypeScript type for a single coverage item.
// Note that 'icon' is a string literal union type for type safety.
export interface CoverageItem {
  icon:
    | "car"
    | "shield"
    | "qrcode"
    | "heartbeat"
    | "building"
    | "briefcase"
    | "users-cog"
    | "anchor";
  name: string;
}

// Define and export the array for personal coverages.
export const personalCoveragesData: CoverageItem[] = [
  { icon: "car", name: "Motor Comprehensive" },
  { icon: "shield", name: "Motor Third Party" },
  { icon: "qrcode", name: "Digital Stickers" },
  { icon: "heartbeat", name: "Life Assurance" },
];

// Define and export the array for commercial coverages.
export const commercialCoveragesData: CoverageItem[] = [
  { icon: "building", name: "Industrial All Risks (IAR)" },
  { icon: "briefcase", name: "Professional Indemnity" },
  { icon: "users-cog", name: "VSLA" },
  { icon: "anchor", name: "Local marine cargo" },
  { icon: "qrcode", name: "Digital sticker motor third party" },
];
