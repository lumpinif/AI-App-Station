"use client"

import { cn } from "@/lib/utils"
import useSideNav from "@/hooks/use-side-nav-store"

type AiAppsPageWrapperProps = {
  children: React.ReactNode
  className?: string
}

const AiAppsPageWrapper = ({ children, className }: AiAppsPageWrapperProps) => {
  const isOpen = useSideNav((state) => state.isOpen)

  return (
    <main
      className={cn(
        "flex-1 overflow-x-hidden sm:ml-28",
        isOpen && "sm:ml-52",
        className
      )}
    >
      {children}
    </main>
  )
}

export default AiAppsPageWrapper
