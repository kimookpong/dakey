import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateSession } from "@/lib/session";

export async function GET() {
  if (!(await validateSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const domains = await prisma.domain.findMany({
    include: { notes: { orderBy: { date: "desc" } } },
    // Order domains by host (alphabetically) and then by port (numerically).
    // `host` is nullable in the schema, so put nulls last by using asc on host
    // and asc on port. Secondary sort by createdAt for stable ordering.
    orderBy: [{ host: "asc" }, { port: "asc" }, { createdAt: "desc" }],
  });

  return NextResponse.json(domains);
}

export async function POST(req: NextRequest) {
  if (!(await validateSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { domain, language, service, host, port, directory, description, note } = body;

  const record = await prisma.domain.create({
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
