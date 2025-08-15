import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all experiences
export async function GET() {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: { startDate: "desc" },
    });
    return NextResponse.json({ experiences });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch experiences" },
      { status: 500 }
    );
  }
}

// CREATE new experience
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { position, company, description, startDate, endDate, isCurrent } =
      body;
    if (!position || !company || !description || !startDate) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const experience = await prisma.experience.create({
      data: {
        position,
        company,
        description,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        isCurrent: !!isCurrent,
      },
    });
    return NextResponse.json({ experience });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create experience" },
      { status: 500 }
    );
  }
}

// UPDATE experience
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const {
      id,
      position,
      company,
      description,
      startDate,
      endDate,
      isCurrent,
    } = body;
    if (!id) {
      return NextResponse.json(
        { error: "Missing experience id" },
        { status: 400 }
      );
    }
    const experience = await prisma.experience.update({
      where: { id },
      data: {
        position,
        company,
        description,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
        isCurrent,
      },
    });
    return NextResponse.json({ experience });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update experience" },
      { status: 500 }
    );
  }
}

// DELETE experience
export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;
    if (!id) {
      return NextResponse.json(
        { error: "Missing experience id" },
        { status: 400 }
      );
    }
    await prisma.experience.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete experience" },
      { status: 500 }
    );
  }
}
