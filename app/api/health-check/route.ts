import { NextRequest, NextResponse } from "next/server";
import { validateSession } from "@/lib/session";
import dns from "dns/promises";
import net from "net";

export async function POST(req: NextRequest) {
  if (!(await validateSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { target } = await req.json(); // Domain or IP
  if (!target) {
    return NextResponse.json({ error: "Target is required" }, { status: 400 });
  }

  const results: any = {
    ping: { status: "unknown", latency: null },
    http: { status: "unknown", code: null },
    dns: { status: "unknown", records: [] },
  };

  // 1. DNS Check
  try {
    const addresses = await dns.resolve(target);
    results.dns = { status: "ok", records: addresses };
  } catch (e: any) {
    results.dns = { status: "error", error: e.message };
  }

  // 2. TCP Ping (Port 80/443 fallback)
  const startTime = Date.now();
  try {
    const probe = await new Promise((resolve, reject) => {
      const socket = new net.Socket();
      socket.setTimeout(2000);
      socket.on("connect", () => {
        socket.destroy();
        resolve(true);
      });
      socket.on("timeout", () => {
        socket.destroy();
        reject(new Error("Timeout"));
      });
      socket.on("error", (err) => {
        socket.destroy();
        reject(err);
      });
      socket.connect(80, target);
    });
    results.ping = { status: "ok", latency: Date.now() - startTime };
  } catch (e: any) {
    results.ping = { status: "error", error: e.message };
  }

  // 3. HTTP Check
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    const url = target.startsWith("http") ? target : `http://${target}`;
    const res = await fetch(url, { signal: controller.signal });
    results.http = { status: "ok", code: res.status };
    clearTimeout(timeoutId);
  } catch (e: any) {
    results.http = { status: "error", error: e.message };
  }

  return NextResponse.json(results);
}
