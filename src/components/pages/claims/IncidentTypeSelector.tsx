"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiTruck, FiHome, FiHeart } from "react-icons/fi";

interface IncidentTypeSelectorProps {
  selectedType: "car" | "home" | "health" | null;
  onSelect: (type: "car" | "home" | "health") => void;
}

const incidentTypes = [
  {
    id: "car" as const,
    icon: FiTruck,
    label: "Motor/Vehicle",
    description: "Accidents, theft, or damage to your vehicle",
    color: "#a3161b",
  },
  {
    id: "home" as const,
    icon: FiHome,
    label: "Home/Property",
    description: "Fire, burglary, or property damage",
    color: "#d97706",
  },
  {
    id: "health" as const,
    icon: FiHeart,
    label: "Health/Medical",
    description: "Medical emergencies or health-related claims",
    color: "#059669",
  },
];

export default function IncidentTypeSelector({
  selectedType,
  onSelect,
}: IncidentTypeSelectorProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-brand-text-primary mb-2">
          What type of incident occurred?
        </h3>
        <p className="text-brand-text-secondary">
          Select the category that best describes your claim
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {incidentTypes.map((type) => {
          const Icon = type.icon;
          const isSelected = selectedType === type.id;

          return (
            <motion.button
              key={type.id}
              type="button"
              onClick={() => onSelect(type.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative p-6 rounded-2xl border-2 transition-all text-left ${
                isSelected
                  ? "border-brand-primary bg-brand-primary/5 shadow-lg"
                  : "border-brand-border bg-white hover:border-brand-primary/50 hover:shadow-md"
              }`}
            >
              {/* Selection Indicator */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-4 right-4 w-6 h-6 bg-brand-primary rounded-full flex items-center justify-center"
                >
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.div>
              )}

              {/* Icon */}
              <div
                className={`inline-flex items-center justify-center w-14 h-14 rounded-full mb-4 ${
                  isSelected ? "bg-brand-primary" : "bg-brand-primary/10"
                }`}
              >
                <Icon
                  className={`w-7 h-7 ${
                    isSelected ? "text-white" : "text-brand-primary"
                  }`}
                />
              </div>

              {/* Content */}
              <h4
                className={`text-lg font-bold mb-2 ${
                  isSelected ? "text-brand-primary" : "text-brand-text-primary"
                }`}
              >
                {type.label}
              </h4>
              <p className="text-sm text-brand-text-secondary">{type.description}</p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
