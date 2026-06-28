import { PrismaClient } from '@prisma/client';
import { ensureSeeded } from './db-seed';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ log: ['error'] })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Trigger seeding in the background
ensureSeeded().catch((err) => {
  console.error("Prisma background seeding failed:", err);
});
