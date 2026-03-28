import PrismaPkg from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Some Prisma versions/typings expose different shapes for the client
// (named export vs default). Use a safe runtime lookup and fall back
// to untyped values so TypeScript doesn't fail when the installed
// package's typings don't include a named `PrismaClient` export.

type AnyPrismaClient = any;

const PrismaClientCtor: new (...args: any[]) => AnyPrismaClient =
  (PrismaPkg as any).PrismaClient ?? (PrismaPkg as any).default ?? (PrismaPkg as any);

const globalForPrisma = globalThis as unknown as {
  prisma: AnyPrismaClient | undefined;
};

function createPrismaClient() {
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
  });
  return new PrismaClientCtor({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
