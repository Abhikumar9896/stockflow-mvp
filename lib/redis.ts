import Redis from "ioredis"

const globalForRedis = globalThis as unknown as {
  redis: Redis | undefined
}

function createRedis(): Redis | null {
  if (!process.env.REDIS_URL) return null
  const client = new Redis(process.env.REDIS_URL, {
    maxRetriesPerRequest: 3,
    retryStrategy(times) {
      if (times > 3) return null
      return Math.min(times * 200, 2000)
    },
    lazyConnect: true,
  })
  client.on("error", () => {})
  return client
}

export const redis = globalForRedis.redis ?? createRedis()

if (process.env.NODE_ENV !== "production") globalForRedis.redis = redis!
