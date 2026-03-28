import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { encrypt, decrypt } from "@/lib/crypto";
import { validateSession } from "@/lib/session";

export async function GET() {
  if (!(await validateSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const servers = await prisma.server.findMany({
    include: { notes: { orderBy: { date: "desc" } } },
    // Order servers by host name alphabetically, and fall back to
    // creation date for stable ordering when hosts are identical.
    orderBy: [{ host: "asc" }, { createdAt: "desc" }],
  });

  const decrypted = servers.map((s: any) => ({
    ...s,
    password: decrypt(s.password),
  }));

  return NextResponse.json(decrypted);
}

export async function POST(req: NextRequest) {
  if (!(await validateSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { protocol, host, os, port, username, password, description, basePath, note } = body;

  // Default port handling
  let finalPort = port ? Number(port) : null;
  if (!finalPort) {
    if (protocol === "SSH" || protocol === "SFTP") finalPort = 22;
    if (protocol === "FTP") finalPort = 21;
  }

  const server = await prisma.server.create({
    data: {
      protocol,
      host,
      os: os || null,
      port: finalPort || 22, // Fallback to 22 if still null
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
