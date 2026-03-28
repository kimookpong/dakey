import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateSession } from "@/lib/session";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await validateSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();
  const { domain, language, service, host, port, directory, description, note } = body;

  const record = await prisma.domain.update({
    where: { id: Number(id) },
    data: {
      domain,
      language: language || null,
      service: service || null,
      host: host || null,
      port: port ? Number(port) : null,
      directory: directory || null,
      description: description || null,
      notes: note ? {
        create: { content: note }
      } : undefined,
    },
    include: { notes: true }
  });

  return NextResponse.json(record);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await validateSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await prisma.domain.delete({ where: { id: Number(id) } });
  return NextResponse.json({ success: true });
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await validateSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const domain = await prisma.domain.findFirst({ 
    where: { id: parseInt(id) },
    include: { notes: { orderBy: { date: "desc" } } }
  });
  if (!domain) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(domain);
}
