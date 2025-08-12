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
    client: "Cross-Border Claim",
    challenge:
      "A client's property was damaged and body injuries occured in Mombasa, resulting in a complex claim",
    solution:
      "We efficiently managed the claim by: Promptly notifying the insurer and facilitating the appointment of anassessor. Ensuring timely submission of all required documents. Guiding the client through the ptocess and assuring reimbursement for third-party settlements. Coordinating with the insurer to finalize the claim settlement",
    outcome: "Property Damage and Third-Party Liability Claims Fully Settled",
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
