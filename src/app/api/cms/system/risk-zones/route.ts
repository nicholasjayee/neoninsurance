/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const zones = await prisma.riskZone.findMany({
      orderBy: { zipCode: "asc" },
    });
    return NextResponse.json(zones);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch risk zones" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newZone = await prisma.riskZone.create({ data: body });
    return NextResponse.json(newZone);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create risk zone" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...data } = body;
    const updatedZone = await prisma.riskZone.update({
      where: { id },
      data,
    });
    return NextResponse.json(updatedZone);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update risk zone" },
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

    await prisma.riskZone.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete risk zone" },
      { status: 500 }
    );
  }
}
