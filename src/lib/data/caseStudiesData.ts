// --- Type Definition ---
// The `icon` property is now a string, which is serializable.
export interface CaseStudy {
  icon: "truck" | "hardhat" | "hospital"; // Use a union type for type safety
  client: string;
  challenge: string;
  solution: string;
  outcome: string;
  themeColor: string;
}

// --- Component Data ---
export const caseStudiesData: CaseStudy[] = [
  {
    icon: "truck", // <-- Represents <FaTruck />
    client: "Cross-Border Logistics Firm",
    challenge:
      "A client's truck carrying high-value cargo was involved in a multi-vehicle accident in a neighboring country, leading to complex liability claims.",
    solution:
      "We managed all cross-border communication and paperwork, acting as the primary negotiator with the multiple insurers involved.",
    outcome: "Full Cargo Value Recovered & Liability Settled",
    themeColor: "#C41E24",
  },
  {
    icon: "hardhat", // <-- Represents <FaHardHat />
    client: "Kampala Construction Project",
    challenge:
      "A major construction site experienced a setback due to unexpected torrential rains, causing water damage to materials and delaying the project timeline.",
    solution:
      "We navigated the client's 'Contractors All Risk' policy, meticulously documenting the damage and presenting a robust claim.",
    outcome: "Successful Claim Payout, Preventing Penalties",
    themeColor: "#F97316",
  },
  {
    icon: "hospital", // <-- Represents <FaHospital />
    client: "Corporate Group Medical Scheme",
    challenge:
      "An employee required emergency specialized medical treatment abroad, which involved complex pre-authorization and cost management.",
    solution:
      "Our team liaised directly with the insurer's international desk, fast-tracking all approvals and ensuring financial guarantees were in place.",
    outcome: "Emergency Treatment Authorized in 24 Hours",
    themeColor: "#D97706",
  },
];
