// Risk Assessment Data for Uganda Districts
// This file contains comprehensive risk factor data for major districts across Uganda

export type RiskLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type RiskCategory = 'Low' | 'Medium' | 'High' | 'Critical';
export type Region = 'Central' | 'Eastern' | 'Northern' | 'Western';

export interface RiskFactors {
  flood: RiskLevel;
  theft: RiskLevel;
  fire: RiskLevel;
  naturalDisasters: RiskLevel;
}

export interface DistrictRiskData {
  id: string;
  name: string;
  region: Region;
  coordinates: {
    lat: number;
    lng: number;
  };
  population: number;
  urbanization: number; // 0-100 percentage
  riskFactors: RiskFactors;
  recommendedProducts: string[];
  description: string;
}

// Comprehensive district data with realistic risk assessments
export const ugandaDistricts: DistrictRiskData[] = [
  {
    id: 'kampala',
    name: 'Kampala',
    region: 'Central',
    coordinates: { lat: 0.3476, lng: 32.5825 },
    population: 1680000,
    urbanization: 100,
    riskFactors: {
      flood: 6,
      theft: 8,
      fire: 7,
      naturalDisasters: 4,
    },
    recommendedProducts: ['motor', 'fire', 'gpa', 'travel'],
    description: 'Capital city with high urbanization, significant theft risk, and flood-prone areas during heavy rains.',
  },
  {
    id: 'wakiso',
    name: 'Wakiso',
    region: 'Central',
    coordinates: { lat: 0.4044, lng: 32.4594 },
    population: 2007700,
    urbanization: 75,
    riskFactors: {
      flood: 5,
      theft: 7,
      fire: 6,
      naturalDisasters: 4,
    },
    recommendedProducts: ['motor', 'fire', 'home'],
    description: 'Rapidly growing district surrounding Kampala with moderate to high urban risks.',
  },
  {
    id: 'mukono',
    name: 'Mukono',
    region: 'Central',
    coordinates: { lat: 0.3536, lng: 32.7554 },
    population: 596804,
    urbanization: 60,
    riskFactors: {
      flood: 4,
      theft: 6,
      fire: 5,
      naturalDisasters: 3,
    },
    recommendedProducts: ['motor', 'home', 'fire'],
    description: 'Semi-urban district with moderate risk levels across all categories.',
  },
  {
    id: 'jinja',
    name: 'Jinja',
    region: 'Eastern',
    coordinates: { lat: 0.4244, lng: 33.2041 },
    population: 471242,
    urbanization: 70,
    riskFactors: {
      flood: 7,
      theft: 6,
      fire: 6,
      naturalDisasters: 5,
    },
    recommendedProducts: ['motor', 'fire', 'home'],
    description: 'Industrial city near Lake Victoria with elevated flood risk due to proximity to water bodies.',
  },
  {
    id: 'mbale',
    name: 'Mbale',
    region: 'Eastern',
    coordinates: { lat: 1.0820, lng: 34.1751 },
    population: 488965,
    urbanization: 55,
    riskFactors: {
      flood: 5,
      theft: 5,
      fire: 5,
      naturalDisasters: 7,
    },
    recommendedProducts: ['home', 'fire', 'motor'],
    description: 'Located near Mount Elgon with high risk of landslides and natural disasters.',
  },
  {
    id: 'gulu',
    name: 'Gulu',
    region: 'Northern',
    coordinates: { lat: 2.7742, lng: 32.2992 },
    population: 152276,
    urbanization: 50,
    riskFactors: {
      flood: 6,
      theft: 5,
      fire: 6,
      naturalDisasters: 5,
    },
    recommendedProducts: ['motor', 'fire', 'home'],
    description: 'Northern regional hub with seasonal flooding during rainy seasons.',
  },
  {
    id: 'lira',
    name: 'Lira',
    region: 'Northern',
    coordinates: { lat: 2.2499, lng: 32.8987 },
    population: 408043,
    urbanization: 45,
    riskFactors: {
      flood: 5,
      theft: 4,
      fire: 5,
      naturalDisasters: 4,
    },
    recommendedProducts: ['motor', 'home', 'fire'],
    description: 'Agricultural district with moderate risk levels and seasonal weather patterns.',
  },
  {
    id: 'mbarara',
    name: 'Mbarara',
    region: 'Western',
    coordinates: { lat: -0.6103, lng: 30.6587 },
    population: 472629,
    urbanization: 65,
    riskFactors: {
      flood: 4,
      theft: 6,
      fire: 6,
      naturalDisasters: 4,
    },
    recommendedProducts: ['motor', 'fire', 'home'],
    description: 'Western regional commercial center with moderate urban risks.',
  },
  {
    id: 'fort-portal',
    name: 'Fort Portal',
    region: 'Western',
    coordinates: { lat: 0.6710, lng: 30.2748 },
    population: 54375,
    urbanization: 55,
    riskFactors: {
      flood: 3,
      theft: 4,
      fire: 5,
      naturalDisasters: 5,
    },
    recommendedProducts: ['home', 'motor', 'fire'],
    description: 'Tourism hub near Rwenzori Mountains with moderate natural disaster risk.',
  },
  {
    id: 'kasese',
    name: 'Kasese',
    region: 'Western',
    coordinates: { lat: 0.1833, lng: 30.0833 },
    population: 694987,
    urbanization: 40,
    riskFactors: {
      flood: 8,
      theft: 4,
      fire: 5,
      naturalDisasters: 8,
    },
    recommendedProducts: ['home', 'fire', 'motor'],
    description: 'High flood risk from rivers and Lake George, plus landslide risk from mountains.',
  },
  {
    id: 'hoima',
    name: 'Hoima',
    region: 'Western',
    coordinates: { lat: 1.4331, lng: 31.3522 },
    population: 572986,
    urbanization: 45,
    riskFactors: {
      flood: 4,
      theft: 5,
      fire: 6,
      naturalDisasters: 4,
    },
    recommendedProducts: ['motor', 'fire', 'home'],
    description: 'Oil-rich district with growing industrial and fire risks.',
  },
  {
    id: 'masaka',
    name: 'Masaka',
    region: 'Central',
    coordinates: { lat: -0.3376, lng: 31.7340 },
    population: 333865,
    urbanization: 50,
    riskFactors: {
      flood: 5,
      theft: 5,
      fire: 5,
      naturalDisasters: 3,
    },
    recommendedProducts: ['motor', 'home', 'fire'],
    description: 'Commercial town with balanced risk profile across all categories.',
  },
  {
    id: 'soroti',
    name: 'Soroti',
    region: 'Eastern',
    coordinates: { lat: 1.7145, lng: 33.6111 },
    population: 273284,
    urbanization: 40,
    riskFactors: {
      flood: 6,
      theft: 4,
      fire: 5,
      naturalDisasters: 5,
    },
    recommendedProducts: ['home', 'motor', 'fire'],
    description: 'Eastern district with seasonal flooding and moderate overall risks.',
  },
  {
    id: 'arua',
    name: 'Arua',
    region: 'Northern',
    coordinates: { lat: 3.0197, lng: 30.9111 },
    population: 782077,
    urbanization: 50,
    riskFactors: {
      flood: 5,
      theft: 5,
      fire: 6,
      naturalDisasters: 4,
    },
    recommendedProducts: ['motor', 'fire', 'home'],
    description: 'West Nile regional center with moderate risk levels.',
  },
  {
    id: 'kabale',
    name: 'Kabale',
    region: 'Western',
    coordinates: { lat: -1.2480, lng: 29.9894 },
    population: 517176,
    urbanization: 35,
    riskFactors: {
      flood: 3,
      theft: 3,
      fire: 5,
      naturalDisasters: 6,
    },
    recommendedProducts: ['home', 'fire', 'motor'],
    description: 'Mountainous terrain with landslide risk but lower theft and flood risks.',
  },
  {
    id: 'entebbe',
    name: 'Entebbe',
    region: 'Central',
    coordinates: { lat: 0.0560, lng: 32.4795 },
    population: 69958,
    urbanization: 90,
    riskFactors: {
      flood: 6,
      theft: 7,
      fire: 6,
      naturalDisasters: 4,
    },
    recommendedProducts: ['motor', 'fire', 'travel', 'home'],
    description: 'Airport city on Lake Victoria peninsula with flood and urban crime risks.',
  },
  {
    id: 'tororo',
    name: 'Tororo',
    region: 'Eastern',
    coordinates: { lat: 0.6928, lng: 34.1808 },
    population: 517080,
    urbanization: 45,
    riskFactors: {
      flood: 5,
      theft: 4,
      fire: 5,
      naturalDisasters: 5,
    },
    recommendedProducts: ['motor', 'home', 'fire'],
    description: 'Border town with moderate risk profile and industrial activity.',
  },
  {
    id: 'mubende',
    name: 'Mubende',
    region: 'Central',
    coordinates: { lat: 0.5833, lng: 31.3950 },
    population: 766251,
    urbanization: 30,
    riskFactors: {
      flood: 4,
      theft: 4,
      fire: 5,
      naturalDisasters: 4,
    },
    recommendedProducts: ['home', 'motor', 'fire'],
    description: 'Rural district with lower urbanization and balanced risk factors.',
  },
  {
    id: 'iganga',
    name: 'Iganga',
    region: 'Eastern',
    coordinates: { lat: 0.6092, lng: 33.4689 },
    population: 582589,
    urbanization: 35,
    riskFactors: {
      flood: 6,
      theft: 4,
      fire: 5,
      naturalDisasters: 4,
    },
    recommendedProducts: ['home', 'motor', 'fire'],
    description: 'Agricultural district with moderate flood risk during rainy seasons.',
  },
  {
    id: 'kitgum',
    name: 'Kitgum',
    region: 'Northern',
    coordinates: { lat: 3.2817, lng: 32.8864 },
    population: 296763,
    urbanization: 30,
    riskFactors: {
      flood: 5,
      theft: 3,
      fire: 4,
      naturalDisasters: 4,
    },
    recommendedProducts: ['home', 'motor', 'fire'],
    description: 'Northern district with lower crime rates and moderate environmental risks.',
  },
];

// National average risk levels for comparison
export const nationalAverage: RiskFactors = {
  flood: 5,
  theft: 5,
  fire: 5,
  naturalDisasters: 5,
};

// Risk factor descriptions
export const riskFactorInfo = {
  flood: {
    name: 'Flood Risk',
    icon: 'Droplets',
    description: 'Risk of property damage from flooding during heavy rains or overflow from water bodies.',
    protectionTips: [
      'Consider comprehensive home insurance',
      'Ensure proper drainage systems',
      'Keep important documents in waterproof containers',
      'Have an emergency evacuation plan',
    ],
  },
  theft: {
    name: 'Theft & Burglary',
    icon: 'ShieldAlert',
    description: 'Risk of property theft, burglary, and vehicle-related crimes.',
    protectionTips: [
      'Install security systems and CCTV cameras',
      'Use vehicle tracking devices',
      'Secure perimeter fencing',
      'Join neighborhood watch programs',
    ],
  },
  fire: {
    name: 'Fire Risk',
    icon: 'Flame',
    description: 'Risk of fire damage to property from electrical faults, cooking accidents, or wildfires.',
    protectionTips: [
      'Install smoke detectors and fire extinguishers',
      'Regular electrical system maintenance',
      'Avoid overloading electrical outlets',
      'Have a fire evacuation plan',
    ],
  },
  naturalDisasters: {
    name: 'Natural Disasters',
    icon: 'CloudRain',
    description: 'Risk from landslides, earthquakes, severe storms, and other natural phenomena.',
    protectionTips: [
      'Avoid building on steep slopes',
      'Reinforce building structures',
      'Monitor weather forecasts',
      'Have emergency supplies ready',
    ],
  },
};

// Product mapping to risk factors
export const productRiskMapping = {
  motor: ['theft', 'fire'],
  home: ['flood', 'fire', 'theft', 'naturalDisasters'],
  fire: ['fire', 'naturalDisasters'],
  gpa: ['naturalDisasters'],
  travel: ['theft', 'naturalDisasters'],
};
