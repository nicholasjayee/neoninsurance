"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiCheckCircle,
  FiClock,
  FiFileText,
  FiDollarSign,
  FiAlertCircle,
} from "react-icons/fi";
import { getClaim } from "@/app/(app)/actions/claims";
import { Claim } from "@prisma/client";
import { useSiteConfig } from "@/hooks/useSiteConfig";

interface ClaimsTrackerProps {
  claimNumber?: string;
}

const stages = [
  {
    id: 1,
    name: "Received",
    status: "RECEIVED",
    icon: FiFileText,
    description: "Your claim has been received",
    color: "#059669",
  },
  {
    id: 2,
    name: "Reviewing",
    status: "REVIEWING",
    icon: FiClock,
    description: "We're reviewing your documents",
    color: "#d97706",
  },
  {
    id: 3,
    name: "Assessing",
    status: "ASSESSING",
    icon: FiFileText,
    description: "Assessing the claim details",
    color: "#2563eb",
  },
  {
    id: 4,
    name: "Approved",
    status: "APPROVED",
    icon: FiCheckCircle,
    description: "Your claim has been approved",
    color: "#16a34a",
  },
  {
    id: 5,
    name: "Paid",
    status: "PAID",
    icon: FiDollarSign,
    description: "Payment has been processed",
    color: "#a3161b",
  },
];

export default function ClaimsTracker({
  claimNumber: initialClaimNumber,
}: ClaimsTrackerProps) {
  const [claimId, setClaimId] = useState(initialClaimNumber || "");
  const [claimData, setClaimData] = useState<Claim | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { config } = useSiteConfig();

  const handleTrack = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!claimId.trim()) return;

    setLoading(true);
    setError("");
    setClaimData(null);

    try {
      const result = await getClaim(claimId);
      if (result.success && result.claim) {
        setClaimData(result.claim as Claim);
      } else {
        setError("Claim not found. Please check the ID and try again.");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("An error occurred while fetching the claim.");
    } finally {
      setLoading(false);
    }
  };

  const getStageId = (status: string) => {
    const stage = stages.find((s) => s.status === status);
    return stage ? stage.id : 1;
  };

  const currentStage = claimData ? getStageId(claimData.status) : 0;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-brand-border">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-brand-text-primary mb-2">
            Track Your Claim
          </h2>
          <p className="text-brand-text-secondary">
            Enter your claim reference number to check the status.
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleTrack} className="max-w-md mx-auto mb-12">
          <div className="flex gap-2">
            <input
              type="text"
              value={claimId}
              onChange={(e) => setClaimId(e.target.value)}
              placeholder="e.g. cl..."
              className="flex-1 px-4 py-3 rounded-xl border border-brand-border focus:ring-2 focus:ring-brand-primary outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-brand-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-brand-primary-light transition-colors disabled:opacity-50"
            >
              {loading ? "Tracking..." : "Track"}
            </button>
          </div>
          {error && (
            <p className="text-red-500 text-sm mt-2 flex items-center gap-1 justify-center">
              <FiAlertCircle /> {error}
            </p>
          )}
        </form>

        {/* Results */}
        {claimData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-center mb-8">
              <p className="text-brand-text-secondary">
                Claim Number:{" "}
                <span className="font-mono font-bold">{claimData.id}</span>
              </p>
              <p className="text-sm text-brand-text-secondary mt-1">
                Incident: {claimData.incidentType} on{" "}
                {new Date(claimData.incidentDate).toLocaleDateString()}
              </p>
            </div>

            <div className="relative mb-12 overflow-x-auto pb-4">
              <div className="min-w-[500px] px-4">
                <div className="absolute top-6 left-0 right-0 h-2 bg-brand-border rounded-full">
                  <motion.div
                    className="h-full bg-brand-primary rounded-full"
                    initial={{ width: "0%" }}
                    animate={{
                      width: `${
                        ((currentStage - 1) / (stages.length - 1)) * 100
                      }%`,
                    }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>

                <div className="relative flex justify-between">
                  {stages.map((stage, index) => {
                    const Icon = stage.icon;
                    const isCompleted = index + 1 < currentStage;
                    const isCurrent = index + 1 === currentStage;

                    return (
                      <div
                        key={stage.id}
                        className="flex flex-col items-center w-24"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 ${
                            isCompleted || isCurrent
                              ? "bg-brand-primary text-white shadow-lg"
                              : "bg-white border-2 border-brand-border text-brand-text-secondary"
                          }`}
                        >
                          <Icon className="w-6 h-6" />
                        </motion.div>

                        <p
                          className={`text-sm font-bold text-center ${
                            isCurrent
                              ? "text-brand-primary"
                              : isCompleted
                              ? "text-brand-text-primary"
                              : "text-brand-text-secondary"
                          }`}
                        >
                          {stage.name}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Current Status Details */}
            <div className="bg-brand-primary/5 border border-brand-primary/20 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="bg-brand-primary text-white p-3 rounded-full">
                  {React.createElement(
                    stages[currentStage - 1]?.icon || FiFileText,
                    { className: "w-6 h-6" }
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-brand-text-primary text-lg mb-1">
                    Current Status:{" "}
                    {stages[currentStage - 1]?.name || claimData.status}
                  </h3>
                  <p className="text-brand-text-secondary mb-3">
                    {stages[currentStage - 1]?.description || "Status updated"}
                  </p>
                  {claimData.estimatedPayout && (
                    <p className="text-sm text-brand-text-secondary">
                      <strong>Estimated Payout:</strong> $
                      {claimData.estimatedPayout.toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Help Section */}
        <div className="mt-6 bg-brand-neutral-subtle border border-brand-border rounded-xl p-4">
          <p className="text-sm text-brand-text-secondary">
            <strong>Need help?</strong> Contact our claims team at{" "}
            {config ? (
              <>
                <a
                  href={`tel:${config.telephone.replace(/\s/g, "")}`}
                  className="text-brand-primary font-medium hover:underline"
                >
                  {config.telephone}
                </a>{" "}
                or{" "}
                <a
                  href={`mailto:${config.email}`}
                  className="text-brand-primary font-medium hover:underline"
                >
                  {config.email}
                </a>
              </>
            ) : (
              <span className="animate-pulse bg-gray-200 h-4 w-32 inline-block rounded"></span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
