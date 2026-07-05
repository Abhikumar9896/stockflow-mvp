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
      toast.success("Settings updated successfully.")
      router.refresh()
    } else {
      toast.error("Failed to save settings.")
    }

    setIsPending(false)
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl animate-fade-in">
      <div className="rounded-2xl border bg-card p-8 shadow-sm space-y-8">
        <div>
          <h3 className="text-xl font-semibold tracking-tight">Default Low Stock Threshold</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Products without a specific threshold will use this fallback value.
          </p>
        </div>

        <hr className="border-border" />

        <div className="space-y-1.5 max-w-sm">
          <label className="text-sm font-medium">Global Threshold Value</label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="e.g. 5"
            className="input-base"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isPending}
            className="btn-primary rounded-full px-8 shadow-sm transition-all hover:shadow-md active:scale-95"
          >
            {isPending && <Loader2 className="size-4 animate-spin" />}
            {isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </form>
  )
}
