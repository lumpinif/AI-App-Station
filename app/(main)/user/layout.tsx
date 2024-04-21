import { Sidebar } from "./_components/dashboard-sidebar"

export default function DashboardPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="">
      <div className="flex h-screen">
        <Sidebar />
        <div className="h-full flex-1 py-2 pr-2">
          <div className="h-full w-full rounded-2xl p-4 shadow-outline">
            {children}
          </div>
        </div>
      </div>
    </main>
  )
}
