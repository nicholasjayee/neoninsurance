import React, { ReactNode } from "react";
import { FaUserShield, FaBuilding, FaHandshake } from "react-icons/fa";

// --- Type Definitions for the Content Structure ---
interface ParagraphContent {
  type: "paragraph";
  text: string;
}

interface HeadingContent {
  type: "heading";
  level: number;
  text: string;
}

interface ListContent {
  type: "list";
  items: string[];
}

interface TableContent {
  type: "table";
  headers: string[];
  rows: string[][];
}

interface HighlightContent {
  type: "highlight";
  text: string;
}

export type DetailedContentItem =
  | ParagraphContent
  | HeadingContent
  | ListContent
  | TableContent
  | HighlightContent;

// --- Type Definitions for the Main Data Structure ---
export interface Service {
  slug: string;
  name: string;
  content?: DetailedContentItem[];
}

export interface Solution {
  id: string;
  icon: ReactNode;
  label: string;
  color: string;
  services: Service[];
}

export interface NavLinkItem {
  href: string;
  label: string;
  dropdownItems?: Solution[];
}

// --- Complete and Unabridged Data ---

export const solutionsData: Solution[] = [
  {
    id: "personal",
    icon: <FaUserShield />,
    label: "Personal Insurance",
    color: "#C41E24",
    services: [
      { slug: "travel-insurance", name: "Travel Insurance" },
      {
        slug: "motor-comprehensive",
        name: "Motor Comprehensive",
        content: [
          {
            type: "paragraph",
            text: "A type of car insurance that provides the broadest coverage. It protects the vehicle owner against both third-party liabilities and damage to their own vehicle.",
          },
          { type: "heading", level: 3, text: "Scope of Cover" },
          {
            type: "list",
            items: [
              "Third-Party Liability",
              "Accidental Damage",
              "Theft",
              "Fire or Explosion",
              "Vandalism or Malicious Damage",
              "Natural Disasters (Floods, Storms, Hail etc)",
              "Windscreen Damage",
            ],
          },
          { type: "heading", level: 3, text: "Extensions" },
          {
            type: "list",
            items: [
              "Radio/TV and other accessories at Actual Replacement Cost",
              "Medical Expenses",
              "Removal & Towing Charges",
              "Emergency Transportation/Ambulance",
              "Funeral Expenses for the driver",
              "Claims Preparation Costs including police reports",
            ],
          },
          { type: "heading", level: 3, text: "Requirements" },
          {
            type: "list",
            items: [
              "List of vehicles with their values",
              "Logbooks",
              "Driver’s Licenses",
              "Vehicle Photos",
              "National ID",
              "Tracking Certificates (Optional)",
            ],
          },
          { type: "heading", level: 3, text: "Claim Procedures" },
          {
            type: "list",
            items: [
              "Fully filled, stamped & signed Claim Form",
              "Photos showing the damages",
              "Written statement by the driver/witness",
              "Copy of the driver’s license & logbook",
              "Police Inspection Report (IOV)",
              "At least two repair quotations",
              "All relevant receipts (towing, medical, etc.)",
              "Third-party documents if applicable",
              "Proof of ownership for total loss claims",
              "Car keys (in case of theft or total loss)",
            ],
          },
          { type: "heading", level: 3, text: "Key Exclusions" },
          {
            type: "list",
            items: [
              "Theft by own employees",
              "Loss of use and/or consequential loss",
              "Depreciation, wear and tear",
              "Damage outside the geographical scope",
              "War and related perils",
              "Driving under the influence of intoxicating liquor or drugs",
            ],
          },
        ],
      },
      {
        slug: "medical-insurance",
        name: "Medical Insurance",
        content: [
          {
            type: "paragraph",
            text: "A policy that helps cover the cost of medical treatment. It protects individuals or families from high hospital bills, consultation fees, surgeries, drugs and sometimes maternity or chronic illness care.",
          },
          { type: "heading", level: 3, text: "Scope of Coverage" },
          {
            type: "table",
            headers: ["Benefit Area", "Typical Services Covered"],
            rows: [
              ["Outpatient", "GP/specialist visits, labs, medications"],
              ["Inpatient", "Hospital stays, surgeries, ICU"],
              ["Maternity", "Prenatal, delivery, postnatal support"],
              ["Dental & Optical", "Cleanings, extractions, glasses"],
              [
                "Emergency & Evacuation",
                "24/7 services, possibly overseas referrals",
              ],
              ["Wellness/Other", "Checkups, health talks, rescue/evacuation"],
            ],
          },
          { type: "heading", level: 3, text: "Key Conditions" },
          {
            type: "list",
            items: [
              "Eligibility: Members must be part of the insured group (e.g., enrolled student or employed staff).",
              "Waiting Periods: 30 to 90 days for new members before some benefits apply (except emergencies). Maternity benefits often have a 9-12 month waiting period.",
              "Pre-authorization: Surgeries and specialist consultations usually require prior approval from the insurer.",
            ],
          },
          { type: "heading", level: 3, text: "Key Exclusions" },
          { type: "list", items: ["Cosmetic surgery", "Fertility treatment"] },
          { type: "heading", level: 3, text: "Claim Procedures" },
          {
            type: "list",
            items: [
              "Visit an accredited medical facility.",
              "Present your insurance card or ID.",
              "Receive medical treatment.",
            ],
          },
        ],
      },
      {
        slug: "group-personal-accident",
        name: "Group Personal Accident Insurerance(GPA)",
        content: [
          {
            type: "paragraph",
            text: "This provides financial protection to a group of individuals, usually employees or members of an organization, in case of death, injury, or disability caused by an accident.",
          },
          { type: "heading", level: 3, text: "Scope of Cover" },
          {
            type: "list",
            items: [
              "Accidental Death",
              "Permanent Total Disability",
              "Permanent Partial Disability",
              "Temporary Total Disability",
              "Medical Expenses including hospitalization",
              "Transport and Incidental Costs",
              "Funeral Expenses",
              "Mobility / Artificial Appliances",
              "Burns and Disfigurements",
            ],
          },
          { type: "heading", level: 3, text: "Extensions" },
          {
            type: "list",
            items: [
              "Disappearance clause after 12 months",
              "Riot / Strike and Civil Commotion",
            ],
          },
          { type: "heading", level: 3, text: "Claim Procedures" },
          {
            type: "list",
            items: [
              "Fully filled Claim Form",
              "Medical Certificate/Report",
              "Police Abstract (for road accidents/assault)",
              "Original Medical Receipts",
              "Pay-slips for 3 months prior to the accident (for employees)",
              "Original Death Certificate & Post Mortem Report (for death claims)",
            ],
          },
          { type: "heading", level: 3, text: "Key Exclusions" },
          {
            type: "list",
            items: [
              "Political risks (e.g., wars, civil wars)",
              "Terrorism",
              "Self-inflicted injury or suicide",
              "Injuries under the influence of drugs",
              "Own criminal act",
              "Pregnancy, childbirth, miscarriage and abortion",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "business",
    icon: <FaBuilding />,
    label: "Business & Commercial",
    color: "#F97316",
    services: [
      {
        slug: "fire-special-perils",
        name: "Fire & Special Perils",
        content: [
          {
            type: "paragraph",
            text: "Our goal is to provide you with the best protection for your assets, ensuring the continued success and safety of your business. This covers physical damage to your buildings and contents due to fire and other special perils.",
          },
          { type: "heading", level: 3, text: "Scope of Cover" },
          {
            type: "list",
            items: [
              "Fire & Lightning",
              "Standard Explosion",
              "Earthquake",
              "Political Riots & Terrorism",
              "Malicious Damage & Aircraft Damage",
              "Impact Damage",
              "Storming or Tempest",
              "Floods & Rain Water Damage",
              "Bursting or Overflowing of Water Tanks/Pipes",
            ],
          },
          { type: "heading", level: 3, text: "Requirements" },
          {
            type: "list",
            items: [
              "Accurate valuation of the insured property.",
              "Property must be well-maintained with necessary fire protection.",
              "Proof of ownership for property and assets.",
              "Full disclosure of business operations.",
              "Adherence to local fire safety regulations.",
            ],
          },
          { type: "heading", level: 3, text: "Claim Procedures" },
          {
            type: "list",
            items: [
              "Fully filled Claim Form",
              "Accounting & Stock Records",
              "Fire Brigade Report",
              "Police Abstract Report (if malicious)",
              "Detailed Bill of Quantities (for buildings)",
            ],
          },
        ],
      },
      {
        slug: "all-risks-insurance",
        name: "All Risks Insurance",
        content: [
          {
            type: "paragraph",
            text: "A type of property insurance that covers accidental loss or damage to specific movable items from any cause, except those specifically excluded in the policy.",
          },
          {
            type: "highlight",
            text: "Unlike standard policies that only cover named risks, this covers almost everything unless clearly excluded.",
          },
          { type: "heading", level: 3, text: "Scope of Cover" },
          {
            type: "list",
            items: [
              "Computers, printers, phones, and other electronics",
              "Musical instruments",
              "Sports gear",
              "Lab equipment",
              "Staff personal items (optional)",
              "Furniture",
            ],
          },
          { type: "heading", level: 3, text: "Requirements" },
          {
            type: "list",
            items: [
              "A detailed list of items to be insured with serial numbers.",
              "The value of each item (receipts or valuation reports are preferred).",
              "Proof of ownership.",
            ],
          },
        ],
      },
      {
        slug: "money-in-transit",
        name: "Money in Transit",
        content: [
          {
            type: "paragraph",
            text: "This policy covers against loss of money belonging to the insured in transit, including loss or damage to any safe or strong room as a result of theft or attempted theft.",
          },
          { type: "heading", level: 3, text: "Scope of Coverage" },
          {
            type: "list",
            items: [
              "Cash in the hands of authorized officials.",
              "In transit to and from the bank, insured premises, etc.",
              "In premises during working hours.",
              "In premises after working hours (in a locked safe).",
              "Estimated annual carryings.",
            ],
          },
          { type: "heading", level: 3, text: "Key Conditions" },
          {
            type: "list",
            items: [
              "Limits on the listed scope of covers.",
              "A risk assessment will be conducted by the insurer.",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "brokerage",
    icon: <FaHandshake />,
    label: "Our Brokerage Advantage",
    color: "#D97706",
    services: [
      { slug: "general-advisory", name: "General Insurance Advisory" },
      { slug: "risk-assessment", name: "Expert Risk Assessment" },
      { slug: "claims-advocacy", name: "Dedicated Claims Support" },
      { slug: "market-access", name: "Access to a Wide Market" },
    ],
  },
];

export const navLinks: NavLinkItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  {
    href: "/services",
    label: "Services",
    dropdownItems: solutionsData,
  },
  { href: "/gallery", label: "Gallery" },
];
