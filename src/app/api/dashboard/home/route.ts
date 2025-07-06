import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const homeContent = await prisma.homeContent.findMany({ orderBy: { updatedAt: "desc" } });
  return NextResponse.json({ homeContent });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // Validasi field
    if (
      !body.name ||
      !body.title ||
      !body.location ||
      typeof body.isRemote !== "boolean" ||
      !body.description
    ) {
      return NextResponse.json({ error: "Field tidak lengkap atau salah" }, { status: 400 });
    }
    const created = await prisma.homeContent.create({ data: body });
    return NextResponse.json({ homeContent: created });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const { id, ...data } = body;
  const updated = await prisma.homeContent.update({ where: { id }, data });
  return NextResponse.json({ homeContent: updated });
} 