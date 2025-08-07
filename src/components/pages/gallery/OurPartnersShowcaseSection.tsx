"use client";

import React from "react";
import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";

// --- Type Definition ---
interface Partner {
  name: string;
  logoUrl: StaticImageData; // Changed to StaticImageData
  websiteUrl: string;
}

// --- STEP 1 & 2: Statically import all logos with relative paths ---
import exquisiteSolutionLogo from "../../../../public/img/logos/Exquisite-solution.png";
import kiwaHardwareLogo from "../../../../public/img/logos/KIWA-HARDWARE.png";
import parkShoebillLogo from "../../../../public/img/logos/park-shoebill-logo.png";
import serviceCopsLogo from "../../../../public/img/logos/Service-Cops.png";
import supperdealHardwareLogo from "../../../../public/img/logos/supperdeal-Hardware1.png";
import easyRideLogo from "../../../../public/img/logos/easy-ride.svg"; // Using cleaned filename
import safeBodaLogo from "../../../../public/img/logos/safe-boda.png"; // Using cleaned filename
import neptuneLogo from "../../../../public/img/logos/neptune.png";
import conteLogo from "../../../../public/img/logos/conte.png";
import unimoversLogo from "../../../../public/img/logos/unimovers.svg";

// --- STEP 3: Update Component Data to use imported objects ---
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
  { name: "unimovers", logoUrl: unimoversLogo, websiteUrl: "#" },
];

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
            Our Network of Trusted Partners
          </h2>
          <p className="mt-4 text-lg text-brand-text-onDark/70">
            We collaborate with the best to bring you unparalleled coverage.
          </p>
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-8 gap-y-12 items-center">
          {partners.map((partner, index) => {
            // --- STEP 4: Conditionally handle SVG files ---
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
                className="flex justify-center items-center h-16 grayscale hover:grayscale-0 transition-all duration-300"
              >
                <div className="relative h-24 w-48">
                  <Image
                    src={partner.logoUrl}
                    alt={`${partner.name} logo`}
                    fill
                    style={{ objectFit: "contain" }}
                    className="bg-white/5" // Corrected a typo here from bg-white/5 0
                    // Add conditional placeholder and accurate sizes
                    placeholder={isSvg ? "empty" : "blur"}
                    sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, 50vw"
                  />
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OurPartnersShowcaseSection;
