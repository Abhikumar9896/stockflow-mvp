import { Navbar } from "./navbar"

export function DashboardLayout({
  children,
  userName,
}: {
  children: React.ReactNode
  userName: string | null
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar userName={userName} />
      <main className="flex-1 p-6 max-w-6xl w-full mx-auto">{children}</main>
    </div>
  )
}
