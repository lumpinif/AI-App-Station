import { Suspense } from "react"

import { SideMenu } from "@/components/layout/side-menu/side-menu"
import { SideMenuRoutes } from "@/components/layout/side-menu/side-menu-routes"

interface AiAppsLayoutProps {
  children: React.ReactNode
}
export default async function AiAppsLayout({ children }: AiAppsLayoutProps) {
  return (
    <>
      <div>Apps Layout</div>
    </>
  )
}
