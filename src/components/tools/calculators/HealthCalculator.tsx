"use client";

import React from "react";
import { HealthPremiumParams } from "@/lib/premiumCalculations";

interface HealthCalculatorProps {
  params: HealthPremiumParams;
  onChange: (params: HealthPremiumParams) => void;
}

export default function HealthCalculator({
  params,
  onChange,
}: HealthCalculatorProps) {
  const handleChange = (field: keyof HealthPremiumParams, value: unknown) => {
    onChange({ ...params, [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* Age */}
      <div>
        <label className="block text-sm font-medium text-brand-text-primary mb-2">
          Age
        </label>
        <input
          type="number"
          min="0"
          max="100"
          value={params.age}
          onChange={(e) => handleChange("age", Number(e.target.value))}
          className="w-full px-4 py-3 rounded-xl border border-brand-border focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none"
        />
      </div>

      {/* Coverage Level */}
      <div>
        <label className="block text-sm font-medium text-brand-text-primary mb-2">
          Coverage Level
        </label>
        <div className="grid grid-cols-3 gap-3">
          {(["basic", "standard", "premium"] as const).map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => handleChange("coverageLevel", level)}
              className={`py-3 px-4 rounded-xl font-medium transition-all ${
                params.coverageLevel === level
                  ? "bg-brand-primary text-white shadow-lg"
                  : "bg-white border-2 border-brand-border text-brand-text-primary hover:border-brand-primary"
              }`}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Family Size */}
      <div>
        <label className="block text-sm font-medium text-brand-text-primary mb-2">
          Family Size: {params.familySize}{" "}
          {params.familySize === 1 ? "person" : "people"}
        </label>
        <input
          type="range"
          min="1"
          max="10"
          step="1"
          value={params.familySize}
          onChange={(e) => handleChange("familySize", Number(e.target.value))}
          className="w-full h-2 bg-brand-border rounded-lg appearance-none cursor-pointer accent-brand-primary"
        />
        <div className="flex justify-between text-xs text-brand-text-secondary mt-1">
          <span>1</span>
          <span>10</span>
        </div>
      </div>

      {/* Pre-existing Conditions */}
      <div className="flex items-center gap-3 p-4 bg-brand-neutral-subtle rounded-xl">
        <input
          type="checkbox"
          id="preexisting"
          checked={params.hasPreExisting}
          onChange={(e) => handleChange("hasPreExisting", e.target.checked)}
          className="w-5 h-5 text-brand-primary rounded focus:ring-brand-primary"
        />
        <label
          htmlFor="preexisting"
          className="text-sm font-medium text-brand-text-primary cursor-pointer"
        >
          Pre-existing medical conditions
        </label>
      </div>

      {/* Maternity Coverage */}
      <div className="flex items-center gap-3 p-4 bg-brand-neutral-subtle rounded-xl">
        <input
          type="checkbox"
          id="maternity"
          checked={params.includesMaternity}
          onChange={(e) => handleChange("includesMaternity", e.target.checked)}
          className="w-5 h-5 text-brand-primary rounded focus:ring-brand-primary"
        />
        <label
          htmlFor="maternity"
          className="text-sm font-medium text-brand-text-primary cursor-pointer"
        >
          Include maternity coverage
        </label>
      </div>
    </div>
  );
}
