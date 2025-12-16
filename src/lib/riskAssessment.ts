// Risk Assessment Utility Functions
// Provides calculation and analysis functions for district risk assessment

import {
  DistrictRiskData,
  RiskFactors,
  RiskLevel,
  RiskCategory,
  ugandaDistricts,
  nationalAverage,
  riskFactorInfo,
  productRiskMapping,
} from './data/riskAssessmentData';

/**
 * Calculate overall risk score for a district (0-100)
 */
export function calculateOverallRisk(riskFactors: RiskFactors): number {
  const { flood, theft, fire, naturalDisasters } = riskFactors;
  const total = flood + theft + fire + naturalDisasters;
  const maxPossible = 40; // 4 factors × 10 max each
  return Math.round((total / maxPossible) * 100);
}

/**
 * Convert numeric risk score to category
 */
export function getRiskCategory(score: RiskLevel): RiskCategory {
  if (score <= 3) return 'Low';
  if (score <= 5) return 'Medium';
  if (score <= 7) return 'High';
  return 'Critical';
}

/**
 * Get color code for risk level visualization
 */
export function getRiskColor(score: RiskLevel): string {
  if (score <= 3) return '#059669'; // Green
  if (score <= 5) return '#d97706'; // Amber
  if (score <= 7) return '#ea580c'; // Orange
  return '#a3161b'; // Crimson (brand primary)
}

/**
 * Get background color for risk level (lighter shade)
 */
export function getRiskBackgroundColor(score: RiskLevel): string {
  if (score <= 3) return '#d1fae5'; // Light green
  if (score <= 5) return '#fef3c7'; // Light amber
  if (score <= 7) return '#fed7aa'; // Light orange
  return '#fecaca'; // Light red
}

/**
 * Get district by ID
 */
export function getDistrictById(id: string): DistrictRiskData | undefined {
  return ugandaDistricts.find((district) => district.id === id);
}

/**
 * Get all districts in a specific region
 */
export function getDistrictsByRegion(region: string): DistrictRiskData[] {
  return ugandaDistricts.filter((district) => district.region === region);
}

/**
 * Get protection recommendations based on risk profile
 */
export function getProtectionRecommendations(
  district: DistrictRiskData
): {
  product: string;
  priority: number;
  reasons: string[];
  relevantRisks: string[];
}[] {
  const recommendations: {
    product: string;
    priority: number;
    reasons: string[];
    relevantRisks: string[];
  }[] = [];

  // Analyze each recommended product
  district.recommendedProducts.forEach((product) => {
    const relevantRisks: string[] = [];
    let priorityScore = 0;

    // Check which risk factors this product addresses
    const productRisks = productRiskMapping[product as keyof typeof productRiskMapping] || [];

    productRisks.forEach((riskType) => {
      const riskValue = district.riskFactors[riskType as keyof RiskFactors];
      if (riskValue >= 6) {
        relevantRisks.push(riskType);
        priorityScore += riskValue * 2; // High risk = higher priority
      } else if (riskValue >= 4) {
        relevantRisks.push(riskType);
        priorityScore += riskValue;
      }
    });

    // Generate reasons based on risk levels
    const reasons: string[] = [];
    
    if (product === 'motor') {
      if (district.riskFactors.theft >= 6) {
        reasons.push('High vehicle theft risk in this area');
      }
      if (district.urbanization >= 70) {
        reasons.push('Heavy traffic increases accident risk');
      }
      if (district.riskFactors.fire >= 6) {
        reasons.push('Elevated fire risk for vehicles');
      }
    }

    if (product === 'home' || product === 'fire') {
      if (district.riskFactors.flood >= 6) {
        reasons.push('Significant flood risk during rainy seasons');
      }
      if (district.riskFactors.fire >= 6) {
        reasons.push('High fire risk in this district');
      }
      if (district.riskFactors.theft >= 6) {
        reasons.push('Burglary and theft concerns');
      }
      if (district.riskFactors.naturalDisasters >= 6) {
        reasons.push('Natural disaster protection needed');
      }
    }

    if (product === 'gpa') {
      if (district.urbanization >= 70) {
        reasons.push('Urban workplace safety coverage');
      }
      if (district.riskFactors.naturalDisasters >= 5) {
        reasons.push('Protection against accidents from natural events');
      }
    }

    if (product === 'travel') {
      if (district.name === 'Entebbe' || district.name === 'Kampala') {
        reasons.push('Major travel hub with international connections');
      }
    }

    if (reasons.length === 0) {
      reasons.push('Recommended for comprehensive protection');
    }

    recommendations.push({
      product,
      priority: priorityScore,
      reasons,
      relevantRisks,
    });
  });

  // Sort by priority (highest first)
  return recommendations.sort((a, b) => b.priority - a.priority);
}

/**
 * Compare district risk with national average
 */
export function compareWithNationalAverage(district: DistrictRiskData): {
  riskType: string;
  districtScore: RiskLevel;
  nationalScore: RiskLevel;
  difference: number;
  status: 'above' | 'below' | 'equal';
}[] {
  const comparison: {
    riskType: string;
    districtScore: RiskLevel;
    nationalScore: RiskLevel;
    difference: number;
    status: 'above' | 'below' | 'equal';
  }[] = [];

  Object.keys(district.riskFactors).forEach((key) => {
    const riskType = key as keyof RiskFactors;
    const districtScore = district.riskFactors[riskType];
    const nationalScore = nationalAverage[riskType];
    const difference = districtScore - nationalScore;

    comparison.push({
      riskType,
      districtScore,
      nationalScore,
      difference,
      status: difference > 0 ? 'above' : difference < 0 ? 'below' : 'equal',
    });
  });

  return comparison;
}

/**
 * Get top N highest risk districts for a specific risk factor
 */
export function getHighestRiskDistricts(
  riskType: keyof RiskFactors,
  limit: number = 5
): DistrictRiskData[] {
  return [...ugandaDistricts]
    .sort((a, b) => b.riskFactors[riskType] - a.riskFactors[riskType])
    .slice(0, limit);
}

/**
 * Get top N safest districts for a specific risk factor
 */
export function getSafestDistricts(
  riskType: keyof RiskFactors,
  limit: number = 5
): DistrictRiskData[] {
  return [...ugandaDistricts]
    .sort((a, b) => a.riskFactors[riskType] - b.riskFactors[riskType])
    .slice(0, limit);
}

/**
 * Search districts by name
 */
export function searchDistricts(query: string): DistrictRiskData[] {
  const lowerQuery = query.toLowerCase();
  return ugandaDistricts.filter((district) =>
    district.name.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Get risk factor information
 */
export function getRiskFactorInfo(riskType: keyof RiskFactors) {
  return riskFactorInfo[riskType];
}

/**
 * Format risk score as percentage
 */
export function formatRiskPercentage(score: RiskLevel): string {
  return `${(score / 10) * 100}%`;
}

/**
 * Get all districts sorted by overall risk
 */
export function getDistrictsByOverallRisk(): DistrictRiskData[] {
  return [...ugandaDistricts].sort((a, b) => {
    const scoreA = calculateOverallRisk(a.riskFactors);
    const scoreB = calculateOverallRisk(b.riskFactors);
    return scoreB - scoreA;
  });
}

/**
 * Get heatmap data for visualization
 */
export function getHeatmapData(): {
  district: string;
  overallRisk: number;
  color: string;
  region: string;
}[] {
  return ugandaDistricts.map((district) => {
    const overallRisk = calculateOverallRisk(district.riskFactors);
    return {
      district: district.name,
      overallRisk,
      color: getRiskColor(Math.round((overallRisk / 100) * 10) as RiskLevel),
      region: district.region,
    };
  });
}
