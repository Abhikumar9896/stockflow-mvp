"use client"

import { useRouter, usePathname } from "next/navigation"
import { useTransition, useState } from "react"
import { logoutAction } from "@/lib/actions/auth/logout"
import { AppLogo } from "@/components/shared/app-logo"
import { LogOut, LayoutDashboard, Package, Settings, Loader2, X, Menu } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/products", label: "Products", icon: Package },
  { href: "/settings", label: "Settings", icon: Settings },
]

export function Sidebar({ userName }: { userName: string | null }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()
  const [loggingOut, setLoggingOut] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  async function handleLogout() {
    setLoggingOut(true)
    await logoutAction()
    toast.success("Logged out successfully")
    startTransition(() => {
      router.push("/login")
    })
  }

  const sidebarContent = (
    <>
      <div className="flex h-16 shrink-0 items-center justify-between px-6 border-b border-border/50">
        <AppLogo />
        <button onClick={() => setMobileOpen(false)} className="md:hidden size-8 flex items-center justify-center rounded-lg hover:bg-muted">
          <X className="size-5" />
        </button>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {navLinks.map((link) => {
          const isActive = pathname.startsWith(link.href)
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20 scale-[1.02]"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <link.icon className={`size-5 ${isActive ? "text-primary-foreground" : ""}`} />
              {link.label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-border/50 p-4 space-y-3">
        {userName && (
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-border/50 shadow-sm">
            <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary font-bold shadow-inner">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 truncate">
              <p className="text-sm font-medium leading-none text-foreground">{userName}</p>
              <p className="text-xs text-muted-foreground mt-1 truncate">Admin Account</p>
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          disabled={loggingOut || isPending}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30 dark:hover:text-red-400 active:scale-95"
        >
          {loggingOut ? (
            <Loader2 className="size-5 animate-spin" />
          ) : (
            <LogOut className="size-5" />
          )}
          {loggingOut ? "Logging out..." : "Logout"}
        </button>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 h-14 border-b bg-background/95 backdrop-blur flex items-center justify-between px-4">
        <button
          onClick={() => setMobileOpen(true)}
          className="size-9 flex items-center justify-center rounded-lg hover:bg-muted"
        >
          <Menu className="size-5" />
        </button>
        <AppLogo />
        <div className="size-9" />
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 md:hidden animate-fade-in"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r bg-card shadow-xl transition-transform duration-300 md:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 flex w-56 flex-col border-r bg-card shadow-sm hidden md:flex">
        {sidebarContent}
      </aside>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 h-16 border-t bg-background/95 backdrop-blur flex items-center justify-around px-2 safe-area-bottom">
        {navLinks.map((link) => {
          const isActive = pathname.startsWith(link.href)
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <link.icon className="size-5" />
              {link.label}
            </Link>
          )
        })}
      </nav>
    </>
  )
}
