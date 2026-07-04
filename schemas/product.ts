import { z } from "zod"

export const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  sku: z.string().min(1, "SKU is required"),
  description: z.string().optional(),
  quantityOnHand: z.coerce.number().int().nonnegative("Quantity cannot be negative"),
  costPrice: z.coerce.number().nonnegative("Cost cannot be negative").optional(),
  sellingPrice: z.coerce.number().nonnegative("Price cannot be negative").optional(),
  lowStockThreshold: z.coerce.number().int().nonnegative("Threshold cannot be negative").optional(),
})

export type ProductInput = z.infer<typeof productSchema>
