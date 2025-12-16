import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const pages = await prisma.page.findMany({
      orderBy: { updatedAt: 'desc' },
    });
    return NextResponse.json(pages);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch pages' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const page = await prisma.page.create({
      data: {
        title: body.title,
        slug: body.slug,
        content: body.content,
        isPublished: body.isPublished,
      },
    });
    return NextResponse.json(page);
  } catch {
    return NextResponse.json({ error: 'Failed to create page' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const page = await prisma.page.update({
      where: { id: body.id },
      data: {
        title: body.title,
        slug: body.slug,
        content: body.content,
        isPublished: body.isPublished,
      },
    });
    return NextResponse.json(page);
  } catch {
    return NextResponse.json({ error: 'Failed to update page' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  try {
    await prisma.page.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete page' }, { status: 500 });
  }
}
