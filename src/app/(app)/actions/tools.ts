"use server";

import { prisma } from "@/lib/prisma";

import { unstable_cache } from "next/cache";

export const getPricingFactors = unstable_cache(
  async () => {
    try {
      const factors = await prisma.pricingFactor.findMany();
      // Convert array to object for easier lookup
      const factorMap = factors.reduce((acc: Record<string, number>, factor) => {
        acc[factor.key] = factor.value;
        return acc;
      }, {} as Record<string, number>);
      return { success: true, factors: factorMap };
    } catch (error) {
      console.error("Error fetching pricing factors:", error);
      return { success: false, error: "Failed to fetch pricing factors" };
    }
  },
  ["pricing-factors"],
  { revalidate: 3600 } // Cache for 1 hour
);

export async function saveQuote(data: {
  insuranceType: "MOTOR" | "HOME" | "HEALTH" | "TRAVEL";
  coverageLevel: string;
  monthlyPremium: number;
  annualPremium: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  // Motor specific
  carValue?: number;
  carMake?: string;
  carModel?: string;
  carYear?: number;
  mileage?: number;
  driverAge?: number;
  safeDriver?: boolean;
  // Home specific
  homeValue?: number;
  homeType?: string;
  homeAge?: number;
  securitySystem?: boolean;
  // Health specific
  numberOfPeople?: number;
  ageRange?: string;
  preExisting?: boolean;
  // Travel specific
  destination?: string;
  tripDuration?: number;
  travelers?: number;
  tripType?: string;
}) {
  try {
    const quote = await prisma.quote.create({
      data: {
        insuranceType: data.insuranceType,
        coverageLevel: data.coverageLevel,
        monthlyPremium: data.monthlyPremium,
        annualPremium: data.annualPremium,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        carValue: data.carValue,
        carMake: data.carMake,
        carModel: data.carModel,
        carYear: data.carYear,
        mileage: data.mileage,
        driverAge: data.driverAge,
        safeDriver: data.safeDriver,
        homeValue: data.homeValue,
        homeType: data.homeType,
        homeAge: data.homeAge,
        securitySystem: data.securitySystem,
        numberOfPeople: data.numberOfPeople,
        ageRange: data.ageRange,
        preExisting: data.preExisting,
        destination: data.destination,
        tripDuration: data.tripDuration,
        travelers: data.travelers,
        tripType: data.tripType,
      },
    });
    // Send email notification
    const { sendEmail, getEmailTemplate } = await import("@/lib/email");
    const emailContent = getEmailTemplate(
      "New Quote Request",
      `
      <p>A new quote has been requested.</p>
      <p><strong>Type:</strong> ${quote.insuranceType}</p>
      <p><strong>Coverage:</strong> ${quote.coverageLevel}</p>
      <p><strong>Estimated Premium:</strong> $${quote.monthlyPremium}/mo</p>
      <p><strong>Contact:</strong> ${quote.firstName || "Guest"} ${quote.lastName || ""} (${quote.email || "No email"})</p>
      <br />
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/business/quotes" style="background-color: #000; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View in Dashboard</a>
      `
    );

    await sendEmail({
      to: process.env.EMAIL_TO || process.env.EMAIL_SERVER_USER || "",
      subject: `New Quote Request: ${quote.insuranceType}`,
      html: emailContent,
    });

    return { success: true, quote };
  } catch (error) {
    console.error("Error saving quote:", error);
    return { success: false, error: "Failed to save quote" };
  }
}


export async function getRiskByZip(zipCode: string) {
  try {
    // 1. Try to fetch from DB first
    const dbRisk = await prisma.riskZone.findUnique({
      where: { zipCode },
    });

    if (dbRisk) {
      return { success: true, risk: dbRisk };
    }

    // 2. If not in DB, try to fetch real weather data (OpenMeteo) to generate a "Live" risk assessment
    // We need lat/lon for the zip code. For now, we'll use a mock geocoding or just random coords if not available.
    // In a real app, we'd use a geocoding API.
    
    // Simulating a "Live" check
    try {
      // Example: Fetch weather for a generic location (e.g., New York) just to demonstrate API connectivity
      const weatherRes = await fetch("https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&current_weather=true", {
        next: { revalidate: 300 } // Cache API response for 5 minutes
      });
      const weatherData = await weatherRes.json();
      
      // Use temperature/wind to influence "Fire Risk"
      const temp = weatherData.current_weather?.temperature || 20;
      const wind = weatherData.current_weather?.windspeed || 10;
      
      let fireRisk = "LOW";
      if (temp > 30 && wind > 15) fireRisk = "HIGH";
      else if (temp > 25) fireRisk = "MEDIUM";

      // Return a generated risk object based on live data
      return {
        success: true,
        risk: {
          zipCode,
          floodRisk: "LOW", // Placeholder
          theftRisk: "MEDIUM", // Placeholder
          fireRisk, // Dynamic based on API
          score: 100 - (temp + wind), // Dynamic score
        }
      };
    } catch (apiError) {
      console.warn("External API failed, falling back to mock", apiError);
    }

    // 3. Fallback to mock if everything else fails
    return { success: false, error: "Risk data not found" };
  } catch (error) {
    console.error("Error fetching risk data:", error);
    return { success: false, error: "Failed to fetch risk data" };
  }
}

export const getCompetitors = unstable_cache(
  async () => {
    try {
      const competitors = await prisma.competitor.findMany();
      return { success: true, competitors };
    } catch (error) {
      console.error("Error fetching competitors:", error);
      return { success: false, error: "Failed to fetch competitors" };
    }
  },
  ["competitors"],
  { revalidate: 3600 } // Cache for 1 hour
);
