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
    <form onSubmit={handleSubmit(handleFormSubmit)} className="max-w-lg">
      <button
        type="button"
        onClick={() => router.back()}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
      >
        <ArrowLeft className="size-3.5" />
        Back
      </button>

      <div className="rounded-lg border p-6 space-y-8">
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Product Information</h2>
            <p className="text-sm text-muted-foreground">
              Enter the basic details of your product.
            </p>
          </div>
          <hr className="border-t" />

          <div className="space-y-1.5">
            <label className="text-sm font-medium">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              {...register("name")}
              className="input-base"
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
              className="input-base"
            />
            {errors.sku && (
              <p className="text-xs text-red-500 mt-1">{errors.sku.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">Description</label>
            <textarea
              {...register("description")}
              rows={3}
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none transition-all duration-150 focus:ring-2 focus:ring-primary/20 resize-none"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Inventory</h2>
            <p className="text-sm text-muted-foreground">
              Set stock levels and alerts.
            </p>
          </div>
          <hr className="border-t" />

          <div className="space-y-1.5">
            <label className="text-sm font-medium">
              Quantity On Hand <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              {...register("quantityOnHand", { setValueAs: (v) => (v === "" ? 0 : Number(v)) })}
              className="input-base"
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
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Pricing</h2>
            <p className="text-sm text-muted-foreground">
              Set cost and selling prices.
            </p>
          </div>
          <hr className="border-t" />

          <div className="space-y-1.5">
            <label className="text-sm font-medium">Cost Price</label>
            <input
              type="number"
              step="0.01"
              {...register("costPrice", {
                setValueAs: (v) => (v === "" ? undefined : Number(v)),
              })}
              className="input-base"
            />
            {errors.costPrice && (
              <p className="text-xs text-red-500 mt-1">
                {errors.costPrice.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">Selling Price</label>
            <input
              type="number"
              step="0.01"
              {...register("sellingPrice", {
                setValueAs: (v) => (v === "" ? undefined : Number(v)),
              })}
              className="input-base"
            />
            {errors.sellingPrice && (
              <p className="text-xs text-red-500 mt-1">
                {errors.sellingPrice.message}
              </p>
            )}
          </div>
        </div>

        {serverError && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {serverError}
          </div>
        )}

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="btn-ghost"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="btn-primary"
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
