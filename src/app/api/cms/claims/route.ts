import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  try {
    const claims = await prisma.claim.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      include: { statusHistory: true },
    });
    return NextResponse.json(claims);
  } catch (error) {
    console.error("Error fetching claims:", error);
    return NextResponse.json(
      { error: "Failed to fetch claims" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status, notes, order } = body;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = { status };
    if (notes) {
      data.statusHistory = {
        create: {
          status,
          notes,
        },
      };
    }
    if (typeof order === "number") {
      data.order = order;
    }

    const updatedClaim = await prisma.claim.update({
      where: { id },
      data,
    });

    return NextResponse.json(updatedClaim);
  } catch (error) {
    console.error("Error updating claim:", error);
    return NextResponse.json(
      { error: "Failed to update claim" },
      { status: 500 }
    );
  }
}
