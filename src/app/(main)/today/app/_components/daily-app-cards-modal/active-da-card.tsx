import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { X } from "lucide-react"

import { DailyApp, DailyPost } from "@/types/db_tables"
import { AverageColor } from "@/lib/get-average-color-on-server"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ContentRenderer } from "@/components/editor/content-renderer"

import { DAScreenshotsCarousel } from "../../../app/_components/da-card-screenshots-carousel"
import { DACommentPreview } from "../../../app/_components/da-comment-preview"

type ActiveDACardProps = {
  color: AverageColor
  dailyApp: DailyApp
  app_card_title: string
  screenshotsPublicUrls?: string[]
  onChange: (open: boolean) => void
}

export const ActiveDACard: React.FC<ActiveDACardProps> = ({
  color,
  onChange,
  dailyApp,
  app_card_title,
  screenshotsPublicUrls,
}) => {
  const {
    apps: { app_id, app_slug, profiles, app_title, description, introduction },
    created_on,
  } = dailyApp

  const appIconSrc = dailyApp.apps.app_icon_src

  const currentAppDate = format(created_on, "EEEE MMMM dd")

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
            <DAScreenshotsCarousel
              app_id={app_id}
              screenshotsPublicUrls={screenshotsPublicUrls}
            />

            <button
              type="button"
              aria-label="Close button"
              onClick={() => onChange(false)}
              className="close-button absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-[50%] bg-black/20 text-primary backdrop-blur-sm"
            >
              <X className={cn("size-4 text-white sm:size-6")} />
            </button>

            <label
              className={cn(
                "absolute left-4 top-8 text-left text-lg font-semibold uppercase leading-[0.9] text-white"
                // color.isDark ? "text-white" : "text-zinc-900"
              )}
            >
              {currentAppDate}
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
                    "card-heading leading- mb-1 max-w-44 text-left text-[40px] font-extrabold uppercase leading-[0.95] text-white"
                    // color.isDark ? "text-white" : "text-zinc-900"
                  )}
                >
                  {app_card_title}
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
                  alt={`${app_title} app-icon`}
                  src={appIconSrc || "/images/app-icon-grid-32.png"}
                  className={cn(
                    "aspect-square select-none rounded-[8px] bg-white shadow-sm",
                    appIconSrc ? "p-1" : ""
                  )}
                />

                <div className="desc-wrapper flex flex-col items-start">
                  <span
                    className={cn(
                      "line-clamp-1 text-[12px] font-semibold text-white"
                      // color.isDark ? "text-white" : "text-zinc-900"
                    )}
                  >
                    {app_title}
                  </span>

                  <span
                    className={cn(
                      "line-clamp-2 text-[12px] text-white/60 max-sm:max-w-[200px]"
                      // color.isDark ? "text-white/80" : "text-zinc-900"
                    )}
                  >
                    {description}
                  </span>
                </div>

                <button
                  className={cn(
                    "get-button ml-auto rounded-full bg-muted/80 px-4 py-1 text-sm font-semibold text-blue-500 dark:text-blue-500"
                  )}
                >
                  <Link className="text-nowrap" href={`/ai-apps/${app_slug}`}>
                    Go to the app
                  </Link>
                </button>
              </div>
            </div>
          </div>

          <div className="relative max-w-full px-2">
            <ContentRenderer
              content={introduction}
              className="p-2 sm:p-4 md:p-6"
            />
          </div>

          <div className="my-10 flex w-full items-center justify-center text-sm text-border">
            - end of the story -
          </div>

          <div className="p-6 pb-20 lg:px-10 2xl:px-20">
            <DACommentPreview app_id={app_id} app_slug={app_slug} />
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
