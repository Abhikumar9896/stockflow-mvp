"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Loader2, Edit2 } from "lucide-react"
import { updateSettingsAction } from "@/lib/actions/settings/update-settings"

type SettingsFormProps = {
  defaultLowStockThreshold: number | null
}

export function SettingsForm({ defaultLowStockThreshold }: SettingsFormProps) {
  const router = useRouter()
  const [value, setValue] = useState(
    defaultLowStockThreshold?.toString() ?? ""
  )
  const [isEditing, setIsEditing] = useState(defaultLowStockThreshold === null)
  const [isPending, setIsPending] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsPending(true)

    const formData = new FormData()
    formData.set("defaultLowStockThreshold", value)

    const result = await updateSettingsAction(formData)

    if (result.success) {
      toast.success("Settings updated successfully.")
      setIsEditing(false)
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
            disabled={!isEditing}
            placeholder="e.g. 5"
            className="input-base disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-zinc-100 dark:disabled:bg-zinc-900/50"
          />
        </div>

        <div className="pt-2">
          {isEditing ? (
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isPending}
                className="btn-primary rounded-full px-8 shadow-sm transition-all hover:shadow-md active:scale-95"
              >
                {isPending && <Loader2 className="size-4 animate-spin" />}
                {isPending ? "Saving..." : "Save Changes"}
              </button>
              {defaultLowStockThreshold !== null && (
                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => {
                    setValue(defaultLowStockThreshold.toString())
                    setIsEditing(false)
                  }}
                  className="btn-ghost rounded-full px-6"
                >
                  Cancel
                </button>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center justify-center gap-1.5 h-9 px-6 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-sm font-medium transition-all active:scale-95 shadow-sm"
            >
              <Edit2 className="size-3.5" />
              Edit
            </button>
          )}
        </div>
      </div>
    </form>
  )
}
