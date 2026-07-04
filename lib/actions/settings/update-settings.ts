"use server"

import { requireOrganization } from "@/lib/auth/helpers"
import { upsertSettings } from "@/lib/services/settings.service"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const settingsSchema = z.object({
  defaultLowStockThreshold: z.coerce
    .number()
    .int()
    .nonnegative("Threshold cannot be negative")
    .optional()
    .nullable(),
})

export async function updateSettingsAction(formData: FormData) {
  const organizationId = await requireOrganization()

  const raw = formData.get("defaultLowStockThreshold")
  const parsed = settingsSchema.parse({
    defaultLowStockThreshold: raw === "" ? null : raw,
  })

  await upsertSettings(organizationId, parsed)

  revalidatePath("/settings")
  revalidatePath("/products")
  revalidatePath("/dashboard")
  return { success: true }
}
