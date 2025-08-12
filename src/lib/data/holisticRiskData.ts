// Define the TypeScript type for a single process step.
// The 'icon' property is a string literal union for type safety.
export interface ProcessStep {
  icon: "check-circle" | "layers" | "shield";
  title: string;
  description: string;
  themeColor: "brand-accent" | "brand-secondary-dark" | "brand-primary";
}

// Define and export the array of process steps data.
export const processStepsData: ProcessStep[] = [
  {
    icon: "check-circle", // Represents <FiCheckCircle />
    title: "Risk Assessment",
    description:
      "We analyze your unique situation to identify potential exposures and gaps in coverage.",
    themeColor: "brand-accent",
  },
  {
    icon: "layers", // Represents <FiLayers />
    title: "Policy Customization",
    description:
      "We access a wide market to select and tailor policies that precisely fit your needs.",
    themeColor: "brand-secondary-dark",
  },
  {
    icon: "shield", // Represents <FiShield />
    title: "360° Protection",
    description:
      "The result is a comprehensive shield of protection, giving you complete peace of mind.",
    themeColor: "brand-primary",
  },
];
