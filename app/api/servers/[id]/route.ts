import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { encrypt, decrypt } from "@/lib/crypto";
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
  const { protocol, host, port, username, password, description, basePath, note } = body;

  // Default port handling
  let finalPort = port ? Number(port) : null;
  if (!finalPort) {
    if (protocol === "SSH" || protocol === "SFTP") finalPort = 22;
    if (protocol === "FTP") finalPort = 21;
  }

  const server = await prisma.server.update({
    where: { id: Number(id) },
    data: {
      protocol,
      host,
      port: finalPort || 22,
      username,
      password: encrypt(password),
      description: description || null,
      basePath: basePath || null,
      notes: note ? {
        create: {
          content: note,
        }
      } : undefined,
    },
    include: { notes: true }
  });

  return NextResponse.json({ ...server, password });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await validateSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await prisma.server.delete({ where: { id: Number(id) } });
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
  const server = await prisma.server.findFirst({
    where: { id: parseInt(id) },
    include: { notes: { orderBy: { date: "desc" } } },
  });
  if (!server) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ ...server, password: decrypt(server.password) });
}
