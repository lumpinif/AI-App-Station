"use client"

import { cn } from "@/lib/utils"
import useSideNav from "@/hooks/use-side-nav-store"

import { PageTitle } from "../../../../components/layout/page-title"

type AiAppsPageTitleProps = {
  isLayout?: boolean
  title?: string
  href?: string
}

const AiAppsPagesTitle = ({
  isLayout = false,
  title = "Apps",
  href = "/ai-apps",
}: AiAppsPageTitleProps) => {
  const isOpen = useSideNav((state) => state.isOpen)

  return (
    <div
      className={cn(
        "mb-2 w-full sm:mb-5",
        !isOpen && isLayout ? "sm:pl-28" : `${isLayout && "sm:pl-52"}`
      )}
    >
      <PageTitle title={title} href={href} />
    </div>
  )
}

export default AiAppsPagesTitle
