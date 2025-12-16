/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const members = await prisma.teamMember.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(members);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch team members" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newMember = await prisma.teamMember.create({ data: body });
    return NextResponse.json(newMember);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create team member" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...data } = body;
    const updatedMember = await prisma.teamMember.update({
      where: { id },
      data,
    });
    return NextResponse.json(updatedMember);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update team member" },
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

    await prisma.teamMember.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete team member" },
      { status: 500 }
    );
  }
}
