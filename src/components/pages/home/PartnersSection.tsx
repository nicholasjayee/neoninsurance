"use client";

import React from "react";
import Image from "next/image"; // Using the Next.js Image component for optimization
import Marquee from "react-fast-marquee";

// --- Type Definition for a single partner ---
interface Partner {
  name: string;
  logoUrl: string; // URL can be external or a local path from /public
  websiteUrl: string;
}

// --- Component Data ---
// The unnecessary 'svg' property has been removed for clarity in this version.
const partners: Partner[] = [
  {
    name: "UAP Old Mutual",
    logoUrl: "/uap-old-mutual-insurance-uganda.svg",
    websiteUrl: "https://www.uapoldmutual.com/ug",
  },
  {
    name: "Jubilee Insurance",
    logoUrl:
      "https://jubileeinsurance.com/ug/wp-content/themes/jubilee/assets/images/jubilee-logo.png",
    websiteUrl: "https://jubileeinsurance.com/ug/",
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
  },
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
    name: "Goldstar Insurance",
    logoUrl:
      "https://goldstarinsurance.com/wp-content/uploads/2019/08/Goldstar-Insrance-Official-Logo-768x530.jpg",
    websiteUrl: "https://www.goldstarinsurance.com/",
  },
  {
    name: "IBAU",
    logoUrl:
      "https://ibau.ug/themes/businessgroup_zymphonies_theme/img/ibau-logo.svg",
    websiteUrl: "https://ibau.ug/",
  },
  {
    name: "CIC Insurance",
    logoUrl:
      "https://ug.cicinsurancegroup.com/wp-content/uploads/2022/03/Screenshot-2022-03-24-at-9.26.01-AM.png",
    websiteUrl: "https://ug.cicinsurancegroup.com/",
  },
  {
    name: "ITC",
    logoUrl: "/insurance-training-college-itc.svg",
    websiteUrl: "https://itc.ac.ug/",
  },
  {
    name: "UIA",
    logoUrl: "/uganda-insurers-association-uia.svg",
    websiteUrl: "https://www.uia.co.ug/",
  },
  {
    name: "Alliance Africa",
    logoUrl: "/alliance-africa-general-insurance.svg",
    websiteUrl: "https://www.allianceug.com/",
  },
  {
    name: "GA Insurance",
    logoUrl: "/ga-insurance-uganda.svg",
    websiteUrl: "https://www.gainsuranceltd.com/ug/",
  },
];

const PartnersSection: React.FC = () => {
  return (
    <section className="py-20 bg-brand-light">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-brand-text-primary">
            We Partner With Uganda&apos;s Leading Insurers
          </h2>
          <p className="mt-2 text-brand-text-secondary">
            Giving you access to the best coverage and rates in the market.
          </p>
        </div>
        <Marquee
          gradient={true}
          gradientColor={"rgb(249, 250, 251)"}
          speed={40}
          pauseOnHover={true}
        >
          {partners.map((partner, index) => (
            <a
              key={index}
              href={partner.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-12 flex items-center justify-center h-16  transition-all duration-300"
              title={partner.name}
            >
              {/* --- Using the next/image component for performance --- */}
              <Image
                src={partner.logoUrl}
                alt={`${partner.name} logo`}
                height={64} // Corresponds to h-16
                width={160} // A generous width to maintain aspect ratio
                style={{
                  objectFit: "contain", // Replicates object-contain
                  width: "auto", // Allows the image to shrink to fit the height
                  height: "100%",
                }}
              />
            </a>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default PartnersSection;
