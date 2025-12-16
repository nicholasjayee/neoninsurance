"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";

interface WizardStepperProps {
  currentStep: number;
  steps: string[];
}

export default function WizardStepper({
  currentStep,
  steps,
}: WizardStepperProps) {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between relative">
        {/* Progress Line */}
        <div className="absolute top-5 left-0 right-0 h-1 bg-brand-border -z-10">
          <motion.div
            className="h-full bg-brand-primary"
            initial={{ width: "0%" }}
            animate={{
              width: `${(currentStep / (steps.length - 1)) * 100}%`,
            }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Steps */}
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          // const isUpcoming = index > currentStep;

          return (
            <div key={index} className="flex flex-col items-center relative">
              {/* Circle */}
              <motion.div
                initial={false}
                animate={{
                  scale: isCurrent ? 1.1 : 1,
                  backgroundColor:
                    isCompleted || isCurrent ? "#a3161b" : "#ffffff",
                  borderColor: isCompleted || isCurrent ? "#a3161b" : "#fde68a",
                }}
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                  isCompleted || isCurrent
                    ? "text-white"
                    : "text-brand-text-secondary"
                } bg-white shadow-md`}
              >
                {isCompleted ? (
                  <FiCheck className="w-5 h-5" />
                ) : (
                  <span className="font-bold">{index + 1}</span>
                )}
              </motion.div>

              {/* Label */}
              <span
                className={`mt-2 text-xs md:text-sm font-medium text-center max-w-20 md:max-w-none ${
                  isCurrent
                    ? "text-brand-primary"
                    : isCompleted
                    ? "text-brand-text-primary"
                    : "text-brand-text-secondary"
                }`}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
