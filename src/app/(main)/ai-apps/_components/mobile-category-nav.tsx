"use client"

import { usePathname, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ChevronDown, ChevronRight } from "lucide-react"

import { AIAPPSPAGENAVROUTES } from "@/config/routes/site-routes"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

import { AppSubmitButton } from "../../../../components/submit/app-submit-button"
import { TagsCarousel } from "./carousel/mobile-nav-carousel/tags-carousel"
import { SeeAllButton } from "./see-all-button"

export function MobileCategoryNav() {
  const router = useRouter()
  const pathname = usePathname()

  // Function to handle tab selection
  const handleTabSelection = (href: string) => {
    router.push(href) // Update the URL
  }

  const isShowAllAppsTab = pathname !== "/ai-apps"

  return (
    <div className="md:hidden">
      {isShowAllAppsTab && (
        <AllAppsTab
          pathname={pathname}
          handleTabSelection={handleTabSelection}
        />
      )}
      <div className="flex flex-col">
        <div className="scrollbar-none flex items-center justify-between overflow-x-auto">
          <div className="flex gap-x-2">
            {AIAPPSPAGENAVROUTES.map((route) => (
              <div
                key={route.title}
                onClick={() => {
                  handleTabSelection(`${route.href}`)
                }}
                className={cn(
                  "relative flex cursor-pointer items-center gap-x-1 whitespace-nowrap transition-colors ease-out focus-visible:ring-4 focus-visible:ring-ring",
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
            {/* See All Button */}
            {!isShowAllAppsTab && (
              <SeeAllButton
                href="/ai-apps/all"
                buttonTitle={"See All Apps"}
                className="w-fit pt-1 text-xs"
              />
            )}
          </div>
          <div className="group flex items-center gap-x-1">
            <AppSubmitButton
              variant={"default"}
              size={"label"}
              className="w-fit"
            />
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
    <div className="flex items-center gap-x-2">
      <div
        className={cn(
          "relative flex w-fit cursor-pointer items-center gap-x-1 whitespace-nowrap transition-colors ease-out focus-visible:ring-4 focus-visible:ring-ring",
          className,
          pathname === `/ai-apps`
            ? "border-primary text-primary"
            : "text-muted-foreground hover:text-primary"
        )}
        style={{
          WebkitTapHighlightColor: "transparent",
        }}
        onClick={() => {
          handleTabSelection(`/ai-apps`)
        }}
      >
        <span className="text-xs">Browse Apps</span>
      </div>
      <Separator orientation="vertical" className="h-2" />
      {/* See All Apps */}
      <SeeAllButton
        href="/ai-apps/all"
        buttonTitle={"See All Apps"}
        className="w-fit text-xs text-muted-foreground hover:text-primary active:text-primary"
      />
    </div>
  )
}
