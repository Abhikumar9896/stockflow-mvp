export type Product = {
  id: string
  organizationId: string
  name: string
  sku: string
  description: string | null
  quantityOnHand: number
  costPrice: number | null
  sellingPrice: number | null
  lowStockThreshold: number | null
  createdAt: Date
  updatedAt: Date
}
