import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  try {
    const [
      totalClaims,
      pendingClaims,
      paidClaims,
      totalSubscribers,
      activeSubscribers,
      totalQuotes,
      quotes,
    ] = await Promise.all([
      prisma.claim.count(),
      prisma.claim.count({ where: { status: "RECEIVED" } }),
      prisma.claim.count({ where: { status: "PAID" } }),
      prisma.subscriber.count(),
      prisma.subscriber.count({ where: { isActive: true } }),
      prisma.quote.count(),
      prisma.quote.findMany({ select: { monthlyPremium: true } }), // For revenue calc
    ]);

    // Calculate "Revenue" based on quotes (mock logic: sum of monthly premiums of all quotes)
    // In a real app, this would be actual payments.
    const totalRevenue = quotes.reduce(
      (sum, q) => sum + (q.monthlyPremium || 0),
      0
    );

    return NextResponse.json({
      claims: {
        total: totalClaims,
        pending: pendingClaims,
        paid: paidClaims,
      },
      subscribers: {
        total: totalSubscribers,
        active: activeSubscribers,
      },
      quotes: {
        total: totalQuotes,
      },
      revenue: {
        total: totalRevenue,
        trend: "+12% (mock)",
      },
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
