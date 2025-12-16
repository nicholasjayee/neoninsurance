// Premium calculation functions for different insurance types

export interface MotorPremiumParams {
  vehicleValue: number;
  vehicleAge: number;
  driverAge: number;
  yearsExperience: number;
  location: "kampala" | "other";
  hasTracking?: boolean;
}

export interface HomePremiumParams {
  propertyValue: number;
  propertyType: "house" | "apartment" | "commercial";
  hasSecurity: boolean;
  location: "kampala" | "other";
  constructionType: "permanent" | "semi-permanent";
}

export interface HealthPremiumParams {
  age: number;
  coverageLevel: "basic" | "standard" | "premium";
  familySize: number;
  hasPreExisting: boolean;
  includesMaternity: boolean;
}

export interface TravelPremiumParams {
  tripCost: number;
  destination: "regional" | "international";
  duration: number;
  coverageType: "medical" | "comprehensive";
  travelers: number;
}

export interface PremiumBreakdown {
  basePremium: number;
  riskFactors: number;
  discounts: number;
  taxes: number;
  total: number;
  components: {
    label: string;
    value: number;
    percentage: number;
  }[];
}

// Motor Insurance Calculation
export function calculateMotorPremium(params: MotorPremiumParams): PremiumBreakdown {
  // Base premium: 5% of vehicle value
  const basePremium = params.vehicleValue * 0.05;

  // Risk factors
  let riskMultiplier = 1;

  // Vehicle age factor (older = higher risk)
  if (params.vehicleAge > 10) riskMultiplier += 0.3;
  else if (params.vehicleAge > 5) riskMultiplier += 0.15;

  // Driver age factor (younger = higher risk)
  if (params.driverAge < 25) riskMultiplier += 0.4;
  else if (params.driverAge < 30) riskMultiplier += 0.2;
  else if (params.driverAge > 65) riskMultiplier += 0.15;

  // Experience factor (less experience = higher risk)
  if (params.yearsExperience < 2) riskMultiplier += 0.3;
  else if (params.yearsExperience < 5) riskMultiplier += 0.15;

  // Location factor
  if (params.location === "kampala") riskMultiplier += 0.1;

  const riskFactors = basePremium * (riskMultiplier - 1);

  // Discounts
  let discountAmount = 0;
  if (params.hasTracking) {
    discountAmount = (basePremium + riskFactors) * 0.1; // 10% discount for tracking
  }

  // Taxes (18% VAT)
  const subtotal = basePremium + riskFactors - discountAmount;
  const taxes = subtotal * 0.18;

  const total = subtotal + taxes;

  return {
    basePremium,
    riskFactors,
    discounts: discountAmount,
    taxes,
    total,
    components: [
      { label: "Base Premium", value: basePremium, percentage: (basePremium / total) * 100 },
      { label: "Risk Factors", value: riskFactors, percentage: (riskFactors / total) * 100 },
      { label: "Discounts", value: -discountAmount, percentage: (-discountAmount / total) * 100 },
      { label: "Taxes (18%)", value: taxes, percentage: (taxes / total) * 100 },
    ],
  };
}

// Home Insurance Calculation
export function calculateHomePremium(params: HomePremiumParams): PremiumBreakdown {
  // Base premium: 0.3% of property value
  const basePremium = params.propertyValue * 0.003;

  // Risk factors
  let riskMultiplier = 1;

  // Property type factor
  if (params.propertyType === "commercial") riskMultiplier += 0.5;
  else if (params.propertyType === "apartment") riskMultiplier += 0.1;

  // Construction type factor
  if (params.constructionType === "semi-permanent") riskMultiplier += 0.3;

  // Location factor
  if (params.location === "kampala") riskMultiplier += 0.15;

  const riskFactors = basePremium * (riskMultiplier - 1);

  // Discounts
  let discountAmount = 0;
  if (params.hasSecurity) {
    discountAmount = (basePremium + riskFactors) * 0.15; // 15% discount for security
  }

  // Taxes (18% VAT)
  const subtotal = basePremium + riskFactors - discountAmount;
  const taxes = subtotal * 0.18;

  const total = subtotal + taxes;

  return {
    basePremium,
    riskFactors,
    discounts: discountAmount,
    taxes,
    total,
    components: [
      { label: "Base Premium", value: basePremium, percentage: (basePremium / total) * 100 },
      { label: "Risk Factors", value: riskFactors, percentage: (riskFactors / total) * 100 },
      { label: "Discounts", value: -discountAmount, percentage: (-discountAmount / total) * 100 },
      { label: "Taxes (18%)", value: taxes, percentage: (taxes / total) * 100 },
    ],
  };
}

// Health Insurance Calculation
export function calculateHealthPremium(params: HealthPremiumParams): PremiumBreakdown {
  // Base premium based on age
  let basePremium = 500000; // Base for age 18-30
  if (params.age > 60) basePremium = 1500000;
  else if (params.age > 50) basePremium = 1200000;
  else if (params.age > 40) basePremium = 900000;
  else if (params.age > 30) basePremium = 700000;

  // Coverage level multiplier
  let coverageMultiplier = 1;
  if (params.coverageLevel === "premium") coverageMultiplier = 2.5;
  else if (params.coverageLevel === "standard") coverageMultiplier = 1.5;

  basePremium *= coverageMultiplier;

  // Risk factors
  let riskFactors = 0;

  // Family size (additional members)
  if (params.familySize > 1) {
    riskFactors += basePremium * 0.5 * (params.familySize - 1);
  }

  // Pre-existing conditions
  if (params.hasPreExisting) {
    riskFactors += basePremium * 0.3;
  }

  // Maternity coverage
  if (params.includesMaternity) {
    riskFactors += basePremium * 0.25;
  }

  // Taxes (18% VAT)
  const subtotal = basePremium + riskFactors;
  const taxes = subtotal * 0.18;

  const total = subtotal + taxes;

  return {
    basePremium,
    riskFactors,
    discounts: 0,
    taxes,
    total,
    components: [
      { label: "Base Premium", value: basePremium, percentage: (basePremium / total) * 100 },
      { label: "Additional Coverage", value: riskFactors, percentage: (riskFactors / total) * 100 },
      { label: "Taxes (18%)", value: taxes, percentage: (taxes / total) * 100 },
    ],
  };
}

// Travel Insurance Calculation
export function calculateTravelPremium(params: TravelPremiumParams): PremiumBreakdown {
  // Base premium: 8% of trip cost
  let basePremium = params.tripCost * 0.08;

  // Minimum premium
  if (basePremium < 50000) basePremium = 50000;

  // Risk factors
  let riskMultiplier = 1;

  // Destination factor
  if (params.destination === "international") riskMultiplier += 0.5;

  // Duration factor (longer trips = higher risk)
  if (params.duration > 30) riskMultiplier += 0.4;
  else if (params.duration > 14) riskMultiplier += 0.2;

  // Coverage type factor
  if (params.coverageType === "comprehensive") riskMultiplier += 0.6;

  // Number of travelers
  const travelerMultiplier = params.travelers;

  const riskFactors = basePremium * (riskMultiplier - 1) * travelerMultiplier;

  // Taxes (18% VAT)
  const subtotal = (basePremium + riskFactors) * travelerMultiplier;
  const taxes = subtotal * 0.18;

  const total = subtotal + taxes;

  return {
    basePremium: basePremium * travelerMultiplier,
    riskFactors,
    discounts: 0,
    taxes,
    total,
    components: [
      { label: "Base Premium", value: basePremium * travelerMultiplier, percentage: ((basePremium * travelerMultiplier) / total) * 100 },
      { label: "Coverage Factors", value: riskFactors, percentage: (riskFactors / total) * 100 },
      { label: "Taxes (18%)", value: taxes, percentage: (taxes / total) * 100 },
    ],
  };
}

// Format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-UG", {
    style: "currency",
    currency: "UGX",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
