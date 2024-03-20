"use client"

import { cn } from "@/lib/utils"
import useSideNav from "@/hooks/use-side-nav-store"

import { PageTitle } from "../../../../components/layout/page-title"

const AiAppsPageTitle = () => {
  const isOpen = useSideNav((state) => state.isOpen)

  return (
    <div
      className={cn("mb-2 w-full sm:mb-5", !isOpen ? "sm:pl-28" : "sm:pl-52")}
    >
      <PageTitle title="Apps" href="/ai-apps" />
    </div>
  )
}

export default AiAppsPageTitle
