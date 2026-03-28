import { getSessionData, verifyToken } from "./auth";
import { prisma } from "./prisma";

export async function validateSession(): Promise<boolean> {
  const payload = await getSessionData();
  if (!payload || !payload.sessionId) return false;

  const currentSession = await prisma.adminSession.findUnique({
    where: { id: 1 },
  });

  return currentSession?.sessionId === payload.sessionId;
}
