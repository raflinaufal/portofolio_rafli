import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const projects = await prisma.project.findMany({ orderBy: { id: "desc" }, take: 3 });
  return NextResponse.json({ projects });
} 