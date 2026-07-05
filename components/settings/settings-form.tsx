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
    <form onSubmit={handleSubmit} className="max-w-md">
      <div className="rounded-lg border p-6 space-y-4">
        <div>
          <h3 className="font-semibold">Default Low Stock Threshold</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Products without threshold will use this value.
          </p>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium">Threshold Value</label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="e.g. 5"
            className="input-base"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="btn-primary"
        >
          {isPending && <Loader2 className="size-4 animate-spin" />}
          {isPending ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  )
}
