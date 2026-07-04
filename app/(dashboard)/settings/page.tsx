import { requireOrganization } from "@/lib/auth/helpers"
import { getSettings } from "@/lib/services/settings.service"
import { SettingsForm } from "@/components/settings/settings-form"

export default async function SettingsPage() {
  const organizationId = await requireOrganization()
  const settings = await getSettings(organizationId)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground text-sm">
          Manage inventory preferences.
        </p>
      </div>

      <SettingsForm
        defaultLowStockThreshold={settings?.defaultLowStockThreshold ?? null}
      />
    </div>
  )
}
