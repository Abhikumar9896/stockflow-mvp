import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { nextCookies } from "better-auth/next-js"
import { db } from "@/lib/db"
import { redis } from "@/lib/redis"

function getSecondaryStorage() {
  if (!redis) return undefined
  const r = redis
  return {
    get: async (key: string) => {
      try {
        const value = await r.get(key)
        return value ? JSON.parse(value) : null
      } catch {
        return null
      }
    },
    set: async (key: string, value: unknown, ttl?: number) => {
      try {
        if (ttl) {
          await r.setex(key, ttl, JSON.stringify(value))
        } else {
          await r.set(key, JSON.stringify(value))
        }
      } catch {}
    },
    delete: async (key: string) => {
      try {
        await r.del(key)
      } catch {}
    },
  }
}

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      organizationId: {
        type: "string",
        required: false,
        input: false,
      },
    },
  },
  secondaryStorage: getSecondaryStorage(),
  trustedOrigins: [process.env.BETTER_AUTH_URL!].filter(Boolean),
  plugins: [nextCookies()],
})
