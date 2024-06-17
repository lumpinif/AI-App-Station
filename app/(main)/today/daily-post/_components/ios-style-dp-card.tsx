"use client"

import { format } from "date-fns"
import { motion } from "framer-motion"
import { X } from "lucide-react"

import { DailyPost } from "@/types/db_tables"
import { cn } from "@/lib/utils"
import { AverageColor } from "@/hooks/use-average-color"
import { ContentRenderer } from "@/components/editor/content-renderer"

type IosStyleDPCardProps = {
  color: AverageColor
  dailyPost: DailyPost
  post_card_title: string
  setActiveCard: (dailyPost: DailyPost | null) => void
}

export const IosStyleDPCard: React.FC<IosStyleDPCardProps> = ({
  color,
  dailyPost,
  setActiveCard,
  post_card_title,
}) => {
  const {
    posts: {
      post_id,
      profiles,
      post_title,
      post_label,
      post_content,
      post_image_src,
      post_description,
    },
    created_on,
  } = dailyPost

  const currentPostDate = format(created_on, "EEEE MMMM dd")

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      style={{
        borderRadius: 20,
      }}
      layoutId={`dp-card-${post_id}`}
      onClick={() => setActiveCard(dailyPost)}
      className="card relative mx-auto my-0 h-[430px] max-w-sm cursor-pointer select-none overflow-hidden rounded-xl bg-background outline-none md:max-w-md"
    >
      {/* overlay */}
      {/* <div
        style={{ backgroundColor: color.rgba, opacity: 0.25 }}
        className={cn("absolute inset-x-0 bottom-0 h-full w-full")}
      /> */}

      <motion.img
        alt="image"
        style={{ borderRadius: 20 }}
        layoutId={`dp-card-image-${post_id}`}
        src={post_image_src! || "@/images/Feature-thumbnail.png"}
        className={cn(
          "pointer-events-none z-50 size-full object-cover",
          post_image_src ? "brightness-[.85]" : "blur brightness-[.85]"
        )}
      />

      <motion.button
        aria-hidden
        tabIndex={-1}
        layoutId={`dp-card-close-button-${post_id}`}
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
        layoutId={`dp-card-label-${post_id}`}
        className={cn(
          "absolute right-4 top-4 text-left text-lg font-semibold uppercase leading-[0.9]",
          color.isDark ? "text-white" : "text-zinc-900"
        )}
      >
        {currentPostDate}
      </motion.label>

      <motion.div
        layoutId={`dp-card-content-${post_id}`}
        className="card-content absolute bottom-0 left-0 right-0 pt-32"
        style={{
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          background: `linear-gradient(to bottom, rgba(${color.colorEnd},0) 0%, ${color.rgba} 55%, ${color.rgba} 100%)`,
        }}
      >
        <div className="card-text px-4 pb-3 pt-0">
          <motion.h2
            layoutId={`dp-card-heading-${post_id}`}
            className={cn(
              "card-heading mb-1 max-w-44 text-left text-[40px] font-extrabold uppercase leading-[0.95] text-primary",
              color.isDark ? "text-white" : "text-zinc-900"
            )}
          >
            {post_card_title}
          </motion.h2>
        </div>

        <motion.div
          layoutId={`dp-card-extra-info-${post_id}`}
          className="extra-info relative flex w-full items-center gap-2 bg-black/20 px-4 py-3 backdrop-blur-[2px]"
          style={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}
        >
          <motion.img
            width={40}
            height={40}
            className="rounded-[8px]"
            alt={`author-${profiles.full_name}-avatar`}
            layoutId={`dp-card-author-avatar-${post_id}`}
            src={profiles?.avatar_url || "@/images/Feature-thumbnail.png"}
          />

          <div className="desc-wrapper flex flex-col items-start">
            <motion.span
              layoutId={`dp-card-info-title-${post_id}`}
              className={cn(
                "line-clamp-1 text-[12px] font-semibold",
                color.isDark ? "text-white" : "text-zinc-900"
              )}
            >
              {profiles.full_name || profiles.email}
            </motion.span>

            <motion.span
              layoutId={`dp-card-info-subtitle-${post_id}`}
              className={cn(
                "line-clamp-2 text-[12px]",
                color.isDark ? "text-white/80" : "text-zinc-900"
              )}
            >
              {post_description}
            </motion.span>
          </div>

          <motion.button
            layoutId={`dp-card-button-${post_id}`}
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
        layoutId={`dp-card-post-content-${post_id}`}
        style={{ opacity: 0 }}
      >
        <ContentRenderer content={post_content} />
      </motion.div>
    </motion.div>
  )
}
