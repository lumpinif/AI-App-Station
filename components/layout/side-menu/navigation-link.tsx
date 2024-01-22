"use client"

import { memo } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowUpRightIcon, AtSignIcon } from "lucide-react"

import { cn } from "@/lib/utils"

interface NavigationLinkProps {
  href: string
  label: string
  icon?: React.ReactNode
  shortcutNumber?: number
}

export const NavigationLink = memo(NavigationLinkComponent)

function NavigationLinkComponent({
  href,
  label,
  icon,
  shortcutNumber,
}: NavigationLinkProps) {
  const pathname = usePathname()
  const iconCmp = icon ?? <AtSignIcon size={16} />

  const isInternal = href.startsWith("/")
  if (!isInternal) {
    return (
      <Link
        key={href}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between gap-2 rounded-lg p-2 "
      >
        <span className="inline-flex items-center gap-2 font-medium">
          {iconCmp} {label}
        </span>
        <ArrowUpRightIcon size={16} />
      </Link>
    )
  }

  let isActive = false
  if (pathname?.length > 0) {
    const splittedPathname = pathname.split("/")
    const currentPathname = splittedPathname[1] ?? ""
    isActive = currentPathname === href.split("/")[1]
  }

  return (
    <Link
      key={href}
      href={href}
      className={cn(
        "group flex items-center justify-between rounded-lg p-2 hover:shadow-inner-outline",
        isActive ? "bg-black text-white" : ""
      )}
    >
      <span className="flex items-center gap-2">
        {iconCmp}
        <span className={cn("font-medium", isActive && "text-white")}>
          {label}
        </span>
      </span>
      {shortcutNumber && (
        <span
          className={cn(
            "group-hover: hidden h-5 w-5 place-content-center rounded border bg-foreground text-xs font-medium text-secondary transition-all duration-200 lg:grid",
            isActive &&
              "border-gray-600 bg-gray-700 text-gray-200 group-hover:border-gray-600"
          )}
          title={`Shortcut key: ${shortcutNumber}`}
        >
          {shortcutNumber}
        </span>
      )}
    </Link>
  )
}
