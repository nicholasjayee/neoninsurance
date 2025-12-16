import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const faqs = await prisma.faq.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(faqs);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch FAQs' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const faq = await prisma.faq.create({
      data: {
        question: body.question,
        answer: body.answer,
        category: body.category,
      },
    });
    return NextResponse.json(faq);
  } catch {
    return NextResponse.json({ error: 'Failed to create FAQ' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const faq = await prisma.faq.update({
      where: { id: body.id },
      data: {
        question: body.question,
        answer: body.answer,
        category: body.category,
      },
    });
    return NextResponse.json(faq);
  } catch {
    return NextResponse.json({ error: 'Failed to update FAQ' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  try {
    await prisma.faq.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete FAQ' }, { status: 500 });
  }
}
