import { db } from "@/lib/db"

export async function getSettings(organizationId: string) {
  return db.settings.findUnique({
    where: { organizationId },
  })
}

export async function upsertSettings(
  organizationId: string,
  data: { defaultLowStockThreshold?: number | null }
) {
  return db.settings.upsert({
    where: { organizationId },
    create: {
      organizationId,
      defaultLowStockThreshold: data.defaultLowStockThreshold ?? null,
    },
    update: {
      defaultLowStockThreshold: data.defaultLowStockThreshold ?? null,
    },
  })
}
