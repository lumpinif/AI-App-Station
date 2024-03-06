"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { SIDENAVROUTES } from "@/config/routes"
import { cn } from "@/lib/utils"

import { TagsList } from "./tags-list"

export function MobileCategoryNav() {
  const pathname = usePathname()

  return (
    <div className="sm:hidden">
      <div className="flex flex-col">
        {/* cucum */}
        {/* <div className="">{pathname}</div> */}
        <div className="scrollbar-none flex gap-x-6 overflow-x-auto py-1 sm:hidden">
          {SIDENAVROUTES.map((route) => (
            <Link
              key={route.href}
              href={`${route.href}`}
              className={cn(
                "flex items-center gap-x-2 whitespace-nowrap border-b-2 py-1 transition-colors ease-out focus-visible:ring-4 focus-visible:ring-ring",
                pathname.includes(`${route.href}`)
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-primary"
              )}
            >
              <span>{route.title}</span>
            </Link>
          ))}
        </div>
      </div>
      {pathname === "/ai-apps" ? null : <TagsList />}
    </div>
  )
}
