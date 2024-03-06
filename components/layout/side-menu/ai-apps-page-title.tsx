"use client"

import Link from "next/link"

import { cn } from "@/lib/utils"
import useSideNav from "@/hooks/use-side-nav-store"

import { PageTitle } from "../page-title"

interface AiAppsPageTitleProps {}

const AiAppsPageTitle = ({}: AiAppsPageTitleProps) => {
  const isOpen = useSideNav((state) => state.isOpen)

  return (
    <div className={cn("mb-5 w-full", !isOpen ? "sm:pl-28" : "sm:pl-52")}>
      <Link href="/ai-apps">
        <PageTitle title="Apps" className="w-fit text-start" />
      </Link>
    </div>
  )
}

export default AiAppsPageTitle
