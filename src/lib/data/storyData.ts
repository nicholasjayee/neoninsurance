// Define the TypeScript type for a single story milestone.
// The 'icon' property is a string literal union for type safety.
export interface Story {
  id: string;
  year: string;
  title: string;
  icon: "flag" | "bus" | "certificate" | "users" | "globe";
  description: string;
}

// Define and export the array of story data.
export const storyData: Story[] = [
  {
    id: "story-2004",
    year: "2004",
    title: "Our Founding",
    icon: "flag", // Represents <FaFlag />
    description:
      "Founded with over two decades of experience, Neon Insurance Brokers was established with a clear mission: to provide professional, client-first insurance brokerage services in Uganda.",
  },
  {
    id: "story-2013",
    year: "December 2013",
    title: "Pioneering Passenger Protection",
    icon: "bus", // Represents <FaBus />
    description:
      "In partnership with UAP Insurance, we launched 'Musabaaze Sure,' a first-of-its-kind, affordable travel insurance policy designed to protect everyday upcountry bus travelers.",
  },
  {
    id: "story-recognition",
    year: "Official Recognition",
    title: "Licensed & Certified",
    icon: "certificate", // Represents <FaCertificate />
    description:
      "As a fully licensed broker and a proud member of the Insurance Brokers Association of Uganda (IBAU), we are committed to upholding the highest standards of ethics and professional practice.",
  },
  {
    id: "story-growth",
    year: "Consistent Growth",
    title: "Building Trust, One Client at a Time",
    icon: "users", // Represents <FaUsers />
    description:
      "Through dedicated advocacy and tailored solutions, we have steadily grown our client base, becoming a trusted partner for both personal and commercial insurance needs.",
  },
  {
    id: "story-today",
    year: "Today",
    title: "A Commitment to the Future",
    icon: "globe", // Represents <FaGlobe />
    description:
      "Our focus remains on empowering a thriving and secure community by providing unparalleled expertise and unwavering support, ensuring our clients are protected.",
  },
];
