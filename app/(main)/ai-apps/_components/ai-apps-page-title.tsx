"use client"

import { cn } from "@/lib/utils"
import useSideNav from "@/hooks/use-side-nav-store"

import { PageTitle } from "../../../../components/layout/page-title"

type AiAppsPageTitleProps = {
  href?: string
  title?: string
  subtitle?: string
  isLayout?: boolean
  className?: string
  children?: React.ReactNode
  subtitlePos?: "top" | "bottom"
}

const AiAppsPagesTitle = ({
  subtitle,
  children,
  className,
  subtitlePos,
  title = "Apps",
  isLayout = false,
  href = "/ai-apps",
}: AiAppsPageTitleProps) => {
  const isOpen = useSideNav((state) => state.isOpen)

  return (
    <div
      className={cn(
        "mb-2 w-full sm:mb-5",
        !isOpen && isLayout ? "sm:pl-28" : `${isLayout && "sm:pl-52"}`,
        className
      )}
    >
      <PageTitle
        href={href}
        title={title}
        subtitle={subtitle}
        subtitlePos={subtitlePos}
      >
        {children}
      </PageTitle>
    </div>
  )
}

export default AiAppsPagesTitle
