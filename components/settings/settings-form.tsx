"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { updateSettingsAction } from "@/lib/actions/settings/update-settings"

type SettingsFormProps = {
  defaultLowStockThreshold: number | null
}

export function SettingsForm({ defaultLowStockThreshold }: SettingsFormProps) {
  const router = useRouter()
  const [value, setValue] = useState(
    defaultLowStockThreshold?.toString() ?? ""
  )
  const [isPending, setIsPending] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsPending(true)

    const formData = new FormData()
    formData.set("defaultLowStockThreshold", value)

    const result = await updateSettingsAction(formData)

    if (result.success) {
      toast.success("Settings saved successfully.")
      router.refresh()
    } else {
      toast.error("Failed to save settings.")
    }

    setIsPending(false)
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md">
      <div className="rounded-lg border p-6 space-y-4">
        <div>
          <h3 className="font-semibold">Inventory Settings</h3>
          <p className="text-sm text-muted-foreground">
            Set default values for your inventory.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Default Low Stock Threshold
          </label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="e.g. 5"
            className="w-full h-9 rounded-lg border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary/20"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Used when a product does not have its own threshold.
          </p>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-1.5 h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/80 disabled:opacity-50"
        >
          {isPending && <Loader2 className="size-4 animate-spin" />}
          {isPending ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  )
}
