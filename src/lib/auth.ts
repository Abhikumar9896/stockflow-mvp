import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { nextCookies } from "better-auth/next-js"
import { prisma } from "./prisma"
import { redis } from "./redis"

// Better Auth setup - email/password authentication
// Prisma ORM se database connect, Redis se session caching
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  // Redis secondary storage - sessions and rate limiting fast access ke liye
  secondaryStorage: {
    get: async (key) => {
      const value = await redis.get(key)
      return value ? JSON.parse(value) : null
    },
    set: async (key, value, ttl) => {
      if (ttl) {
        await redis.setex(key, ttl, JSON.stringify(value))
      } else {
        await redis.set(key, JSON.stringify(value))
      }
    },
    delete: async (key) => {
      await redis.del(key)
    },
  },
  plugins: [nextCookies()],
})
