import { requireOrganization } from "@/lib/auth/helpers"
import { getSettings } from "@/lib/services/settings.service"
import { SettingsForm } from "@/components/settings/settings-form"
import { PageHeader } from "@/components/shared/page-header"

export default async function SettingsPage() {
  const organizationId = await requireOrganization()
  const settings = await getSettings(organizationId)

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        subtitle="Inventory Preferences"
      />
      <SettingsForm
        defaultLowStockThreshold={settings?.defaultLowStockThreshold ?? null}
      />
    </div>
  )
}
