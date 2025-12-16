"use client";

import React from "react";
import { TravelPremiumParams } from "@/lib/premiumCalculations";

interface TravelCalculatorProps {
  params: TravelPremiumParams;
  onChange: (params: TravelPremiumParams) => void;
}

export default function TravelCalculator({
  params,
  onChange,
}: TravelCalculatorProps) {
  const handleChange = (field: keyof TravelPremiumParams, value: unknown) => {
    onChange({ ...params, [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* Trip Cost */}
      <div>
        <label className="block text-sm font-medium text-brand-text-primary mb-2">
          Trip Cost: UGX {params.tripCost.toLocaleString()}
        </label>
        <input
          type="range"
          min="500000"
          max="50000000"
          step="500000"
          value={params.tripCost}
          onChange={(e) => handleChange("tripCost", Number(e.target.value))}
          className="w-full h-2 bg-brand-border rounded-lg appearance-none cursor-pointer accent-brand-primary"
        />
        <div className="flex justify-between text-xs text-brand-text-secondary mt-1">
          <span>500K</span>
          <span>50M</span>
        </div>
      </div>

      {/* Destination */}
      <div>
        <label className="block text-sm font-medium text-brand-text-primary mb-2">
          Destination
        </label>
        <select
          value={params.destination}
          onChange={(e) =>
            handleChange(
              "destination",
              e.target.value as "regional" | "international"
            )
          }
          className="w-full px-4 py-3 rounded-xl border border-brand-border focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none bg-white"
        >
          <option value="regional">Regional (East Africa)</option>
          <option value="international">International</option>
        </select>
      </div>

      {/* Duration */}
      <div>
        <label className="block text-sm font-medium text-brand-text-primary mb-2">
          Trip Duration: {params.duration} days
        </label>
        <input
          type="range"
          min="1"
          max="90"
          step="1"
          value={params.duration}
          onChange={(e) => handleChange("duration", Number(e.target.value))}
          className="w-full h-2 bg-brand-border rounded-lg appearance-none cursor-pointer accent-brand-primary"
        />
        <div className="flex justify-between text-xs text-brand-text-secondary mt-1">
          <span>1 day</span>
          <span>90 days</span>
        </div>
      </div>

      {/* Coverage Type */}
      <div>
        <label className="block text-sm font-medium text-brand-text-primary mb-2">
          Coverage Type
        </label>
        <div className="grid grid-cols-2 gap-3">
          {(["medical", "comprehensive"] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => handleChange("coverageType", type)}
              className={`py-3 px-4 rounded-xl font-medium transition-all ${
                params.coverageType === type
                  ? "bg-brand-primary text-white shadow-lg"
                  : "bg-white border-2 border-brand-border text-brand-text-primary hover:border-brand-primary"
              }`}
            >
              {type === "medical" ? "Medical Only" : "Comprehensive"}
            </button>
          ))}
        </div>
      </div>

      {/* Number of Travelers */}
      <div>
        <label className="block text-sm font-medium text-brand-text-primary mb-2">
          Number of Travelers: {params.travelers}
        </label>
        <input
          type="range"
          min="1"
          max="10"
          step="1"
          value={params.travelers}
          onChange={(e) => handleChange("travelers", Number(e.target.value))}
          className="w-full h-2 bg-brand-border rounded-lg appearance-none cursor-pointer accent-brand-primary"
        />
        <div className="flex justify-between text-xs text-brand-text-secondary mt-1">
          <span>1</span>
          <span>10</span>
        </div>
      </div>
    </div>
  );
}
