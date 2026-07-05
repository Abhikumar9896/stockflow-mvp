"use client"

import { useForm } from "react-hook-form"
import { productSchema, type ProductInput } from "@/schemas/product"
import { createResolver } from "@/lib/utils/form"
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { ArrowLeft, Loader2 } from "lucide-react"

type ProductFormProps = {
  mode: "create" | "edit"
  defaultValues?: ProductInput
  onSubmit: (data: ProductInput) => Promise<{ error?: string; success?: boolean }>
}

export function ProductForm({ mode, defaultValues, onSubmit }: ProductFormProps) {
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductInput>({
    resolver: createResolver(productSchema),
    defaultValues: defaultValues ?? {
      name: "",
      sku: "",
      description: "",
      quantityOnHand: 0,
      costPrice: undefined,
      sellingPrice: undefined,
      lowStockThreshold: undefined,
    },
  })

  async function handleFormSubmit(data: ProductInput) {
    setIsPending(true)
    setServerError(null)

    const cleaned: ProductInput = {
      ...data,
      description: data.description || undefined,
      costPrice: data.costPrice ?? undefined,
      sellingPrice: data.sellingPrice ?? undefined,
      lowStockThreshold: data.lowStockThreshold ?? undefined,
    }

    const result = await onSubmit(cleaned)

    if (result.error) {
      setServerError(result.error)
      setIsPending(false)
      return
    }

    toast.success(
      mode === "create"
        ? "Product created successfully."
        : "Product updated successfully."
    )
    router.push("/products")
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="w-full max-w-5xl mx-auto space-y-6 animate-fade-in">
      <button
        type="button"
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 rounded-md transition-all w-fit active:scale-95"
      >
        <ArrowLeft className="size-4" />
        Back to Products
      </button>

      <div className="rounded-md border bg-card shadow-sm overflow-hidden">
        <div className="border-b border-border/50 bg-zinc-50/50 dark:bg-zinc-900/20 px-6 sm:px-10 py-5">
          <h2 className="text-xl font-semibold text-foreground">Create Product</h2>
          <p className="text-sm text-muted-foreground mt-1">Fill in the details below to add a new product to your inventory.</p>
        </div>

        <div className="p-6 sm:p-10 space-y-10">
          
          {/* Section 1 */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Product Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("name")}
                  className="input-base rounded-md bg-zinc-50/50 dark:bg-zinc-900/50"
                  placeholder="e.g. Wireless Mouse"
                />
                {errors.name && (
                  <p className="text-xs text-red-500 font-medium">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">
                  SKU <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("sku")}
                  className="input-base rounded-md uppercase bg-zinc-50/50 dark:bg-zinc-900/50"
                  placeholder="e.g. MOUSE-01"
                />
                {errors.sku && (
                  <p className="text-xs text-red-500 font-medium">{errors.sku.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Description</label>
              <textarea
                {...register("description")}
                rows={3}
                placeholder="Detailed description of the product..."
                className="w-full rounded-md border bg-zinc-50/50 dark:bg-zinc-900/50 px-4 py-3 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-primary/20 resize-none shadow-sm"
              />
            </div>
          </div>

          <hr className="border-border/50" />

          {/* Section 2 */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Inventory Settings</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">
                  Quantity On Hand <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  {...register("quantityOnHand", { setValueAs: (v) => (v === "" ? 0 : Number(v)) })}
                  className="input-base rounded-md bg-zinc-50/50 dark:bg-zinc-900/50"
                  placeholder="0"
                />
                {errors.quantityOnHand && (
                  <p className="text-xs text-red-500 font-medium">{errors.quantityOnHand.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Low Stock Threshold</label>
                <input
                  type="number"
                  {...register("lowStockThreshold", { setValueAs: (v) => (v === "" ? undefined : Number(v)) })}
                  className="input-base rounded-md bg-zinc-50/50 dark:bg-zinc-900/50"
                  placeholder="e.g. 10"
                />
              </div>
            </div>
          </div>

          <hr className="border-border/50" />

          {/* Section 3 */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Pricing Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Cost Price</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">₹</span>
                  <input
                    type="number"
                    step="0.01"
                    {...register("costPrice", { setValueAs: (v) => (v === "" ? undefined : Number(v)) })}
                    className="input-base rounded-md !pl-8 bg-zinc-50/50 dark:bg-zinc-900/50"
                    placeholder="0.00"
                  />
                </div>
                {errors.costPrice && (
                  <p className="text-xs text-red-500 font-medium">{errors.costPrice.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Selling Price</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">₹</span>
                  <input
                    type="number"
                    step="0.01"
                    {...register("sellingPrice", { setValueAs: (v) => (v === "" ? undefined : Number(v)) })}
                    className="input-base rounded-md !pl-8 bg-zinc-50/50 dark:bg-zinc-900/50"
                    placeholder="0.00"
                  />
                </div>
                {errors.sellingPrice && (
                  <p className="text-xs text-red-500 font-medium">{errors.sellingPrice.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {serverError && (
          <div className="border-t border-red-200 bg-red-50 px-10 py-4 text-sm text-red-700 font-medium">
            {serverError}
          </div>
        )}

        <div className="bg-zinc-50/50 dark:bg-zinc-900/20 px-6 sm:px-10 py-5 border-t border-border/50 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="btn-ghost rounded-md px-6"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="btn-primary rounded-md px-8 shadow-sm transition-all hover:shadow-md active:scale-95"
          >
            {isPending && <Loader2 className="size-4 animate-spin" />}
            {isPending ? (mode === "create" ? "Creating..." : "Updating...") : (mode === "create" ? "Create Product" : "Save Changes")}
          </button>
        </div>
      </div>
    </form>
  )
}
