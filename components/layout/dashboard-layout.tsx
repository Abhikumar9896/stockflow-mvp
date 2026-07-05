import { Sidebar } from "./sidebar"

export function DashboardLayout({
  children,
  userName,
}: {
  children: React.ReactNode
  userName: string | null
}) {
  return (
    <div className="min-h-screen flex bg-zinc-50/50 dark:bg-zinc-950">
      <Sidebar userName={userName} />
      <div className="flex-1 flex flex-col md:pl-64">
        <main className="flex-1 p-6 sm:p-8 lg:p-10 max-w-7xl w-full mx-auto animate-fade-in">{children}</main>
      </div>
    </div>
  )
}
