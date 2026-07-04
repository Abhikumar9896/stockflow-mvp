import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { nextCookies } from "better-auth/next-js"
import { db } from "./db"
import { redis } from "./redis"

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
