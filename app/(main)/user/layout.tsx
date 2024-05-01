import { cookies } from "next/headers"

import { Sidebar } from "./_components/dashboard-sidebar"
import { ResizeableSideBar } from "./_components/resizeable/resizeable-side-bar"

export default function DashboardPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const layout = cookies().get("react-resizable-panels:layout")
  const collapsed = cookies().get("react-resizable-panels:collapsed")

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined

  return (
    <main className="container h-full md:pt-8">
      {/* <div className="flex"> */}
      <ResizeableSideBar
        defaultLayout={defaultLayout}
        defaultCollapsed={defaultCollapsed}
        navCollapsedSize={5}
      >
        {children}
      </ResizeableSideBar>
      {/* <div className="h-full flex-1 py-2 pr-2">
          <div className="container h-full w-full rounded-2xl p-4">
            {children}
          </div>
        </div> */}
      {/* </div> */}
    </main>
  )
}
