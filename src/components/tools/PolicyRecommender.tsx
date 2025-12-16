"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiArrowLeft, FiCheckCircle } from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

interface QuizQuestion {
  id: string;
  question: string;
  options: { value: string; label: string }[];
}

interface Recommendation {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
}

const quizQuestions: QuizQuestion[] = [
  {
    id: "age",
    question: "What is your age group?",
    options: [
      { value: "18-30", label: "18-30 years" },
      { value: "31-45", label: "31-45 years" },
      { value: "46-60", label: "46-60 years" },
      { value: "60+", label: "60+ years" },
    ],
  },
  {
    id: "assets",
    question: "What assets do you own?",
    options: [
      { value: "vehicle", label: "Vehicle" },
      { value: "property", label: "Property/Home" },
      { value: "business", label: "Business" },
      { value: "none", label: "None of the above" },
    ],
  },
  {
    id: "lifestyle",
    question: "How would you describe your lifestyle?",
    options: [
      { value: "traveler", label: "Frequent Traveler" },
      { value: "commuter", label: "Daily Commuter" },
      { value: "homebody", label: "Mostly at Home" },
      { value: "entrepreneur", label: "Business Owner" },
    ],
  },
  {
    id: "risk",
    question: "What is your risk tolerance?",
    options: [
      { value: "low", label: "Low - I want maximum coverage" },
      { value: "medium", label: "Medium - Balanced coverage" },
      { value: "high", label: "High - Essential coverage only" },
    ],
  },
];

const getRecommendations = (answers: Record<string, string>): Recommendation[] => {
  const recommendations: Recommendation[] = [];

  // Motor Insurance
  if (answers.assets === "vehicle" || answers.lifestyle === "commuter") {
    recommendations.push({
      id: "motor",
      title: "Motor Comprehensive",
      description: "Complete protection for your vehicle against accidents, theft, and third-party liabilities.",
      priority: "high",
    });
  }

  // Travel Insurance
  if (answers.lifestyle === "traveler") {
    recommendations.push({
      id: "travel",
      title: "Travel Insurance",
      description: "Journey with confidence. Coverage for medical emergencies, trip cancellations, and lost luggage.",
      priority: "high",
    });
  }

  // Fire & Burglary
  if (answers.assets === "property" || answers.assets === "business") {
    recommendations.push({
      id: "fire",
      title: "Fire & Burglary",
      description: "Safeguard your home or business premises and valuable contents against specific perils.",
      priority: "high",
    });
  }

  // Group Personal Accident
  if (answers.assets === "business" || answers.lifestyle === "entrepreneur") {
    recommendations.push({
      id: "gpa",
      title: "Group Personal Accident (GPA)",
      description: "Essential employee benefit providing 24-hour coverage against accidental death or disability.",
      priority: "medium",
    });
  }

  // Default recommendations if none match
  if (recommendations.length === 0) {
    recommendations.push({
      id: "motor",
      title: "Motor Comprehensive",
      description: "Our most popular policy for vehicle owners.",
      priority: "medium",
    });
  }

  return recommendations;
};

export default function PolicyRecommender() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentStep < quizQuestions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
  };

  const currentQuestion = quizQuestions[currentStep];
  const recommendations = getRecommendations(answers);
  const isAnswered = answers[currentQuestion?.id];

  return (
    <div className="min-h-screen bg-brand-light py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-text-primary mb-4">
            Get Matched
          </h1>
          <p className="text-xl text-brand-text-secondary">
            Answer a few questions to find your perfect insurance package
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!showResults ? (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-8">
                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-brand-text-secondary">
                      Question {currentStep + 1} of {quizQuestions.length}
                    </span>
                    <span className="text-sm text-brand-text-secondary">
                      {Math.round(((currentStep + 1) / quizQuestions.length) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-brand-neutral-subtle rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-brand-primary to-brand-secondary h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${((currentStep + 1) / quizQuestions.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Question */}
                <h2 className="text-2xl font-bold text-brand-text-primary mb-6">
                  {currentQuestion.question}
                </h2>

                {/* Options */}
                <div className="space-y-3 mb-8">
                  {currentQuestion.options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(currentQuestion.id, option.value)}
                      className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                        answers[currentQuestion.id] === option.value
                          ? "border-brand-primary bg-brand-primary/10"
                          : "border-brand-border hover:border-brand-primary/50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-brand-text-primary">
                          {option.label}
                        </span>
                        {answers[currentQuestion.id] === option.value && (
                          <FiCheckCircle className="text-brand-primary w-5 h-5" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Navigation */}
                <div className="flex justify-between">
                  <Button
                    variant="ghost"
                    onClick={handleBack}
                    disabled={currentStep === 0}
                  >
                    <FiArrowLeft className="mr-2" />
                    Back
                  </Button>
                  <Button onClick={handleNext} disabled={!isAnswered}>
                    {currentStep === quizQuestions.length - 1 ? "See Results" : "Next"}
                    <FiArrowRight className="ml-2" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="p-8">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-primary/10 mb-4">
                    <FiCheckCircle className="w-8 h-8 text-brand-primary" />
                  </div>
                  <h2 className="text-3xl font-bold text-brand-text-primary mb-2">
                    Your Perfect Match
                  </h2>
                  <p className="text-brand-text-secondary">
                    Based on your answers, we recommend the following policies:
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  {recommendations.map((rec, index) => (
                    <motion.div
                      key={rec.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-6 rounded-xl border-2 ${
                        rec.priority === "high"
                          ? "border-brand-primary bg-brand-primary/5"
                          : "border-brand-border"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-bold text-brand-text-primary">
                          {rec.title}
                        </h3>
                        {rec.priority === "high" && (
                          <span className="px-3 py-1 bg-brand-primary text-white text-xs font-bold rounded-full">
                            RECOMMENDED
                          </span>
                        )}
                      </div>
                      <p className="text-brand-text-secondary">{rec.description}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="flex gap-4">
                  <Button variant="ghost" onClick={handleRestart} className="flex-1">
                    Retake Quiz
                  </Button>
                  <Button variant="primary" className="flex-1">
                    Contact Us
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
