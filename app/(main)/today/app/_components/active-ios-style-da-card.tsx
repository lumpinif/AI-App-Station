"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { format } from "date-fns"
import { motion } from "framer-motion"
import { X } from "lucide-react"
import { useOnClickOutside } from "usehooks-ts"

import { DailyApp } from "@/types/db_tables"
import { AverageColor } from "@/lib/get-average-color-on-server"
import { cn } from "@/lib/utils"
import useMediaQuery from "@/hooks/use-media-query"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ContentRenderer } from "@/components/editor/content-renderer"

import { DAScreenshotsCarousel } from "./da-card-screenshots-carousel"
import { DACommentPreview } from "./da-comment-preview"

type ActiveIosStyleDACardProps = {
  color: AverageColor
  appIconSrc?: string
  activeCard: DailyApp
  app_card_title: string
  screenshotsPublicUrls?: string[]
  setActiveCard: (dailyApp: DailyApp | null) => void
}

export const ActiveIosStyleDACard: React.FC<ActiveIosStyleDACardProps> = ({
  color,
  activeCard,
  appIconSrc,
  setActiveCard,
  app_card_title,
  screenshotsPublicUrls,
}) => {
  const {
    apps: { app_id, app_slug, profiles, app_title, description, introduction },
    created_on,
  } = activeCard

  const currentAppDate = format(created_on, "EEEE MMMM dd")

  const { isMobile } = useMediaQuery()

  const ref = useRef(null)
  useOnClickOutside(ref, () => (!isMobile ? setActiveCard(null) : null))

  useEffect(() => {
    let originalOverflow = document.body.style.overflow
    let originalPaddingRight = document.body.style.paddingRight

    if (activeCard) {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth
      originalOverflow = document.body.style.overflow
      originalPaddingRight = document.body.style.paddingRight
      document.body.style.overflow = "hidden"
      document.body.style.paddingRight = `${scrollBarWidth}px`
    } else {
      document.body.style.overflow = originalOverflow
      document.body.style.paddingRight = originalPaddingRight
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = originalOverflow
      document.body.style.paddingRight = originalPaddingRight
    }
  }, [activeCard])

  return (
    <motion.div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <motion.div
        ref={ref}
        style={{
          borderRadius: 10,
        }}
        layoutId={`da-card-${app_id}`}
        className="card card-active relative flex h-full w-full max-w-lg transform-gpu flex-col overflow-hidden rounded-lg bg-background shadow-lg outline-none sm:h-[90vh] md:max-w-2xl lg:max-w-3xl 2xl:max-w-4xl"
      >
        <ScrollArea className="w-ful h-full" scrollHideDelay={0}>
          <div className="card-inner relative z-50 h-[430px] transform-gpu select-none md:h-[500px]">
            <DAScreenshotsCarousel
              app_id={app_id}
              screenshotsPublicUrls={screenshotsPublicUrls}
            />

            <motion.button
              aria-label="Close button"
              onClick={() => setActiveCard(null)}
              layoutId={`da-card-close-button-${app_id}`}
              className="close-button absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-[50%] bg-black/20 text-primary backdrop-blur-sm"
            >
              <X
                className={cn(
                  "size-4 sm:size-6",
                  color.isDark ? "text-white" : "text-zinc-900"
                )}
              />
            </motion.button>

            <motion.label
              layoutId={`da-card-label-${app_id}`}
              className={cn(
                "absolute left-4 top-8 text-left text-lg font-semibold uppercase leading-[0.9]",
                color.isDark ? "text-white" : "text-zinc-900"
              )}
            >
              {currentAppDate}
            </motion.label>

            <motion.div
              layoutId={`da-card-content-${app_id}`}
              className="card-content active-card-content absolute bottom-0 left-0 right-0"
              style={{
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              }}
            >
              <div className="card-text px-4 pb-3 pt-0">
                <motion.h2
                  layoutId={`da-card-heading-${app_id}`}
                  layout
                  className={cn(
                    "card-heading leading- mb-1 max-w-44 text-left text-[40px] font-extrabold uppercase leading-[0.95] text-primary",
                    color.isDark ? "text-white" : "text-zinc-900"
                  )}
                >
                  {app_card_title}
                </motion.h2>
              </div>
              <motion.div
                layoutId={`da-card-extra-info-${app_id}`}
                className="extra-info relative flex w-full items-center gap-2 bg-black/20 px-4 py-3 backdrop-blur-[2px]"
                style={{
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                }}
              >
                <motion.img
                  width={40}
                  height={40}
                  alt={`${app_title} app-icon`}
                  layoutId={`da-card-app-icon-${app_id}`}
                  src={appIconSrc || "/images/app-icon-grid-32.png"}
                  className={cn(
                    "aspect-square select-none rounded-[8px] bg-white shadow-sm",
                    appIconSrc ? "p-1" : ""
                  )}
                />

                <div className="desc-wrapper flex flex-col items-start">
                  <motion.span
                    layoutId={`da-card-info-title-${app_id}`}
                    className={cn(
                      "line-clamp-1 text-[12px] font-semibold",
                      color.isDark ? "text-white" : "text-zinc-900"
                    )}
                  >
                    {app_title}
                  </motion.span>

                  <motion.span
                    layoutId={`da-card-info-subtitle-${app_id}`}
                    className={cn(
                      "line-clamp-2 text-[12px] max-sm:max-w-[200px]",
                      color.isDark ? "text-white/80" : "text-zinc-900"
                    )}
                  >
                    {description}
                  </motion.span>
                </div>

                <motion.button
                  layout
                  layoutId={`da-card-button-${app_id}`}
                  className={cn(
                    "get-button ml-auto rounded-full bg-muted/80 px-4 py-1 text-sm font-semibold text-blue-500 dark:text-blue-500"
                  )}
                >
                  <Link href={`/ai-apps/${app_slug}`} className="text-nowrap">
                    Go to the app
                  </Link>
                </motion.button>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            className="relative max-w-full px-2"
            layoutId={`da-card-app-content-${app_id}`}
          >
            <ContentRenderer
              content={introduction}
              className="p-2 sm:p-4 md:p-6"
            />
          </motion.div>

          <div className="my-10 flex w-full items-center justify-center text-sm text-border">
            - end of the story -
          </div>

          <div className="p-2 pb-10 sm:p-4 md:p-6">
            <DACommentPreview app_id={app_id} />
          </div>
        </ScrollArea>
      </motion.div>
    </motion.div>
  )
}
