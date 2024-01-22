import { Suspense } from "react"

import { MenuContent } from "@/components/layout/side-menu/menu-content"
import { SideMenu } from "@/components/layout/side-menu/side-menu"

interface AiAppsLayoutProps {
  children: React.ReactNode
}
export default async function AiAppsLayout({ children }: AiAppsLayoutProps) {
  return (
    <>
      <div className="lg:flex">
        <SideMenu className="relative hidden lg:flex">
          <MenuContent />
        </SideMenu>
        <div className="flex flex-1">{children}</div>
      </div>
    </>
  )
}
