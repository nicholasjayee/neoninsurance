"use client";

import React, { ReactElement } from "react";
import { motion } from "framer-motion";
import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";

// --- Type Definitions ---
interface ContactInfo {
  icon: ReactElement;
  title: string;
  details: string[];
  color: "brand-accent" | "brand-primary" | "brand-secondary-dark";
}

// THE FIX: Tailwind needs full class names to exist in the source code.
// This mapping object provides those full class names, solving the dynamic class issue.
const colorMap = {
  "brand-accent": { text: "text-brand-accent", bg: "bg-brand-accent/10" },
  "brand-primary": { text: "text-brand-primary", bg: "bg-brand-primary/10" },
  "brand-secondary-dark": {
    text: "text-brand-secondary-dark",
    bg: "bg-brand-secondary-dark/10",
  },
};

// --- Component Data --- (Preserved exactly, now typed)
const contactInfo: ContactInfo[] = [
  {
    icon: <FiMapPin />,
    title: "Our Office",
    details: [
      "Kanjokya House, 1st Floor",
      "Kanjokya Street, Kampala, Uganda",
      "P.O.Box 138881",
    ],
    color: "brand-accent",
  },
  {
    icon: <FiPhone />,
    title: "Give Us a Call",
    details: ["0200-940878"],
    color: "brand-primary",
  },
  {
    icon: <FiMail />,
    title: "Send Us an Email",
    details: ["info@neoninsurance.co.ug"],
    color: "brand-secondary-dark",
  },
];

// --- Main Exported Component ---
const ContactDetailsSection: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-brand-light">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-start">
        {/* Left Side: Contact Info */}
        <div>
          <h2 className="text-3xl font-bold text-brand-text-primary mb-6">
            Contact Information
          </h2>
          <div className="space-y-8">
            {contactInfo.map((info, index) => {
              // Use the color map to get the correct, full class names
              const classes = colorMap[info.color];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="flex items-start gap-4"
                >
                  <div className={`p-3 rounded-full mt-1 ${classes.bg}`}>
                    <div className={classes.text}>
                      {React.cloneElement(
                        info.icon as React.ReactElement<{ size: number }>,
                        { size: 24 }
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-brand-text-primary">
                      {info.title}
                    </h3>
                    {info.title === "Give Us a Call"
                      ? info.details.map((line, i) => (
                          <a
                            key={i}
                            href={`tel:${line}`}
                            className="block text-brand-text-secondary hover:text-brand-primary transition-colors"
                          >
                            {line}
                          </a>
                        ))
                      : info.title === "Send Us an Email"
                      ? info.details.map((line, i) => (
                          <a
                            key={i}
                            href={`mailto:${line}`}
                            className="block text-brand-text-secondary hover:text-brand-primary transition-colors"
                          >
                            {line}
                          </a>
                        ))
                      : info.details.map((line, i) => (
                          <p key={i} className="text-brand-text-secondary">
                            {line}
                          </p>
                        ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="h-96 w-full rounded-lg overflow-hidden shadow-md border border-brand-border"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.754964955721!2d32.58253621526437!3d0.314995999745163!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbb0f5150934b%3A0x440c950157973e6!2sKanjokya%20St%2C%20Kampala%2C%20Uganda!5e0!3m2!1sen!2sus!4v1689201979456!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true} // Changed to boolean true
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Neon Insurance Brokers Ltd. Location"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactDetailsSection;
