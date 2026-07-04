import { AuthCard } from "@/components/shared/auth-card"
import { AppLogo } from "@/components/shared/app-logo"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthCard>
      <AppLogo />
      {children}
    </AuthCard>
  )
}
