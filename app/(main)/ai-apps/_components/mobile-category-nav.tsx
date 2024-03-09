"use client"

import { usePathname, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ChevronDown, ChevronRight } from "lucide-react"

import { SIDENAVROUTES } from "@/config/routes"
import { cn } from "@/lib/utils"

import { TagsCarousel } from "./tags-carousel"

export function MobileCategoryNav() {
  const router = useRouter()
  const pathname = usePathname()

  // Function to handle tab selection
  const handleTabSelection = (href: string) => {
    router.push(href) // Update the URL
  }

  return (
    <div className="sm:hidden">
      <div className="flex flex-col">
        <div className="scrollbar-none flex items-center gap-x-6 overflow-x-auto py-1 sm:hidden">
          {SIDENAVROUTES.map((route) => (
            <div
              key={route.title}
              onClick={() => {
                handleTabSelection(`${route.href}`)
              }}
              className={cn(
                "relative flex cursor-pointer items-center gap-x-2 whitespace-nowrap transition-colors ease-out focus-visible:ring-4 focus-visible:ring-ring",
                pathname.includes(`${route.href}`)
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-primary"
              )}
              style={{
                WebkitTapHighlightColor: "transparent",
              }}
            >
              <span>{route.title}</span>
              {pathname.includes(`${route.href}`) ? (
                <>
                  <motion.span
                    layoutId="bubble_underline"
                    className="absolute inset-0 z-10 border-b-2 border-primary pb-1"
                    transition={{
                      type: "spring",
                      bounce: 0.2,
                      duration: 0.35,
                      ease: [0.32, 0.72, 0, 1],
                    }}
                  />
                  <ChevronDown className="h-4 w-4 -translate-x-1" />
                </>
              ) : (
                <ChevronRight className="h-4 w-4 -translate-x-1" />
              )}
            </div>
          ))}
        </div>
      </div>
      {pathname === "/ai-apps" ? null : <TagsCarousel currentPath={pathname} />}
    </div>
  )
}
