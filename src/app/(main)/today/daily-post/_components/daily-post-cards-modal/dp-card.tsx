"use client"

import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { X } from "lucide-react"

import { DailyPost } from "@/types/db_tables"
import { AverageColor } from "@/lib/get-average-color-on-server"
import { cn } from "@/lib/utils"

type DPCardProps = {
  color: AverageColor
  dailyPost: DailyPost
  onCardClick?: () => void
  post_card_title: string
}

export const DPCard: React.FC<DPCardProps> = ({
  color,
  dailyPost,
  onCardClick,
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
    <div
      style={{
        borderRadius: 20,
      }}
      onClick={onCardClick}
      className="card relative mx-auto my-0 h-[430px] w-full cursor-pointer select-none overflow-hidden rounded-xl bg-background outline-none transition-all duration-200 ease-out active:scale-[0.98]"
    >
      <div
        style={{ backgroundColor: `rgb(${color.colorEnd})` }}
        className="absolute inset-0 z-0"
      />

      <Image
        fill
        alt="daily AI news image"
        src={post_image_src! || "@/images/Feature-thumbnail.png"}
        className={cn(
          "pointer-events-none size-full animate-reveal object-cover",
          post_image_src ? "" : "blur brightness-[.85]"
        )}
      />

      <label
        className={cn(
          "absolute right-4 top-4 text-left text-lg font-semibold uppercase leading-[0.9]",
          color.isDark ? "text-white" : "text-zinc-900"
        )}
      >
        {currentPostDate}
      </label>

      <div
        className="card-content absolute bottom-0 left-0 right-0 pt-28"
        style={{
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          background: `linear-gradient(to bottom, rgba(${color.colorEnd},0) 0%, ${color.rgba} 55%, ${color.rgba} 100%)`,
        }}
      >
        <div className="card-text px-4 pb-3 pt-0">
          <h2
            className={cn(
              "card-heading mb-1 max-w-44 text-left text-[40px] font-extrabold uppercase leading-[0.95] text-primary",
              color.isDark ? "text-white" : "text-zinc-900"
            )}
          >
            {post_card_title}
          </h2>
        </div>

        <div
          className="extra-info relative flex w-full items-center gap-2 bg-black/20 px-4 py-3 backdrop-blur-[2px]"
          style={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}
        >
          <Image
            width={40}
            height={40}
            className="rounded-[8px]"
            alt={`author-${profiles.full_name}-avatar`}
            src={profiles?.avatar_url || "@/images/Feature-thumbnail.png"}
          />

          <div className="desc-wrapper flex flex-col items-start">
            <span
              className={cn(
                "line-clamp-1 text-[12px] font-semibold",
                color.isDark ? "text-white" : "text-zinc-900"
              )}
            >
              {profiles.full_name || profiles.email}
            </span>

            <span
              className={cn(
                "line-clamp-2 text-[12px]",
                color.isDark ? "text-white/80" : "text-zinc-900"
              )}
            >
              {post_description}
            </span>
          </div>

          <Link
            href={`/today/daily-post/${created_on}`}
            className={cn(
              "get-button ml-auto text-nowrap rounded-full px-4 py-1 text-sm font-semibold transition-colors duration-150 ease-out",
              color.isDark
                ? "bg-muted/60 text-white hover:bg-blue-500 hover:text-white"
                : "bg-muted/40 text-zinc-900 hover:bg-blue-500 hover:text-white"
            )}
          >
            Check
          </Link>
        </div>
      </div>
    </div>
  )
}
