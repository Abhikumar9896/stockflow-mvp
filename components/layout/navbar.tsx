"use client"

import { useRouter, usePathname } from "next/navigation"
import { logoutAction } from "@/lib/actions/auth/logout"
import { AppLogo } from "@/components/shared/app-logo"
import { Button } from "@/components/ui/button"
import { LogOut, LayoutDashboard, Package, Settings, User } from "lucide-react"

const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/products", label: "Products", icon: Package },
  { href: "/settings", label: "Settings", icon: Settings },
]

export function Navbar({ userName }: { userName: string | null }) {
  const router = useRouter()
  const pathname = usePathname()

  async function handleLogout() {
    await logoutAction()
    router.push("/login")
  }

  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="flex items-center justify-between px-6 h-14 max-w-6xl mx-auto">
        <div className="flex items-center gap-8">
          <AppLogo />
          <nav className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname.startsWith(link.href)
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors hover:bg-muted ${
                    isActive
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  <link.icon className="size-4" />
                  {link.label}
                </a>
              )
            })}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          {userName && (
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <User className="size-4" />
              <span className="hidden sm:inline">{userName}</span>
            </div>
          )}
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="size-4" />
            <span className="hidden sm:inline ml-1">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
