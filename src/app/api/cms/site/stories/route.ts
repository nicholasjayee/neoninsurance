/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const stories = await prisma.story.findMany({
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json(stories);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch stories" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newStory = await prisma.story.create({ data: body });
    return NextResponse.json(newStory);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create story" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...data } = body;
    const updatedStory = await prisma.story.update({
      where: { id },
      data,
    });
    return NextResponse.json(updatedStory);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update story" },
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

    await prisma.story.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete story" },
      { status: 500 }
    );
  }
}
