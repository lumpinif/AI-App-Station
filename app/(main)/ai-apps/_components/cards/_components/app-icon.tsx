import Image from "next/image"
import Link from "next/link"

import { Apps } from "@/types/db_tables"
import { cn } from "@/lib/utils"

type AppIconProps = {
  app_slug: Apps["app_slug"]
  app_title: Apps["app_title"]
  app_icon_src?: Apps["app_icon_src"]
  size?: number | string
  className?: string
  isLink?: boolean
  externalLink?: Apps["app_url"]
}

export const AppIcon: React.FC<AppIconProps> = ({
  app_slug,
  app_title,
  app_icon_src,
  size,
  className,
  isLink = true,
  externalLink,
}) => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseImageURL = `${supabaseUrl}/storage/v1/object/public/apps/`
  const appIconSrc = supabaseImageURL + app_icon_src

  const ImageElement = (
    <Image
      src={app_icon_src ? appIconSrc : "/images/app-icon-grid-32.png"}
      width={200}
      height={200}
      alt={app_title || "App Logo"}
      className="aspect-square select-none rounded-xl"
      priority
    />
  )

  return (
    <div>
      {isLink ? (
        <Link
          className={cn(
            "flex flex-none items-center justify-center overflow-hidden rounded-xl shadow-sm transition-all duration-200 ease-out hover:shadow-lg dark:bg-primary dark:hover:shadow-outline",
            size ? `h-${size} w-${size}` : "h-14 w-14",
            app_icon_src ? "p-1" : "",
            className
          )}
          href={`/ai-apps/${app_slug || "#"}`}
          // target="_blank"
        >
          {ImageElement}
        </Link>
      ) : (
        <>
          {!externalLink ? (
            <div
              className={cn(
                "flex flex-none items-center justify-center overflow-hidden rounded-xl shadow-md transition-all duration-200 ease-out dark:bg-primary",
                app_icon_src ? "p-1" : ""
              )}
            >
              {ImageElement}
            </div>
          ) : (
            <a href={`${externalLink}`} target="_blank">
              <div
                className={cn(
                  "cursor-potiner flex flex-none items-center justify-center overflow-hidden rounded-xl shadow-md transition-all duration-200 ease-out dark:bg-primary",
                  app_icon_src ? "p-1" : ""
                )}
              >
                {ImageElement}
              </div>
            </a>
          )}
        </>
      )}
    </div>
  )
}
