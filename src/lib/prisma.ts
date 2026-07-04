import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

// Prisma 7 me direct connection URL nahi chalta
// isliye adapter use karna padta hai - @prisma/adapter-pg
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })

// global caching - development me baar baar new instance na bane
export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
