"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link"; // Using Next.js Link for navigation

export default function FinalCtaSection() {
  return (
    <section className="bg-brand-light py-20 md:py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, type: "spring" }}
          // The background gradient is preserved
          className="relative overflow-hidden rounded-2xl p-10 text-center shadow-2xl md:p-16"
          style={{
            background: "linear-gradient(135deg, #F97316, #C41E24, #FBCB0A)",
          }}
        >
          {/* 
            CONVERTED: The background URL path now points to the /public directory.
            Make sure your subtle-pattern.svg is in /public/patterns/
          */}
          <div className="absolute inset-0 bg-[url('/patterns/subtle-pattern.svg')] opacity-10"></div>

          <div className="relative z-10">
            <h2 className="text-4xl font-extrabold text-brand-white md:text-5xl">
              Unlock Your Peace of Mind.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-brand-white/80">
              The future is uncertain, but your security doesn&apos;t have to
              be. Take the most important step today. A simple conversation can
              change everything.
            </p>
            {/* CONVERTED: The 'a' tag is now a Next.js Link component */}
            <Link
              href="/contact"
              className="mt-10 inline-block transform rounded-full bg-brand-white px-12 py-4 font-bold text-brand-primary shadow-lg transition-all hover:scale-105 hover:bg-brand-light"
            >
              Book a No-Obligation Consultation
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
