"use client"

import { usePathname, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ChevronDown, ChevronRight } from "lucide-react"

import { SIDENAVROUTES } from "@/config/routes/main-routes"
import { cn } from "@/lib/utils"

import AppSubmitButton from "./app-submit-button"
import { TagsCarousel } from "./carousel/mobile-nav-carousel/tags-carousel"

export function MobileCategoryNav() {
  const router = useRouter()
  const pathname = usePathname()

  // Function to handle tab selection
  const handleTabSelection = (href: string) => {
    router.push(href) // Update the URL
  }

  const isShowAllAppsTab = pathname !== "/ai-apps"

  return (
    <div className="sm:hidden">
      {isShowAllAppsTab && (
        <AllAppsTab
          className="mr-1"
          pathname={pathname}
          handleTabSelection={handleTabSelection}
        />
      )}
      <div className="flex flex-col">
        <div className="scrollbar-none flex items-center justify-between overflow-x-auto py-1 sm:hidden">
          <div className="flex gap-x-2">
            {SIDENAVROUTES.map((route) => (
              <div
                key={route.title}
                onClick={() => {
                  handleTabSelection(`${route.href}`)
                }}
                className={cn(
                  "focus-visible:ring-ring relative flex cursor-pointer items-center gap-x-1 whitespace-nowrap transition-colors ease-out focus-visible:ring-4",
                  pathname.includes(`${route.href}`)
                    ? "border-primary text-primary"
                    : "text-muted-foreground hover:text-primary border-transparent"
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
                      className="border-primary absolute inset-0 z-10 border-b-2 pb-1"
                      transition={{
                        type: "tween",
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
          <div className="group flex items-center">
            <AppSubmitButton
              className="text-muted-foreground focus-visible:ring-ring group-hover:text-primary whitespace-nowrap transition-colors ease-out focus-visible:ring-4"
              size={"xs"}
            >
              <span className="text-xs">Submit Apps</span>
            </AppSubmitButton>
          </div>
        </div>
        {pathname === "/ai-apps" ? null : (
          <TagsCarousel currentPath={pathname} />
        )}
      </div>
    </div>
  )
}

const AllAppsTab = ({
  className,
  pathname,
  handleTabSelection,
}: {
  className?: string
  pathname: string
  handleTabSelection: (href: string) => void
}) => {
  return (
    <div
      className={cn(
        "focus-visible:ring-ring relative flex cursor-pointer items-center gap-x-1 whitespace-nowrap transition-colors ease-out focus-visible:ring-4",
        className,
        pathname === `/ai-apps`
          ? "border-primary text-primary"
          : "text-muted-foreground hover:text-primary border-transparent"
      )}
      style={{
        WebkitTapHighlightColor: "transparent",
      }}
      onClick={() => {
        handleTabSelection(`/ai-apps`)
      }}
    >
      <span className="text-xs">All Apps</span>
    </div>
  )
}
