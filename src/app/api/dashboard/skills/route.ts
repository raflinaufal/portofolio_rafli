import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all skills
export async function GET() {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: { category: "asc" },
    });
    return NextResponse.json({ skills });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch skills" },
      { status: 500 }
    );
  }
}

// CREATE new skill
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, category } = body;
    if (!name || !category) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const skill = await prisma.skill.create({
      data: { name, category },
    });
    return NextResponse.json({ skill });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create skill" },
      { status: 500 }
    );
  }
}

// UPDATE skill
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, name, category } = body;
    if (!id) {
      return NextResponse.json({ error: "Missing skill id" }, { status: 400 });
    }
    const skill = await prisma.skill.update({
      where: { id },
      data: { name, category },
    });
    return NextResponse.json({ skill });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update skill" },
      { status: 500 }
    );
  }
}

// DELETE skill
export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;
    if (!id) {
      return NextResponse.json({ error: "Missing skill id" }, { status: 400 });
    }
    await prisma.skill.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete skill" },
      { status: 500 }
    );
  }
}
