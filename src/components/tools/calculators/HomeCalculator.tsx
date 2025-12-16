"use client";

import React from "react";
import { HomePremiumParams } from "@/lib/premiumCalculations";

interface HomeCalculatorProps {
  params: HomePremiumParams;
  onChange: (params: HomePremiumParams) => void;
}

export default function HomeCalculator({
  params,
  onChange,
}: HomeCalculatorProps) {
  const handleChange = (field: keyof HomePremiumParams, value: unknown) => {
    onChange({ ...params, [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* Property Value */}
      <div>
        <label className="block text-sm font-medium text-brand-text-primary mb-2">
          Property Value: UGX {params.propertyValue.toLocaleString()}
        </label>
        <input
          type="range"
          min="10000000"
          max="1000000000"
          step="5000000"
          value={params.propertyValue}
          onChange={(e) =>
            handleChange("propertyValue", Number(e.target.value))
          }
          className="w-full h-2 bg-brand-border rounded-lg appearance-none cursor-pointer accent-brand-primary"
        />
        <div className="flex justify-between text-xs text-brand-text-secondary mt-1">
          <span>10M</span>
          <span>1B</span>
        </div>
      </div>

      {/* Property Type */}
      <div>
        <label className="block text-sm font-medium text-brand-text-primary mb-2">
          Property Type
        </label>
        <select
          value={params.propertyType}
          onChange={(e) =>
            handleChange(
              "propertyType",
              e.target.value as "house" | "apartment" | "commercial"
            )
          }
          className="w-full px-4 py-3 rounded-xl border border-brand-border focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none bg-white"
        >
          <option value="house">House</option>
          <option value="apartment">Apartment</option>
          <option value="commercial">Commercial Property</option>
        </select>
      </div>

      {/* Construction Type */}
      <div>
        <label className="block text-sm font-medium text-brand-text-primary mb-2">
          Construction Type
        </label>
        <select
          value={params.constructionType}
          onChange={(e) =>
            handleChange(
              "constructionType",
              e.target.value as "permanent" | "semi-permanent"
            )
          }
          className="w-full px-4 py-3 rounded-xl border border-brand-border focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none bg-white"
        >
          <option value="permanent">Permanent (Concrete/Brick)</option>
          <option value="semi-permanent">Semi-Permanent</option>
        </select>
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

      {/* Security Features */}
      <div className="flex items-center gap-3 p-4 bg-brand-neutral-subtle rounded-xl">
        <input
          type="checkbox"
          id="security"
          checked={params.hasSecurity}
          onChange={(e) => handleChange("hasSecurity", e.target.checked)}
          className="w-5 h-5 text-brand-primary rounded focus:ring-brand-primary"
        />
        <label
          htmlFor="security"
          className="text-sm font-medium text-brand-text-primary cursor-pointer"
        >
          Has security features (alarm, guards, CCTV){" "}
          <span className="text-green-600">(15% discount)</span>
        </label>
      </div>
    </div>
  );
}
