"use client"

import Link from "next/link"

import { cn } from "@/lib/utils"
import useSideNav from "@/hooks/use-side-nav-store"

import { PageTitle } from "../page-title"

interface AiAppsPageTitleProps {}

const AiAppsPageTitle = ({}: AiAppsPageTitleProps) => {
  const isOpen = useSideNav((state) => state.isOpen)

  return (
    <div className={cn("mb-5 w-fit", !isOpen ? "sm:pl-28" : "sm:pl-52")}>
      <PageTitle title="Apps" className=" text-start" href="/ai-apps" />
    </div>
  )
}

export default AiAppsPageTitle
