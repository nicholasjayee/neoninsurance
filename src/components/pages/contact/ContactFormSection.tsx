"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

// --- Type Definition for Submission Status ---
type SubmissionStatus = "idle" | "sending" | "success" | "error";

const ContactFormSection: React.FC = () => {
  // --- State Management for the Form ---
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<SubmissionStatus>("idle");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("error");
    }
  };

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

        {/* The form now has an onSubmit handler */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          {/* Inputs now have name, value, and onChange handlers */}
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-3 bg-black/20 border border-brand-white/10 rounded-md text-brand-text-onDark placeholder:text-brand-text-onDark/50 focus:ring-2 focus:ring-brand-accent focus:outline-none transition-shadow"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 bg-black/20 border border-brand-white/10 rounded-md text-brand-text-onDark placeholder:text-brand-text-onDark/50 focus:ring-2 focus:ring-brand-accent focus:outline-none transition-shadow"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="w-full p-3 bg-black/20 border border-brand-white/10 rounded-md text-brand-text-onDark placeholder:text-brand-text-onDark/50 focus:ring-2 focus:ring-brand-accent focus:outline-none transition-shadow"
          ></textarea>

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full bg-brand-primary text-white font-bold py-3 rounded-md hover:bg-brand-primary-light transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            {status === "sending" ? "Submitting..." : "Submit Message"}
          </button>

          {/* User Feedback Messages */}
          {status === "success" && (
            <p className="text-green-400 text-center">
              Message sent successfully!
            </p>
          )}
          {status === "error" && (
            <p className="text-red-400 text-center">
              Something went wrong. Please try again.
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
};

export default ContactFormSection;
