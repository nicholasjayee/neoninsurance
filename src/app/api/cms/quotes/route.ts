import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  try {
    const quotes = await prisma.quote.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(quotes);
  } catch (error) {
    console.error("Error fetching quotes:", error);
    return NextResponse.json(
      { error: "Failed to fetch quotes" },
      { status: 500 }
    );
  }
}
