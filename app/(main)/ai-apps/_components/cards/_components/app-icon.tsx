import Image from "next/image"
import Link from "next/link"

import { App } from "@/types/db_tables"
import { cn } from "@/lib/utils"

type AppIconProps = {
  app_slug: App["app_slug"]
  app_title: App["app_title"]
  app_icon_src?: App["app_icon_src"]
  size?: number | string
  className?: string
  isLink?: boolean
  externalLink?: App["app_url"]
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
      src={app_icon_src ? appIconSrc : "/images/image-not-found.png"}
      width={200}
      height={200}
      alt={app_title || "App Logo"}
      className="aspect-square rounded-xl"
      priority
    />
  )

  return (
    <div>
      {isLink ? (
        <Link
          className={cn(
            "flex flex-none items-center justify-center overflow-hidden rounded-xl p-2 shadow-sm transition-all duration-200 ease-out hover:shadow-lg dark:bg-primary dark:hover:shadow-outline",
            size ? `h-${size} w-${size}` : "h-14 w-14",
            className
          )}
          href={`/ai-apps/${app_slug || "#"}`}
        >
          {ImageElement}
        </Link>
      ) : (
        <div>
          {!externalLink ? (
            <div className="flex flex-none items-center justify-center overflow-hidden rounded-xl p-2 shadow-md transition-all duration-200 ease-out dark:bg-primary">
              {ImageElement}
            </div>
          ) : (
            <a href={`${externalLink}`} target="_blank">
              <div className="cursor-potiner flex flex-none items-center justify-center overflow-hidden rounded-xl p-2 shadow-md transition-all duration-200 ease-out dark:bg-primary">
                {ImageElement}
              </div>
            </a>
          )}
        </div>
      )}
    </div>
  )
}
