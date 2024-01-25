import { Suspense } from "react"

import { LoadingSpinner } from "@/components/layout/loading-spinner"
import { SideMenu } from "@/components/layout/side-menu/side-menu"
import { SideMenuContent } from "@/components/layout/side-menu/side-menu-content"

interface AiAppsLayoutProps {
  children: React.ReactNode
}
export default async function AIAppsLayout({ children }: AiAppsLayoutProps) {
  return (
    <>
      <SideMenu
        title="AI Apps"
        href="/ai-apps"
        isInner
        className="lg:w-40 xl:w-52"
      >
        AI Apps Inner routes
      </SideMenu>
      <main className="m-4 flex-1 rounded-3xl shadow-outline">{children}</main>
    </>
  )
}
