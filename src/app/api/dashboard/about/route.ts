import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: Ambil data about (profile admin)
export async function GET() {
  const about = await prisma.about.findFirst();
  return NextResponse.json(about);
}

// PUT: Update data about (profile admin)
export async function PUT(req: NextRequest) {
  const data = await req.json();
  const about = await prisma.about.findFirst();
  if (!about) {
    return NextResponse.json({ error: 'About not found' }, { status: 404 });
  }
  const updated = await prisma.about.update({
    where: { id: about.id },
    data,
  });
  return NextResponse.json(updated);
}

// POST: Buat data about (profile admin) jika belum ada
export async function POST(req: NextRequest) {
  const data = await req.json();
  const about = await prisma.about.findFirst();
  if (about) {
    return NextResponse.json({ error: 'About already exists' }, { status: 400 });
  }
  const created = await prisma.about.create({ data });
  return NextResponse.json(created);
}

// DELETE: Hapus data about (profile admin)
export async function DELETE() {
  const about = await prisma.about.findFirst();
  if (!about) {
    return NextResponse.json({ error: 'About not found' }, { status: 404 });
  }
  await prisma.about.delete({ where: { id: about.id } });
  return NextResponse.json({ success: true });
} 