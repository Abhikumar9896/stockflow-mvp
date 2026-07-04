"use client"

import { useState } from "react"
import { Loader2, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { deleteProductAction } from "@/lib/actions/product/delete-product"

type DeleteDialogProps = {
  productId: string
  productName: string
  open: boolean
  onClose: () => void
}

export function DeleteDialog({ productId, productName, open, onClose }: DeleteDialogProps) {
  const [isPending, setIsPending] = useState(false)

  if (!open) return null

  async function handleDelete() {
    setIsPending(true)
    const result = await deleteProductAction(productId)

    if (result.error) {
      toast.error(result.error)
      setIsPending(false)
      return
    }

    toast.success("Product deleted.")
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-background rounded-lg shadow-lg border p-6 w-full max-w-sm mx-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="size-10 rounded-full bg-red-100 flex items-center justify-center">
            <Trash2 className="size-5 text-red-600" />
          </div>
          <div>
            <h3 className="font-semibold">Delete Product</h3>
            <p className="text-sm text-muted-foreground">
              Are you sure? This action cannot be undone.
            </p>
          </div>
        </div>

        <p className="text-sm mb-6">
          You are about to delete <strong>{productName}</strong>.
        </p>

        <div className="flex items-center gap-3 justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="h-8 px-3 rounded-lg border text-sm font-medium hover:bg-muted disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isPending}
            className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 disabled:opacity-50"
          >
            {isPending && <Loader2 className="size-4 animate-spin" />}
            {isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  )
}
