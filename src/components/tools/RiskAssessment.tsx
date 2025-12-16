"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiMapPin, FiShield, FiAlertTriangle, FiCheckCircle } from "react-icons/fi";

interface RiskData {
  flood: "low" | "medium" | "high";
  theft: "low" | "medium" | "high";
  fire: "low" | "medium" | "high";
  score: number;
}

export default function RiskAssessment() {
  const [zipCode, setZipCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RiskData | null>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (zipCode.length < 5) return;

    setLoading(true);
    setResult(null);

    // Fetch from server action
    const { getRiskByZip } = await import("@/app/(app)/actions/tools");
    const result = await getRiskByZip(zipCode);

    if (result.success && result.risk) {
      setResult({
        flood: (result.risk.floodRisk || "low") as "low" | "medium" | "high",
        theft: (result.risk.theftRisk || "low") as "low" | "medium" | "high",
        fire: (result.risk.fireRisk || "low") as "low" | "medium" | "high",
        score: result.risk.score || 50,
      });
    } else {
      // Fallback logic if zip not found in DB (for demo purposes)
      // Deterministic mock data based on zip code
      const zipSum = zipCode.split("").reduce((acc, char) => acc + parseInt(char), 0);
      const riskLevels = ["low", "medium", "high"] as const;
      
      setResult({
        flood: riskLevels[zipSum % 3],
        theft: riskLevels[(zipSum + 1) % 3],
        fire: riskLevels[(zipSum + 2) % 3],
        score: Math.min(100, Math.max(0, 100 - (zipSum * 2))),
      });
    }

    setLoading(false);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case "low": return "text-green-500 bg-green-100";
      case "medium": return "text-yellow-500 bg-yellow-100";
      case "high": return "text-red-500 bg-red-100";
      default: return "text-gray-500 bg-gray-100";
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-brand-border overflow-hidden">
      <div className="p-8 bg-brand-secondary text-white">
        <h2 className="text-2xl font-bold mb-2">Risk Assessment</h2>
        <p className="opacity-90">Check local risk factors for your area.</p>
      </div>

      <div className="p-8">
        <form onSubmit={handleAnalyze} className="flex gap-4 mb-8">
          <div className="relative flex-1">
            <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-text-secondary" />
            <input
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value.replace(/\D/g, "").slice(0, 5))}
              placeholder="Enter Zip Code"
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-brand-border focus:ring-2 focus:ring-brand-secondary outline-none font-mono text-lg"
            />
          </div>
          <button
            type="submit"
            disabled={loading || zipCode.length < 5}
            className="bg-brand-secondary text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-secondary-light transition-colors disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Analyze"}
          </button>
        </form>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between bg-brand-neutral-subtle p-6 rounded-2xl border border-brand-border">
              <div>
                <p className="text-brand-text-secondary text-sm font-bold uppercase tracking-wider">Safety Score</p>
                <p className="text-4xl font-bold text-brand-text-primary">{result.score}/100</p>
              </div>
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white shadow-md">
                <FiShield className={`w-8 h-8 ${result.score > 70 ? "text-green-500" : result.score > 40 ? "text-yellow-500" : "text-red-500"}`} />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Flood Risk", value: result.flood },
                { label: "Theft Risk", value: result.theft },
                { label: "Fire Risk", value: result.fire },
              ].map((item) => (
                <div key={item.label} className="text-center p-4 rounded-xl border border-brand-border">
                  <div className={`inline-flex p-2 rounded-full mb-2 ${getRiskColor(item.value)}`}>
                    <FiAlertTriangle className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-medium text-brand-text-secondary mb-1">{item.label}</p>
                  <p className="font-bold text-brand-text-primary capitalize">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="bg-brand-primary/5 p-4 rounded-xl border border-brand-primary/20 flex items-start gap-3">
              <FiCheckCircle className="w-5 h-5 text-brand-primary mt-0.5" />
              <div>
                <p className="font-bold text-brand-text-primary text-sm">Neon Protection</p>
                <p className="text-sm text-brand-text-secondary">
                  Our comprehensive plans cover all identified risks in your area.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
