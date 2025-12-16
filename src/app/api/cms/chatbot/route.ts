import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  try {
    const knowledge = await prisma.chatbotKnowledge.findMany({
      orderBy: { priority: "desc" },
    });
    return NextResponse.json(knowledge);
  } catch (error) {
    console.error("Error fetching chatbot knowledge:", error);
    return NextResponse.json(
      { error: "Failed to fetch knowledge base" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { category, patterns, keywords, responses, priority, isActive } =
      body;

    const newEntry = await prisma.chatbotKnowledge.create({
      data: {
        category,
        patterns,
        keywords,
        responses,
        priority: parseInt(priority) || 0,
        isActive: isActive ?? true,
      },
    });

    return NextResponse.json(newEntry);
  } catch (error) {
    console.error("Error creating chatbot knowledge:", error);
    return NextResponse.json(
      { error: "Failed to create entry" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, category, patterns, keywords, responses, priority, isActive } =
      body;

    const updatedEntry = await prisma.chatbotKnowledge.update({
      where: { id },
      data: {
        category,
        patterns,
        keywords,
        responses,
        priority: parseInt(priority) || 0,
        isActive,
      },
    });

    return NextResponse.json(updatedEntry);
  } catch (error) {
    console.error("Error updating chatbot knowledge:", error);
    return NextResponse.json(
      { error: "Failed to update entry" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await prisma.chatbotKnowledge.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting chatbot knowledge:", error);
    return NextResponse.json(
      { error: "Failed to delete entry" },
      { status: 500 }
    );
  }
}
