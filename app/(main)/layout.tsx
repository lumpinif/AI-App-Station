import { SideMenu } from "@/components/layout/side-menu/side-menu"
import { SideMenuRoutes } from "@/components/layout/side-menu/side-menu-routes"

interface MainAppLayout {
  children: React.ReactNode
}

const MainAppLayout = ({ children }: MainAppLayout) => {
  return (
    <div className="h-screen lg:flex">
      <SideMenu className="relative hidden lg:flex">
        <SideMenuRoutes />
      </SideMenu>
      <div className="flex flex-1">{children}</div>
    </div>
  )
}

export default MainAppLayout
