import Image from "next/image"
import Link from "next/link"

import { SideMenu } from "@/components/layout/side-menu/side-menu"
import { SideMenuContent } from "@/components/layout/side-menu/side-menu-content"

interface MainAppLayout {
  children: React.ReactNode
}

const MainAppLayout = ({ children }: MainAppLayout) => {
  return (
    <div className="lg:flex">
      <SideMenu className="relative">
        <SideMenuContent />
      </SideMenu>
      <main className="flex flex-1">{children}</main>
    </div>
  )
}

export default MainAppLayout
