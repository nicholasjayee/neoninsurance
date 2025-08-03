// Define the structure for a single dropdown item
export interface DropdownItem {
  label: string;
  href: string;
  description: string;
}

// Define the structure for a main navigation link
// It can optionally contain dropdown items
export interface NavItem {
  label: string;
  href: string;
  dropdownItems?: DropdownItem[];
}

// Export the navigation data with the defined types
export const navLinks: NavItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About Us",
    href: "/about",
  },
  {
    label: "Services",
    href: "/services",
    dropdownItems: [
      {
        label: "Personal Insurance",
        href: "/services/personal",
        description: "Coverage for you and your family.",
      },
      {
        label: "Business Insurance",
        href: "/services/business",
        description: "Protect your company and assets.",
      },
      {
        label: "Specialty Insurance",
        href: "/services/specialty",
        description: "Unique coverage for unique needs.",
      },
    ],
  },
  {
    label: "Claims",
    href: "/claims",
  },
];
