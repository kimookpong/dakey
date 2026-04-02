import { NextRequest, NextResponse } from "next/server";
import { signToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

const COOKIE_NAME = "dakey_session";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  if (
    username !== process.env.ADMIN_USERNAME ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  }

  // Generate a new session ID to kick out other sessions
  const sessionId = crypto.randomUUID();

  // Upsert the singleton session record (we only have one admin)
  await prisma.adminSession.upsert({
    where: { id: 1 },
    update: { sessionId },
    create: { id: 1, sessionId },
  });

  const token = await signToken(sessionId);
  const response = NextResponse.json({ success: true });
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365, // 1 year (practically infinite until logout)
    path: "/",
  });

  return response;
}
