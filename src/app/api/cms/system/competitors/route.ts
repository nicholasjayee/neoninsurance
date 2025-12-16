/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const competitors = await prisma.competitor.findMany({
      orderBy: { name: "asc" },
    });
    return NextResponse.json(competitors);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch competitors" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newCompetitor = await prisma.competitor.create({ data: body });
    return NextResponse.json(newCompetitor);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create competitor" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...data } = body;
    const updatedCompetitor = await prisma.competitor.update({
      where: { id },
      data,
    });
    return NextResponse.json(updatedCompetitor);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update competitor" },
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

    await prisma.competitor.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete competitor" },
      { status: 500 }
    );
  }
}
