"use client"

import { format } from "date-fns"
import { motion } from "framer-motion"
import { X } from "lucide-react"

import { DailyApp } from "@/types/db_tables"
import { AverageColor } from "@/lib/get-average-color-on-server"
import { cn } from "@/lib/utils"
import { ContentRenderer } from "@/components/editor/content-renderer"

type IosStyleDACardProps = {
  color: AverageColor
  dailyApp: DailyApp
  card_thumbnail: string
  app_card_title: string
  appIconSrc?: string | null
  setActiveCard: (dailyApp: DailyApp | null) => void
}

export const IosStyleDACard: React.FC<IosStyleDACardProps> = ({
  color,
  dailyApp,
  appIconSrc,
  setActiveCard,
  card_thumbnail,
  app_card_title,
}) => {
  const {
    apps: { app_id, profiles, app_title, description, introduction },
    created_on,
  } = dailyApp

  const currentAppDate = format(created_on, "EEEE MMMM dd")

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      style={{
        borderRadius: 20,
      }}
      layoutId={`da-card-${app_id}`}
      onClick={() => setActiveCard(dailyApp)}
      className="card relative mx-auto my-0 h-[430px] max-w-sm cursor-pointer select-none overflow-hidden rounded-xl bg-background outline-none md:max-w-md"
    >
      {/* overlay */}
      {/* <div
        style={{ backgroundColor: color.rgba, opacity: 0.25 }}
        className={cn("absolute inset-x-0 bottom-0 h-full w-full")}
      /> */}

      <motion.img
        alt="image"
        style={{
          borderRadius: 20,
          objectFit: "cover",
          willChange: "transform",
        }}
        layoutId={`da-card-image-${app_id}`}
        src={card_thumbnail ? card_thumbnail : "/images/Feature-thumbnail.png"}
        className={cn(
          "pointer-events-none z-50 size-full animate-reveal object-cover",
          card_thumbnail
            ? "blur-[1px] brightness-[.85]"
            : "blur brightness-[.85]"
        )}
      />

      <motion.button
        aria-hidden
        tabIndex={-1}
        layoutId={`da-card-close-button-${app_id}`}
        className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-[50%] bg-black/20 text-primary backdrop-blur-sm"
        style={{ opacity: 0 }}
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
          "absolute right-4 top-4 text-left text-lg font-semibold uppercase leading-[0.9]",
          color.isDark ? "text-white" : "text-zinc-900"
        )}
      >
        {currentAppDate}
      </motion.label>

      <motion.div
        layoutId={`da-card-content-${app_id}`}
        className="card-content absolute bottom-0 left-0 right-0 pt-32"
        style={{
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          background: `linear-gradient(to bottom, rgba(${color.colorEnd},0) 0%, ${color.rgba} 55%, ${color.rgba} 100%)`,
        }}
      >
        <div className="card-text px-4 pb-3 pt-0">
          <motion.h2
            layoutId={`da-card-heading-${app_id}`}
            className={cn(
              "card-heading mb-1 max-w-44 text-left text-[40px] font-extrabold uppercase leading-[0.95] text-primary",
              color.isDark ? "text-white" : "text-zinc-900"
            )}
          >
            {app_card_title}
          </motion.h2>
        </div>

        <motion.div
          layoutId={`da-card-extra-info-${app_id}`}
          className="extra-info relative flex w-full items-center gap-2 bg-black/20 px-4 py-3 backdrop-blur-[2px]"
          style={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}
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
                "line-clamp-2 text-[12px]",
                color.isDark ? "text-white/80" : "text-zinc-900"
              )}
            >
              {description}
            </motion.span>
          </div>

          <motion.button
            layoutId={`da-card-button-${app_id}`}
            className={cn(
              "get-button ml-auto rounded-full bg-muted/60 px-4 py-1 text-sm font-semibold text-primary",
              color.isDark ? "text-white" : "text-zinc-900"
            )}
          >
            Check
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div
        className="relative flex-1"
        layoutId={`da-card-app-content-${app_id}`}
        style={{ opacity: 0 }}
      >
        <ContentRenderer content={introduction} />
      </motion.div>
    </motion.div>
  )
}
