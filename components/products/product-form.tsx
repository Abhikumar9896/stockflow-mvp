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
    <form onSubmit={handleSubmit(handleFormSubmit)} className="max-w-2xl mx-auto animate-fade-in">
      <button
        type="button"
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 rounded-full transition-all w-fit mb-6 active:scale-95"
      >
        <ArrowLeft className="size-4" />
        Back to Products
      </button>

      <div className="rounded-2xl border bg-card p-8 shadow-sm space-y-10">
        <div className="space-y-5">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Product Information</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Enter the basic details of your product.
            </p>
          </div>
          <hr className="border-border" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                {...register("name")}
                className="input-base"
                placeholder="e.g. Wireless Mouse"
              />
              {errors.name && (
                <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium">
                SKU <span className="text-red-500">*</span>
              </label>
              <input
                {...register("sku")}
                className="input-base uppercase"
                placeholder="e.g. MOUSE-01"
              />
              {errors.sku && (
                <p className="text-xs text-red-500 mt-1">{errors.sku.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">Description</label>
            <textarea
              {...register("description")}
              rows={4}
              placeholder="Detailed description of the product..."
              className="w-full rounded-xl border bg-background px-3 py-2 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-primary/20 resize-none"
            />
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Inventory</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Set stock levels and alerts.
            </p>
          </div>
          <hr className="border-border" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">
                Quantity On Hand <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                {...register("quantityOnHand", { setValueAs: (v) => (v === "" ? 0 : Number(v)) })}
                className="input-base"
                placeholder="0"
              />
              {errors.quantityOnHand && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.quantityOnHand.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium">Low Stock Threshold</label>
              <input
                type="number"
                {...register("lowStockThreshold", {
                  setValueAs: (v) => (v === "" ? undefined : Number(v)),
                })}
                className="input-base"
                placeholder="e.g. 10"
              />
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Pricing</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Set cost and selling prices.
            </p>
          </div>
          <hr className="border-border" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Cost Price</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                <input
                  type="number"
                  step="0.01"
                  {...register("costPrice", {
                    setValueAs: (v) => (v === "" ? undefined : Number(v)),
                  })}
                  className="input-base pl-7"
                  placeholder="0.00"
                />
              </div>
              {errors.costPrice && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.costPrice.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium">Selling Price</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                <input
                  type="number"
                  step="0.01"
                  {...register("sellingPrice", {
                    setValueAs: (v) => (v === "" ? undefined : Number(v)),
                  })}
                  className="input-base pl-7"
                  placeholder="0.00"
                />
              </div>
              {errors.sellingPrice && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.sellingPrice.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {serverError && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 font-medium">
            {serverError}
          </div>
        )}

        <div className="flex items-center justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="btn-ghost rounded-full px-6"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="btn-primary rounded-full px-8 shadow-sm transition-all hover:shadow-md active:scale-95"
          >
            {isPending && <Loader2 className="size-4 animate-spin" />}
            {isPending
              ? mode === "create"
                ? "Creating..."
                : "Updating..."
              : mode === "create"
                ? "Create Product"
                : "Save Changes"}
          </button>
        </div>
      </div>
    </form>
  )
}
