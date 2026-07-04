"use client"

import { useRouter } from "next/navigation"
import { logoutAction } from "@/lib/actions/auth/logout"
import { AppLogo } from "@/components/shared/app-logo"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export function Navbar() {
  const router = useRouter()

  async function handleLogout() {
    await logoutAction()
    router.push("/login")
  }

  return (
    <header className="border-b">
      <div className="flex items-center justify-between px-6 h-14">
        <AppLogo />
        <Button variant="ghost" size="sm" onClick={handleLogout}>
          <LogOut className="size-4 mr-1" />
          Logout
        </Button>
      </div>
    </header>
  )
}
