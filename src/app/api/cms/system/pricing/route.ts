/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const factors = await prisma.pricingFactor.findMany({
      orderBy: { key: "asc" },
    });
    return NextResponse.json(factors);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch pricing factors" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newFactor = await prisma.pricingFactor.create({ data: body });
    return NextResponse.json(newFactor);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create pricing factor" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...data } = body;
    const updatedFactor = await prisma.pricingFactor.update({
      where: { id },
      data,
    });
    return NextResponse.json(updatedFactor);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update pricing factor" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id)
      return NextResponse.json({ error: "ID required" }, { status: 400 });

    await prisma.pricingFactor.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete pricing factor" },
      { status: 500 }
    );
  }
}
