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
        "3xl:ml-0 flex-1 overflow-x-hidden md:ml-28 2xl:ml-8",
        isOpen && "3xl:ml-0 md:ml-48 2xl:ml-32",
        className
        // "flex-1 overflow-x-hidden md:ml-28",
        // className
      )}
    >
      {children}
    </main>
  )
}

export default AiAppsPageWrapper
