"use client"; // This must be a Client Component due to the use of Framer Motion's whileInView.

import React from "react";
import { motion } from "framer-motion";

// Preserving your original arrow function component structure.
const ContactFormSection: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-brand-dark">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-brand-text-onDark mb-4">
            Send Us a Message
          </h2>
          <p className="text-brand-text-onDark/70">
            Have a question or need a custom quote? Fill out the form, and a
            member of our expert team will get back to you shortly.
          </p>
        </motion.div>
        <motion.form
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 bg-black/20 border border-brand-white/10 rounded-md text-brand-text-onDark placeholder:text-brand-text-onDark/50 focus:ring-2 focus:ring-brand-accent focus:outline-none transition-shadow"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 bg-black/20 border border-brand-white/10 rounded-md text-brand-text-onDark placeholder:text-brand-text-onDark/50 focus:ring-2 focus:ring-brand-accent focus:outline-none transition-shadow"
          />
          <textarea
            placeholder="Your Message"
            rows={5} // Changed to a number
            className="w-full p-3 bg-black/20 border border-brand-white/10 rounded-md text-brand-text-onDark placeholder:text-brand-text-onDark/50 focus:ring-2 focus:ring-brand-accent focus:outline-none transition-shadow"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-brand-primary text-white font-bold py-3 rounded-md hover:bg-brand-primary-light transition-colors"
          >
            Submit Message
          </button>
        </motion.form>
      </div>
    </section>
  );
};

// Preserving your exact export statement.
export default ContactFormSection;
