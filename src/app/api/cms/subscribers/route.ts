import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  try {
    const subscribers = await prisma.subscriber.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(subscribers);
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    return NextResponse.json(
      { error: "Failed to fetch subscribers" },
      { status: 500 }
    );
  }
}
