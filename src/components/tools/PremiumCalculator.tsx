"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiDollarSign, FiInfo } from "react-icons/fi";
import { FaCar, FaHome, FaHeartbeat, FaPlane } from "react-icons/fa";

type InsuranceType = "MOTOR" | "HOME" | "HEALTH" | "TRAVEL";
type CoverageLevel = "basic" | "standard" | "premium";

export default function PremiumCalculator() {
  const [insuranceType, setInsuranceType] = useState<InsuranceType>("MOTOR");
  const [coverage, setCoverage] = useState<CoverageLevel>("standard");
  const [premium, setPremium] = useState(0);
  const [factors, setFactors] = useState<Record<string, number> | null>(null);
  const [loading, setLoading] = useState(true);

  // Motor Insurance States
  const [carValue, setCarValue] = useState(25000);
  const [mileage, setMileage] = useState(12000);
  const [driverAge, setDriverAge] = useState(30);
  const [safeDriver, setSafeDriver] = useState(false);

  // Home Insurance States
  const [homeValue, setHomeValue] = useState(200000);
  const [homeAge, setHomeAge] = useState(10);
  const [securitySystem, setSecuritySystem] = useState(false);

  // Health Insurance States
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [ageRange, setAgeRange] = useState<string>("31-45");
  const [preExisting, setPreExisting] = useState(false);

  // Travel Insurance States
  const [tripDuration, setTripDuration] = useState(7);
  const [travelers, setTravelers] = useState(1);
  const [tripType, setTripType] = useState<string>("leisure");

  useEffect(() => {
    async function loadFactors() {
      const { getPricingFactors } = await import("@/app/(app)/actions/tools");
      const result = await getPricingFactors();
      if (result.success && result.factors) {
        setFactors(result.factors);
      }
      setLoading(false);
    }
    loadFactors();
  }, []);

  const calculateMotorPremium = useCallback((base: number) => {
    if (!factors) return base;
    const carValueFactor = factors["car_value_factor"] || 0.002;
    base += carValue * carValueFactor;

    const mileageFactor = factors["mileage_factor"] || 0.002;
    base += (mileage / 1000) * (mileageFactor * 1000);

    if (driverAge < 25) base *= factors["age_under_25_multiplier"] || 1.5;
    else if (driverAge > 60) base *= factors["age_over_60_multiplier"] || 1.1;
    else base *= 0.9;

    if (safeDriver) base *= 0.85;

    return base;
  }, [factors, carValue, mileage, driverAge, safeDriver]);

  const calculateHomePremium = useCallback((base: number) => {
    base *= 2;
    base += (homeValue / 1000) * 0.5;

    if (homeAge > 30) base *= 1.3;
    else if (homeAge > 15) base *= 1.15;

    if (securitySystem) base *= 0.9;

    return base;
  }, [homeValue, homeAge, securitySystem]);

  const calculateHealthPremium = useCallback((base: number) => {
    base *= 3;
    base *= numberOfPeople;

    const ageMultipliers: Record<string, number> = {
      "18-30": 0.8,
      "31-45": 1.0,
      "46-60": 1.3,
      "60+": 1.6,
    };
    base *= ageMultipliers[ageRange] || 1.0;

    if (preExisting) base *= 1.4;

    return base;
  }, [numberOfPeople, ageRange, preExisting]);

  const calculateTravelPremium = useCallback((base: number) => {
    base *= 0.5;
    base += tripDuration * 5;
    base *= travelers;

    if (tripType === "business") base *= 1.2;

    return base;
  }, [tripDuration, travelers, tripType]);

  const calculatePremium = useCallback(() => {
    if (!factors) return;

    let baseRate = factors["base_rate"] || 50;

    switch (insuranceType) {
      case "MOTOR":
        baseRate = calculateMotorPremium(baseRate);
        break;
      case "HOME":
        baseRate = calculateHomePremium(baseRate);
        break;
      case "HEALTH":
        baseRate = calculateHealthPremium(baseRate);
        break;
      case "TRAVEL":
        baseRate = calculateTravelPremium(baseRate);
        break;
    }

    // Apply coverage multiplier
    if (coverage === "basic") baseRate *= factors["coverage_basic_multiplier"] || 0.8;
    else if (coverage === "premium") baseRate *= factors["coverage_premium_multiplier"] || 1.3;

    setPremium(Math.round(baseRate));
  }, [
    factors,
    insuranceType,
    coverage,
    calculateMotorPremium,
    calculateHomePremium,
    calculateHealthPremium,
    calculateTravelPremium,
  ]);

  useEffect(() => {
    calculatePremium();
  }, [calculatePremium]);

  const insuranceTypes = [
    { type: "MOTOR" as InsuranceType, label: "Motor", icon: FaCar, color: "#C41E24" },
    { type: "HOME" as InsuranceType, label: "Home", icon: FaHome, color: "#F97316" },
    { type: "HEALTH" as InsuranceType, label: "Health", icon: FaHeartbeat, color: "#10B981" },
    { type: "TRAVEL" as InsuranceType, label: "Travel", icon: FaPlane, color: "#6366F1" },
  ];

  if (loading) return <div className="p-8 text-center">Loading calculator...</div>;

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-brand-border overflow-hidden">
      {/* Header with Insurance Type Selector */}
      <div className="p-8 bg-gradient-to-r from-brand-primary to-brand-primary-light text-white">
        <h2 className="text-2xl font-bold mb-4">Premium Calculator</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {insuranceTypes.map((type) => (
            <button
              key={type.type}
              onClick={() => setInsuranceType(type.type)}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all ${
                insuranceType === type.type
                  ? "bg-white text-brand-primary shadow-lg scale-105"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              <type.icon className="text-2xl" />
              <span className="font-semibold text-sm">{type.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-8 grid md:grid-cols-2 gap-12">
        {/* Inputs */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={insuranceType}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {insuranceType === "MOTOR" && (
                <>
                  <SliderInput
                    label="Car Value"
                    value={carValue}
                    onChange={setCarValue}
                    min={5000}
                    max={100000}
                    step={1000}
                    format={(v) => `$${v.toLocaleString()}`}
                  />
                  <SliderInput
                    label="Annual Mileage"
                    value={mileage}
                    onChange={setMileage}
                    min={1000}
                    max={30000}
                    step={1000}
                    format={(v) => `${v.toLocaleString()} mi`}
                  />
                  <SliderInput
                    label="Driver Age"
                    value={driverAge}
                    onChange={setDriverAge}
                    min={16}
                    max={90}
                    step={1}
                    format={(v) => `${v} years`}
                  />
                  <ToggleInput
                    label="Safe Driver?"
                    description="No accidents in 3 years"
                    value={safeDriver}
                    onChange={setSafeDriver}
                  />
                </>
              )}

              {insuranceType === "HOME" && (
                <>
                  <SliderInput
                    label="Home Value"
                    value={homeValue}
                    onChange={setHomeValue}
                    min={50000}
                    max={1000000}
                    step={10000}
                    format={(v) => `$${v.toLocaleString()}`}
                  />
                  <SliderInput
                    label="Home Age"
                    value={homeAge}
                    onChange={setHomeAge}
                    min={0}
                    max={100}
                    step={1}
                    format={(v) => `${v} years`}
                  />
                  <ToggleInput
                    label="Security System?"
                    description="Alarm or monitoring system"
                    value={securitySystem}
                    onChange={setSecuritySystem}
                  />
                </>
              )}

              {insuranceType === "HEALTH" && (
                <>
                  <SliderInput
                    label="Number of People"
                    value={numberOfPeople}
                    onChange={setNumberOfPeople}
                    min={1}
                    max={10}
                    step={1}
                    format={(v) => `${v} ${v === 1 ? "person" : "people"}`}
                  />
                  <SelectInput
                    label="Age Range"
                    value={ageRange}
                    onChange={setAgeRange}
                    options={[
                      { value: "18-30", label: "18-30 years" },
                      { value: "31-45", label: "31-45 years" },
                      { value: "46-60", label: "46-60 years" },
                      { value: "60+", label: "60+ years" },
                    ]}
                  />
                  <ToggleInput
                    label="Pre-existing Conditions?"
                    description="Any chronic health issues"
                    value={preExisting}
                    onChange={setPreExisting}
                  />
                </>
              )}

              {insuranceType === "TRAVEL" && (
                <>
                  <SliderInput
                    label="Trip Duration"
                    value={tripDuration}
                    onChange={setTripDuration}
                    min={1}
                    max={90}
                    step={1}
                    format={(v) => `${v} ${v === 1 ? "day" : "days"}`}
                  />
                  <SliderInput
                    label="Number of Travelers"
                    value={travelers}
                    onChange={setTravelers}
                    min={1}
                    max={10}
                    step={1}
                    format={(v) => `${v} ${v === 1 ? "traveler" : "travelers"}`}
                  />
                  <SelectInput
                    label="Trip Type"
                    value={tripType}
                    onChange={setTripType}
                    options={[
                      { value: "leisure", label: "Leisure" },
                      { value: "business", label: "Business" },
                    ]}
                  />
                </>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Coverage Level */}
          <div>
            <label className="block font-medium text-brand-text-primary mb-3">Coverage Level</label>
            <div className="grid grid-cols-3 gap-2">
              {(["basic", "standard", "premium"] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => setCoverage(level)}
                  className={`py-2 px-4 rounded-xl text-sm font-bold capitalize transition-all ${
                    coverage === level
                      ? "bg-brand-primary text-white shadow-md"
                      : "bg-brand-neutral-subtle text-brand-text-secondary hover:bg-brand-neutral"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Result */}
        <div className="flex flex-col items-center justify-center bg-brand-neutral-subtle rounded-3xl p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-primary to-brand-secondary" />

          <p className="text-brand-text-secondary font-medium mb-4">Estimated Monthly Premium</p>

          <div className="relative mb-6">
            <motion.div
              key={premium}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-6xl font-bold text-brand-text-primary flex items-start justify-center"
            >
              <span className="text-3xl mt-2 mr-1 text-brand-text-secondary">$</span>
              {premium}
            </motion.div>
          </div>

          <div className="space-y-2 w-full">
            <div className="flex justify-between text-sm">
              <span className="text-brand-text-secondary">Insurance Type</span>
              <span className="font-medium capitalize">{insuranceType.toLowerCase()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-brand-text-secondary">Coverage Level</span>
              <span className="font-medium capitalize">{coverage}</span>
            </div>
            <div className="h-px bg-brand-border my-2" />
            <div className="flex justify-between text-sm font-bold text-brand-primary">
              <span>Total / Year</span>
              <span>${(premium * 12).toLocaleString()}</span>
            </div>
          </div>

          <button className="w-full mt-8 bg-brand-primary text-white font-bold py-3 px-6 rounded-xl hover:bg-brand-primary-light transition-colors shadow-lg flex items-center justify-center gap-2">
            Get Official Quote
            <FiDollarSign />
          </button>

          <p className="text-xs text-brand-text-secondary mt-4 flex items-center gap-1">
            <FiInfo /> Estimate only. Final rate may vary.
          </p>
        </div>
      </div>
    </div>
  );
}

// Helper Components
function SliderInput({
  label,
  value,
  onChange,
  min,
  max,
  step,
  format,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  format: (value: number) => string;
}) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <label className="font-medium text-brand-text-primary">{label}</label>
        <span className="font-bold text-brand-primary">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-brand-neutral-subtle rounded-lg appearance-none cursor-pointer accent-brand-primary"
      />
    </div>
  );
}

function ToggleInput({
  label,
  description,
  value,
  onChange,
}: {
  label: string;
  description: string;
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between bg-brand-neutral-subtle p-4 rounded-xl border border-brand-border">
      <div>
        <span className="block font-bold text-brand-text-primary">{label}</span>
        <span className="text-xs text-brand-text-secondary">{description}</span>
      </div>
      <button
        onClick={() => onChange(!value)}
        className={`w-12 h-6 rounded-full transition-colors relative ${
          value ? "bg-green-500" : "bg-gray-300"
        }`}
      >
        <div
          className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
            value ? "left-7" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}

function SelectInput({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="block font-medium text-brand-text-primary mb-2">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-3 rounded-xl border border-brand-border bg-white text-brand-text-primary font-medium focus:outline-none focus:ring-2 focus:ring-brand-primary"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
