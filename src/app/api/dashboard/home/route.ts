import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const homeContent = await prisma.homeContent.findMany({ orderBy: { updatedAt: "desc" } });
  return NextResponse.json({ homeContent });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const created = await prisma.homeContent.create({ data: body });
  return NextResponse.json({ homeContent: created });
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const { id, ...data } = body;
  const updated = await prisma.homeContent.update({ where: { id }, data });
  return NextResponse.json({ homeContent: updated });
} 