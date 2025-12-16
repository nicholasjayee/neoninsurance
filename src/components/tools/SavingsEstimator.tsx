"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiTrendingDown } from "react-icons/fi";

export default function SavingsEstimator() {
  const [competitors, setCompetitors] = useState<{id: string, name: string, avgMonthlyRate: number, neonSavingsPercentage: number}[]>([]);
  const [selectedCompetitor, setSelectedCompetitor] = useState("");
  const [currentRate, setCurrentRate] = useState(150);
  const [showResult, setShowResult] = useState(false);

  React.useEffect(() => {
    async function loadCompetitors() {
      const { getCompetitors } = await import("@/app/(app)/actions/tools");
      const result = await getCompetitors();
      if (result.success && result.competitors) {
        setCompetitors(result.competitors);
      }
    }
    loadCompetitors();
  }, []);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResult(true);
  };

  // Find selected competitor data or use default
  const competitorData = competitors.find(c => c.name === selectedCompetitor);
  const savingsPercent = competitorData ? competitorData.neonSavingsPercentage : 0.20;

  const neonRate = Math.round(currentRate * (1 - savingsPercent));
  const monthlySavings = currentRate - neonRate;
  const yearlySavings = monthlySavings * 12;

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-brand-border overflow-hidden">
      <div className="p-8 bg-brand-text-primary text-white">
        <h2 className="text-2xl font-bold mb-2">Savings Estimator</h2>
        <p className="opacity-90">See how much you could save by switching to Neon.</p>
      </div>

      <div className="p-8">
        <form onSubmit={handleCalculate} className="space-y-6">
          <div>
            <label className="block font-medium text-brand-text-primary mb-2">Current Provider</label>
            <select
              value={selectedCompetitor}
              onChange={(e) => {
                setSelectedCompetitor(e.target.value);
                // Auto-fill rate if available
                const comp = competitors.find(c => c.name === e.target.value);
                if (comp) setCurrentRate(comp.avgMonthlyRate);
              }}
              className="w-full px-4 py-3 rounded-xl border border-brand-border focus:ring-2 focus:ring-brand-primary outline-none bg-white"
            >
              <option value="">Select Provider</option>
              {competitors.map(c => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block font-medium text-brand-text-primary mb-2">Current Monthly Rate ($)</label>
            <input
              type="number"
              value={currentRate}
              onChange={(e) => setCurrentRate(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-brand-border focus:ring-2 focus:ring-brand-primary outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-brand-text-primary text-white font-bold py-3 px-6 rounded-xl hover:bg-black transition-colors"
          >
            Calculate Savings
          </button>
        </form>

        {showResult && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-8 pt-8 border-t border-brand-border"
          >
            <div className="text-center mb-6">
              <p className="text-brand-text-secondary font-medium uppercase tracking-wider text-sm">Potential Annual Savings</p>
              <p className="text-5xl font-bold text-green-600 mt-2">${yearlySavings.toLocaleString()}</p>
            </div>

            <div className="bg-brand-neutral-subtle rounded-2xl p-6 relative overflow-hidden">
              {/* Bar Chart Visualization */}
              <div className="space-y-4 relative z-10">
                <div>
                  <div className="flex justify-between text-sm font-medium mb-1">
                    <span className="text-brand-text-secondary">{selectedCompetitor || "Current"}</span>
                    <span>${currentRate}/mo</span>
                  </div>
                  <div className="h-4 bg-gray-300 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      className="h-full bg-gray-500"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm font-medium mb-1">
                    <span className="text-brand-primary font-bold">Neon Insurance</span>
                    <span className="text-brand-primary font-bold">${neonRate}/mo</span>
                  </div>
                  <div className="h-4 bg-brand-primary/20 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "80%" }}
                      className="h-full bg-brand-primary"
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex items-center justify-center gap-2 text-green-600 font-bold">
                <FiTrendingDown />
                <span>{Math.round(savingsPercent * 100)}% Lower Premiums</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
