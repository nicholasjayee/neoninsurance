"use client"; // This must be a Client Component due to the use of Framer Motion's whileInView.

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// --- Type Definition ---
interface Partner {
  name: string;
  logoUrl: string;
  websiteUrl: string;
}

// --- Component Data --- (Preserved exactly as you provided it, now typed)
const partners: Partner[] = [
  {
    name: "Exquisite-solution",
    logoUrl: "/img/logos/Exquisite-solution.png",
    websiteUrl: "#",
  },
  {
    name: "KIWA-HARDWARE",
    logoUrl: "/img/logos/KIWA-HARDWARE.png",
    websiteUrl: "#",
  },
  {
    name: "park-shoebill",
    logoUrl: "/img/logos/park-shoebill-logo.png",
    websiteUrl: "#",
  },
  {
    name: "Service-Cops",
    logoUrl: "/img/logos/Service-Cops.png",
    websiteUrl: "#",
  },
  {
    name: "supperdeal-Hardware",
    logoUrl: "/img/logos/supperdeal-Hardware1.png",
    websiteUrl: "#",
  },
  {
    name: "easy ride",
    logoUrl: "/img/logos/easy ride.svg",
    websiteUrl: "#",
  },
  {
    name: "safe boda",
    logoUrl: "/img/logos/safe-boda.png",
    websiteUrl: "#",
  },
  {
    name: "neptune",
    logoUrl: "/img/logos/neptune.png",
    websiteUrl: "#",
  },
  {
    name: "conte",
    logoUrl: "/img/logos/conte.png",
    websiteUrl: "#",
  },
  {
    name: "unimovers",
    logoUrl: "/img/logos/unimovers.svg",
    websiteUrl: "#",
  },

  // {
  //   name: "Sanlam",
  //   logoUrl: "Service-Cops.png",
  //   websiteUrl: "#",
  // }, // Corrected URL as per previous versions
  // {
  //   name: "Britam",
  //   logoUrl: "/britam-insurance-uganda.svg",
  //   websiteUrl: "https://ug.britam.com/",
  // },
  // {
  //   name: "Prudential",
  //   logoUrl: "/prudential-insurance.svg",
  //   websiteUrl: "https://www.prudential.ug/",
  // },
  // {
  //   name: "Insurance Brokers Association of Uganda (IBAU)",
  //   logoUrl: "/Ibau.svg",
  //   websiteUrl: "https://ibau.ug/",
  // },
];

// --- Main Exported Component --- (Preserved as an arrow function)
const OurPartnersShowcaseSection: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-brand-dark">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-brand-text-onDark">
            Our Network of Trusted Partners
          </h2>
          <p className="mt-4 text-lg text-brand-text-onDark/70">
            We collaborate with the best to bring you unparalleled coverage.
          </p>
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-8 gap-y-12 items-center">
          {partners.map((partner, index) => (
            <motion.a
              key={index}
              href={partner.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              title={partner.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="flex justify-center items-center h-16 grayscale-0 hover:grayscale-0 transition-all duration-300" // Note: your original code had grayscale-0 twice, which is preserved.
            >
              {/* The <img> tag is preserved, with an ESLint comment to handle the warning */}
              {/* The parent container should have a defined size and position relative */}
              <div className="relative h-24 w-48">
                {/* Example: Set a height and width on the parent */}
                <Image
                  src={partner.logoUrl}
                  alt={`${partner.name} logo`}
                  fill
                  style={{ objectFit: "contain" }}
                  className="bg-white/5 0"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Export Statement --- (Preserved exactly)
export default OurPartnersShowcaseSection;
