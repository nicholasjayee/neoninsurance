import React from "react";
import PremiumCalculator from "@/components/tools/PremiumCalculator";
import { FiCheckCircle } from "react-icons/fi";
import { LucideCalculator } from "lucide-react";

import type { Metadata } from "next";
import { getSiteConfig } from "@/lib/siteConfig";

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig();
  const siteUrl = config?.url || "https://www.neoninsurancebrokerltd.org";

  return {
    title: "Premium Calculator | Estimate Your Insurance Cost | Neon Insurance",
    description: config?.defaultDescription || "Calculate your insurance premium instantly with our interactive calculator. Get quotes for motor, home, health, and travel insurance.",
    keywords: [
      "insurance calculator uganda",
      "premium estimator",
      "car insurance quote calculator",
      "health insurance cost",
      "insurance price check",
    ],
    openGraph: {
      title: "Premium Calculator | Neon Insurance Broker Ltd",
      description: "Get an instant estimate of your insurance premium.",
      url: `${siteUrl}/calculator`,
      type: "website",
    },
    alternates: {
      canonical: `${siteUrl}/calculator`,
    },
  };
}

export default function CalculatorPage() {
  return (
    <main className="min-h-screen bg-brand-light pt-24 pb-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-primary/10 rounded-full mb-4">
            <LucideCalculator className="w-8 h-8 text-brand-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-brand-text-primary mb-4">
            Premium Calculator
          </h1>
          <p className="text-xl text-brand-text-secondary max-w-2xl mx-auto">
            Get an instant estimate of your insurance premium. Adjust the parameters to see how different factors affect your coverage cost.
          </p>
        </div>

        {/* Calculator */}
        <PremiumCalculator />

        {/* FAQ Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-brand-text-primary mb-8 text-center">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-brand-border">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-primary/10 rounded-full mb-4">
                <span className="text-brand-primary font-bold text-xl">1</span>
              </div>
              <h3 className="font-bold text-brand-text-primary mb-2">Select Insurance Type</h3>
              <p className="text-sm text-brand-text-secondary">
                Choose from Motor, Home, Health, or Travel insurance based on your needs.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-brand-border">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-primary/10 rounded-full mb-4">
                <span className="text-brand-primary font-bold text-xl">2</span>
              </div>
              <h3 className="font-bold text-brand-text-primary mb-2">Adjust Parameters</h3>
              <p className="text-sm text-brand-text-secondary">
                Use the sliders and inputs to customize your coverage. See real-time premium updates.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-brand-border">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-primary/10 rounded-full mb-4">
                <span className="text-brand-primary font-bold text-xl">3</span>
              </div>
              <h3 className="font-bold text-brand-text-primary mb-2">Get Your Quote</h3>
              <p className="text-sm text-brand-text-secondary">
                Review the breakdown and click &quot;Get Official Quote&quot; to proceed with your application.
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 max-w-3xl mx-auto bg-brand-neutral-subtle border border-brand-border rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <FiCheckCircle className="w-5 h-5 text-brand-secondary mt-0.5" />
            <div>
              <p className="text-sm text-brand-text-secondary">
                <strong>Please note:</strong> The premiums shown are estimates based on the information provided. Final premiums may vary based on underwriting assessment, additional factors, and current market conditions. Contact us for an official quote tailored to your specific needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
