import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  return (
    <DashboardLayout userName={session?.user?.name ?? null}>
      {children}
    </DashboardLayout>
  )
}
