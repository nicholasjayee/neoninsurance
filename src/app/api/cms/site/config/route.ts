/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const config = await prisma.siteConfig.findUnique({
      where: { key: "main" },
    });
    return NextResponse.json(config);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch site config" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const updatedConfig = await prisma.siteConfig.update({
      where: { key: "main" },
      data: body,
    });
    return NextResponse.json(updatedConfig);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update site config" },
      { status: 500 }
    );
  }
}
