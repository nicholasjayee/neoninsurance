"use client";

import React from "react";
import { MotorPremiumParams } from "@/lib/premiumCalculations";

interface MotorCalculatorProps {
  params: MotorPremiumParams;
  onChange: (params: MotorPremiumParams) => void;
}

export default function MotorCalculator({
  params,
  onChange,
}: MotorCalculatorProps) {
  const handleChange = (field: keyof MotorPremiumParams, value: unknown) => {
    onChange({ ...params, [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* Vehicle Value */}
      <div>
        <label className="block text-sm font-medium text-brand-text-primary mb-2">
          Vehicle Value: UGX {params.vehicleValue.toLocaleString()}
        </label>
        <input
          type="range"
          min="5000000"
          max="200000000"
          step="1000000"
          value={params.vehicleValue}
          onChange={(e) => handleChange("vehicleValue", Number(e.target.value))}
          className="w-full h-2 bg-brand-border rounded-lg appearance-none cursor-pointer accent-brand-primary"
        />
        <div className="flex justify-between text-xs text-brand-text-secondary mt-1">
          <span>5M</span>
          <span>200M</span>
        </div>
      </div>

      {/* Vehicle Age */}
      <div>
        <label className="block text-sm font-medium text-brand-text-primary mb-2">
          Vehicle Age: {params.vehicleAge} years
        </label>
        <input
          type="range"
          min="0"
          max="20"
          step="1"
          value={params.vehicleAge}
          onChange={(e) => handleChange("vehicleAge", Number(e.target.value))}
          className="w-full h-2 bg-brand-border rounded-lg appearance-none cursor-pointer accent-brand-primary"
        />
        <div className="flex justify-between text-xs text-brand-text-secondary mt-1">
          <span>New</span>
          <span>20 years</span>
        </div>
      </div>

      {/* Driver Age */}
      <div>
        <label className="block text-sm font-medium text-brand-text-primary mb-2">
          Driver Age
        </label>
        <input
          type="number"
          min="18"
          max="80"
          value={params.driverAge}
          onChange={(e) => handleChange("driverAge", Number(e.target.value))}
          className="w-full px-4 py-3 rounded-xl border border-brand-border focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none"
        />
      </div>

      {/* Years of Experience */}
      <div>
        <label className="block text-sm font-medium text-brand-text-primary mb-2">
          Driving Experience: {params.yearsExperience} years
        </label>
        <input
          type="range"
          min="0"
          max="40"
          step="1"
          value={params.yearsExperience}
          onChange={(e) =>
            handleChange("yearsExperience", Number(e.target.value))
          }
          className="w-full h-2 bg-brand-border rounded-lg appearance-none cursor-pointer accent-brand-primary"
        />
        <div className="flex justify-between text-xs text-brand-text-secondary mt-1">
          <span>0 years</span>
          <span>40 years</span>
        </div>
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-brand-text-primary mb-2">
          Location
        </label>
        <select
          value={params.location}
          onChange={(e) =>
            handleChange("location", e.target.value as "kampala" | "other")
          }
          className="w-full px-4 py-3 rounded-xl border border-brand-border focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none bg-white"
        >
          <option value="kampala">Kampala</option>
          <option value="other">Other Cities</option>
        </select>
      </div>

      {/* Tracking Device */}
      <div className="flex items-center gap-3 p-4 bg-brand-neutral-subtle rounded-xl">
        <input
          type="checkbox"
          id="tracking"
          checked={params.hasTracking || false}
          onChange={(e) => handleChange("hasTracking", e.target.checked)}
          className="w-5 h-5 text-brand-primary rounded focus:ring-brand-primary"
        />
        <label
          htmlFor="tracking"
          className="text-sm font-medium text-brand-text-primary cursor-pointer"
        >
          Vehicle has tracking device{" "}
          <span className="text-green-600">(10% discount)</span>
        </label>
      </div>
    </div>
  );
}
