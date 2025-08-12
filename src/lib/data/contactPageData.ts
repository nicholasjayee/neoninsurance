import { siteConfig } from "./siteConfig"; // Import the single source of truth

export interface ContactInfo {
  icon: "map-pin" | "phone" | "mail"; // Use a string identifier for the icon
  title: string;
  details: string[];
  color: "brand-accent" | "brand-primary" | "brand-secondary-dark";
}

export const contactInfoData: ContactInfo[] = [
  {
    icon: "map-pin",
    title: "Our Office",
    details: [
      siteConfig.address.line1,
      siteConfig.address.line2,
      siteConfig.address.poBox,
    ],
    color: "brand-accent",
  },
  {
    icon: "phone",
    title: "Give Us a Call",
    details: [siteConfig.telephone],
    color: "brand-primary",
  },
  {
    icon: "mail",
    title: "Send Us an Email",
    details: [siteConfig.email],
    color: "brand-secondary-dark",
  },
];
