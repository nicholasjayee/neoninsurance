"use client";

import React from "react";
import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import { Plus } from "lucide-react"; // For the new "more" icon

// --- Type Definition ---
interface Partner {
  name: string;
  logoUrl: StaticImageData;
  websiteUrl: string;
}

// --- Partner Logos ---
import exquisiteSolutionLogo from "../../../../public/img/logos/Exquisite-solution.png";
import kiwaHardwareLogo from "../../../../public/img/logos/KIWA-HARDWARE.png";
import parkShoebillLogo from "../../../../public/img/logos/park-shoebill-logo.png";
import serviceCopsLogo from "../../../../public/img/logos/Service-Cops.png";
import supperdealHardwareLogo from "../../../../public/img/logos/supperdeal-Hardware1.png";
import easyRideLogo from "../../../../public/img/logos/easy-ride.svg";
import safeBodaLogo from "../../../../public/img/logos/safe-boda.png";
import neptuneLogo from "../../../../public/img/logos/neptune.png";
import conteLogo from "../../../../public/img/logos/conte.png";
import unimoversLogo from "../../../../public/img/logos/unimovers.svg";

// --- Partner Data ---
const partners: Partner[] = [
  {
    name: "Exquisite-solution",
    logoUrl: exquisiteSolutionLogo,
    websiteUrl: "#",
  },
  { name: "KIWA-HARDWARE", logoUrl: kiwaHardwareLogo, websiteUrl: "#" },
  { name: "park-shoebill", logoUrl: parkShoebillLogo, websiteUrl: "#" },
  { name: "Service-Cops", logoUrl: serviceCopsLogo, websiteUrl: "#" },
  {
    name: "supperdeal-Hardware",
    logoUrl: supperdealHardwareLogo,
    websiteUrl: "#",
  },
  { name: "easy ride", logoUrl: easyRideLogo, websiteUrl: "#" },
  { name: "safe boda", logoUrl: safeBodaLogo, websiteUrl: "#" },
  { name: "neptune", logoUrl: neptuneLogo, websiteUrl: "#" },
  { name: "conte", logoUrl: conteLogo, websiteUrl: "#" },
  // We keep unimovers in the array, but it won't be shown as a logo
  { name: "unimovers", logoUrl: unimoversLogo, websiteUrl: "#" },
];

// Number of partners to display before the "more" card.
const PARTNERS_TO_SHOW = 10;

// --- Main Exported Component ---
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
            Our Network of Trusted Clients
          </h2>
          <p className="mt-4 text-lg text-brand-text-onDark/70">
            We collaborate with the best to bring you unparalleled coverage.
          </p>
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-8 gap-y-12 items-center">
          {/* Display the first 9 partners */}
          {partners.slice(0, PARTNERS_TO_SHOW).map((partner, index) => {
            const isSvg =
              typeof partner.logoUrl === "object" &&
              partner.logoUrl.src.endsWith(".svg");

            return (
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
                // --- Kept your original container styles ---
                className="flex justify-center items-center h-16 transition-all duration-300"
              >
                <div className="relative h-24 w-48">
                  <Image
                    src={partner.logoUrl}
                    alt={`${partner.name} logo`}
                    fill
                    style={{ objectFit: "contain" }}
                    // --- REVERTED: Kept your original Image component styling ---
                    className="bg-white/50"
                    placeholder={isSvg ? "empty" : "blur"}
                    sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, 50vw"
                  />
                </div>
              </motion.a>
            );
          })}

          {/* --- NEW: The "More Partners" indicator card --- */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              duration: 0.5,
              delay: PARTNERS_TO_SHOW * 0.05,
            }}
            // Match the height of the other logo containers
            className="flex justify-center items-center h-16"
          >
            {/* Use 'group' for coordinated hover effects */}
            <div
              className="group relative flex flex-col items-center justify-center 
               h-full w-full max-w-[12rem] gap-2 p-3 rounded-lg
               bg-white/5 text-brand-text-onDark/70
               border border-white/10
               backdrop-blur-sm shadow-md
               transition-all duration-300 ease-in-out cursor-pointer
               overflow-hidden" // Keep the glow contained
              title="And many more trusted partners"
            >
              {/* Dynamic Glow Effect */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                   w-24 h-24 bg-brand-primary/20 rounded-full 
                   blur-2xl opacity-0 scale-50 
                   group-hover:opacity-100 group-hover:scale-100 
                   transition-all duration-400 ease-in-out"
              />

              {/* Z-index to keep content above the glow */}
              <div className="relative z-10 flex flex-col items-center justify-center gap-1">
                <Plus
                  size={32}
                  className="transition-transform duration-300 group-hover:rotate-90"
                />
                <span className="text-sm font-semibold text-center transition-colors duration-300 group-hover:text-white">
                  And More ...
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurPartnersShowcaseSection;
