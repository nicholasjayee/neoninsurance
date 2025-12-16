"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiPhone, FiMail, FiHelpCircle, FiFileText, FiSearch } from "react-icons/fi";
import ClientVerification from "@/components/pages/claims/ClientVerification";
import ClaimsWizard from "@/components/pages/claims/ClaimsWizard";
import ClaimsTracker from "@/components/pages/claims/ClaimsTracker";

type TabType = "file" | "track";

export default function ClaimsPageContent() {
  const [activeTab, setActiveTab] = useState<TabType>("file");
  const [isVerified, setIsVerified] = useState(false);
  const [verificationData, setVerificationData] = useState<{
    policyNumber: string;
    fullName: string;
    email: string;
    phoneNumber: string;
  } | null>(null);
  const [claimSubmitted, setClaimSubmitted] = useState(false);

  const handleVerificationSuccess = (data: {
    policyNumber: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    idDocument: File;
  }) => {
    setVerificationData({
      policyNumber: data.policyNumber,
      fullName: data.fullName,
      email: data.email,
      phoneNumber: data.phoneNumber,
    });
    setIsVerified(true);
  };

  const handleClaimSubmitSuccess = () => {
    setClaimSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-brand-light pt-24 pb-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-text-primary mb-4">
            Claims Center
          </h1>
          <p className="text-xl text-brand-text-secondary max-w-2xl mx-auto">
            We&apos;re here to help you get back on your feet. Report a claim or track existing ones.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white rounded-2xl p-2 shadow-lg border border-brand-border">
            <button
              onClick={() => setActiveTab("file")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === "file"
                  ? "bg-brand-primary text-white shadow-md"
                  : "text-brand-text-secondary hover:text-brand-text-primary"
              }`}
            >
              <FiFileText />
              File New Claim
            </button>
            <button
              onClick={() => setActiveTab("track")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === "track"
                  ? "bg-brand-primary text-white shadow-md"
                  : "text-brand-text-secondary hover:text-brand-text-primary"
              }`}
            >
              <FiSearch />
              Track Existing Claim
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === "file" ? (
          <div className="space-y-12">
            {!claimSubmitted ? (
              <>
                {!isVerified ? (
                  <ClientVerification onVerificationSuccess={handleVerificationSuccess} />
                ) : (
                  verificationData && (
                    <ClaimsWizard
                      verificationData={verificationData}
                      onSubmitSuccess={handleClaimSubmitSuccess}
                    />
                  )
                )}
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl mx-auto bg-white p-12 rounded-3xl shadow-xl border border-brand-border text-center"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                  <svg
                    className="w-10 h-10 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-brand-text-primary mb-4">
                  Claim Submitted Successfully!
                </h2>
                <p className="text-brand-text-secondary mb-6">
                  Your claim has been received and is being processed. We&apos;ll contact you shortly
                  at the phone number you provided.
                </p>
                <p className="text-sm text-brand-text-secondary mb-8">
                  Claim Reference: <span className="font-mono font-bold">NEON-{Date.now().toString().slice(-6)}</span>
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => {
                      setClaimSubmitted(false);
                      setIsVerified(false);
                      setVerificationData(null);
                    }}
                    className="bg-brand-primary text-white font-medium py-3 px-6 rounded-xl hover:bg-brand-primary-light transition-colors"
                  >
                    File Another Claim
                  </button>
                  <button
                    onClick={() => setActiveTab("track")}
                    className="bg-white border-2 border-brand-border text-brand-text-primary font-medium py-3 px-6 rounded-xl hover:border-brand-primary transition-colors"
                  >
                    Track This Claim
                  </button>
                </div>
              </motion.div>
            )}

            {/* Contact Information - Only show when not in wizard */}
            {!isVerified && !claimSubmitted && (
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-12">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white p-8 rounded-3xl shadow-xl border border-brand-border"
                >
                  <h2 className="text-2xl font-bold text-brand-text-primary mb-6">
                    Need Immediate Help?
                  </h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-brand-primary/10 p-3 rounded-full text-brand-primary">
                        <FiPhone size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-brand-text-primary">Call Us 24/7</h3>
                        <p className="text-brand-text-secondary">For emergencies and immediate support.</p>
                        <a
                          href="tel:+256123456789"
                          className="text-brand-primary font-bold text-xl mt-1 block hover:underline"
                        >
                          +256 123 456 789
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-brand-secondary/10 p-3 rounded-full text-brand-secondary">
                        <FiMail size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-brand-text-primary">Email Claims</h3>
                        <p className="text-brand-text-secondary">Send us your documents and details.</p>
                        <a
                          href="mailto:claims@neoninsurance.com"
                          className="text-brand-primary font-bold text-xl mt-1 block hover:underline"
                        >
                          claims@neoninsurance.com
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-white p-8 rounded-3xl shadow-xl border border-brand-border"
                >
                  <h3 className="font-bold text-brand-text-primary mb-4 flex items-center gap-2">
                    <FiHelpCircle className="text-brand-secondary" />
                    What to have ready:
                  </h3>
                  <ul className="list-disc list-inside text-brand-text-secondary space-y-2">
                    <li>Policy Number</li>
                    <li>Valid ID Document (National ID, Passport, or Driver&apos;s License)</li>
                    <li>Date and time of incident</li>
                    <li>Photos of damage (if applicable)</li>
                    <li>Police report (for theft/accidents)</li>
                  </ul>
                </motion.div>
              </div>
            )}
          </div>
        ) : (
          <ClaimsTracker />
        )}
      </div>
    </main>
  );
}
