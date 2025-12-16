/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: { publishedAt: "desc" },
    });
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const post = await prisma.blogPost.create({
      data: {
        title: body.title,
        slug: body.slug,
        excerpt: body.excerpt,
        content: body.content,
        author: body.author || "Admin",
        category: body.category,
        imageUrl: body.imageUrl,
      },
    });
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const post = await prisma.blogPost.update({
      where: { id: body.id },
      data: {
        title: body.title,
        slug: body.slug,
        excerpt: body.excerpt,
        content: body.content,
        category: body.category,
        imageUrl: body.imageUrl,
      },
    });
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  try {
    await prisma.blogPost.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}
