import { z } from "zod"

export const productSchema = z.object({
  name: z.string().min(1),
  sku: z.string().min(1),
  quantity: z.number().int().nonnegative(),
  price: z.number().positive(),
})

export type ProductInput = z.infer<typeof productSchema>
