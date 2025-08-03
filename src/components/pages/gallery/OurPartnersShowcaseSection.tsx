"use client"; // This must be a Client Component due to the use of Framer Motion's whileInView.

import React from "react";
import { motion } from "framer-motion";

// --- Type Definition ---
interface Partner {
  name: string;
  logoUrl: string;
  websiteUrl: string;
}

// --- Component Data --- (Preserved exactly as you provided it, now typed)
const partners: Partner[] = [
  {
    name: "UAP Old Mutual",
    logoUrl: "/uap-old-mutual-insurance-uganda.svg",
    websiteUrl: "https://www.uapoldmutual.com/ug",
  },
  {
    name: "ICEA LION Group",
    logoUrl: "/icea-lion-general-insurance.svg",
    websiteUrl: "https://www.icealion.com/ug",
  },
  {
    name: "MUA Insurance",
    logoUrl: "https://www.mua.co.ug/sites/default/files/MUA.svg",
    websiteUrl: "https://www.mua.co.ug/",
  },
  {
    name: "Sanlam",
    logoUrl: "/sanlam.svg",
    websiteUrl: "https://www.sanlam.com/uganda/",
  }, // Corrected URL as per previous versions
  {
    name: "Britam",
    logoUrl: "/britam-insurance-uganda.svg",
    websiteUrl: "https://ug.britam.com/",
  },
  {
    name: "Prudential",
    logoUrl: "/prudential-insurance.svg",
    websiteUrl: "https://www.prudential.ug/",
  },
  {
    name: "Insurance Brokers Association of Uganda (IBAU)",
    logoUrl: "/Ibau.svg",
    websiteUrl: "https://ibau.ug/",
  },
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={partner.logoUrl}
                alt={`${partner.name} logo`}
                className="max-h-full max-w-full object-contain"
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Export Statement --- (Preserved exactly)
export default OurPartnersShowcaseSection;
