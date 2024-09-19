"use client"

import { cn } from "@/lib/utils"
import useSideMenu from "@/hooks/use-side-menu"

import { SiteFooter } from "../site-footer/site-footer"
import { FixedHeader } from "../site-header/fixed-header"
import { FixedSiteHeaderContent } from "../site-header/fixed-site-header-content"

type AiAppsPageWrapperProps = {
  children: React.ReactNode
  className?: string
}

const MainPageWrapper = ({ children, className }: AiAppsPageWrapperProps) => {
  const isPinned = useSideMenu((state) => state.isPinned)

  return (
    <main className="relative flex-1 bg-background md:overflow-y-auto md:rounded-xl">
      {/* TopBar */}
      <FixedHeader>
        <FixedSiteHeaderContent />
      </FixedHeader>
      <div
        className={cn(
          "p-4 md:px-8 md:py-10",
          !isPinned && "lg:px-32 2xl:px-52"
        )}
      >
        {children}
        <SiteFooter />
      </div>
    </main>
  )
}

export default MainPageWrapper
