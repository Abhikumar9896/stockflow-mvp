import Redis from "ioredis"

const globalForRedis = globalThis as unknown as {
  redis: Redis | undefined
}

// Redis connection - session caching ke liye use hoga
// Better Auth secondary storage ke through session data fast access
export const redis = globalForRedis.redis ?? new Redis(process.env.REDIS_URL || "redis://localhost:6379", {
  maxRetriesPerRequest: 3,
  retryStrategy(times) {
    // 3 baar try karega, phir chor dega
    if (times > 3) return null
    return Math.min(times * 200, 2000)
  },
})

if (process.env.NODE_ENV !== "production") globalForRedis.redis = redis
