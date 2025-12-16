/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { PremiumBreakdown } from "@/lib/premiumCalculations";

interface PremiumBreakdownChartProps {
  breakdown: PremiumBreakdown;
}

const COLORS = ["#a3161b", "#d97706", "#059669", "#2563eb"];

export default function PremiumBreakdownChart({
  breakdown,
}: PremiumBreakdownChartProps) {
  // Filter out components with zero or negative values for the chart
  const chartData = breakdown.components
    .filter((comp) => comp.value > 0)
    .map((comp) => ({
      name: comp.label,
      value: comp.value,
      percentage: comp.percentage,
    }));

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-UG", {
      style: "currency",
      currency: "UGX",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-brand-border">
          <p className="font-bold text-brand-text-primary">{payload[0].name}</p>
          <p className="text-brand-primary font-bold">
            {formatCurrency(payload[0].value)}
          </p>
          <p className="text-sm text-brand-text-secondary">
            {payload[0].payload.percentage.toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-brand-border">
      <h3 className="text-lg font-bold text-brand-text-primary mb-4">
        Premium Breakdown
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
            animationBegin={0}
            animationDuration={800}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value, entry: any) => (
              <span className="text-sm text-brand-text-primary">
                {value}: {formatCurrency(entry.payload.value)}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Breakdown List */}
      <div className="mt-6 space-y-2">
        {breakdown.components.map((comp, index) => (
          <div
            key={index}
            className="flex justify-between items-center text-sm"
          >
            <span className="text-brand-text-secondary">{comp.label}</span>
            <span
              className={`font-bold ${
                comp.value < 0 ? "text-green-600" : "text-brand-text-primary"
              }`}
            >
              {formatCurrency(comp.value)}
            </span>
          </div>
        ))}
        <div className="pt-2 border-t border-brand-border flex justify-between items-center font-bold">
          <span className="text-brand-text-primary">Total Premium</span>
          <span className="text-brand-primary text-lg">
            {formatCurrency(breakdown.total)}
          </span>
        </div>
      </div>
    </div>
  );
}
