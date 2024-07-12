import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { X } from "lucide-react"

import { DailyPost } from "@/types/db_tables"
import { AverageColor } from "@/lib/get-average-color-on-server"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ContentRenderer } from "@/components/editor/content-renderer"

import { DPCommentPreview } from "../dp-comment-preview"

type ActiveDPCardProps = {
  color: AverageColor
  dailyPost: DailyPost
  post_card_title: string
  onChange: (open: boolean) => void
}

export const ActiveDPCard: React.FC<ActiveDPCardProps> = ({
  color,
  onChange,
  dailyPost,
  post_card_title,
}) => {
  const {
    posts: {
      post_id,
      profiles,
      post_title,
      post_content,
      post_image_src,
      post_description,
    },
    created_on,
  } = dailyPost

  const currentPostDate = format(created_on, "EEEE MMMM dd")

  return (
    <div className="z-50 flex max-w-full items-end justify-center max-sm:fixed max-sm:inset-0 sm:items-center">
      <div
        style={{
          borderRadius: 10,
        }}
        className="card card-active relative flex h-full w-full max-w-full transform-gpu flex-col overflow-hidden rounded-lg bg-background shadow-lg outline-none sm:h-[90vh]"
      >
        <ScrollArea className="h-full w-full" scrollHideDelay={0}>
          <div className="card-inner relative z-50 h-[430px] transform-gpu select-none md:h-[500px]">
            <Image
              fill
              alt="daily AI news image"
              src={post_image_src || "/images/Feature-thumbnail.png"}
              className="pointer-events-none h-full w-full bg-background object-cover"
            />

            <button
              type="button"
              aria-label="Close button"
              onClick={() => onChange(false)}
              className="close-button absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-[50%] bg-black/20 text-primary backdrop-blur-sm"
            >
              <X
                className={cn(
                  "size-4 sm:size-6",
                  color.isDark ? "text-white" : "text-zinc-900"
                )}
              />
            </button>

            <label
              className={cn(
                "absolute left-4 top-8 text-left text-lg font-semibold uppercase leading-[0.9]",
                color.isDark ? "text-white" : "text-zinc-900"
              )}
            >
              {currentPostDate}
            </label>

            <div
              className="card-content active-card-content absolute bottom-0 left-0 right-0"
              style={{
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              }}
            >
              <div className="card-text px-4 pb-3 pt-0">
                <h2
                  className={cn(
                    "card-heading leading- mb-1 max-w-44 text-left text-[40px] font-extrabold uppercase leading-[0.95] text-primary",
                    color.isDark ? "text-white" : "text-zinc-900"
                  )}
                >
                  {post_card_title}
                </h2>
              </div>
              <div
                className="extra-info relative flex w-full items-center gap-2 bg-black/20 px-4 py-3 backdrop-blur-[2px]"
                style={{
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                }}
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
                      "line-clamp-2 text-[12px] max-sm:max-w-[200px]",
                      color.isDark ? "text-white/80" : "text-zinc-900"
                    )}
                  >
                    {post_description}
                  </span>
                </div>

                <button
                  className={cn(
                    "get-button ml-auto rounded-full bg-muted/80 px-4 py-1 text-sm font-semibold text-blue-500 dark:text-blue-500"
                  )}
                >
                  <Link
                    className="text-nowrap"
                    href={`/today/daily-post/${created_on}`}
                  >
                    Go to the post
                  </Link>
                </button>
              </div>
            </div>
          </div>

          <div className="relative max-w-full px-2">
            <ContentRenderer
              content={post_content}
              className="p-2 sm:p-4 md:p-6"
            />
          </div>

          <div className="my-10 flex w-full items-center justify-center text-sm text-border">
            - end of the story -
          </div>

          <div className="p-6 pb-20 lg:px-10 2xl:px-20">
            <DPCommentPreview post_id={post_id} created_on={created_on} />
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
