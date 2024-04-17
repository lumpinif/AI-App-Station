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
        "flex-1 overflow-x-hidden md:ml-28",
        isOpen && "md:ml-52",
        className
      )}
    >
      {children}
    </main>
  )
}

export default AiAppsPageWrapper
