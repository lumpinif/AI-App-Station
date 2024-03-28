import Image from "next/image"
import Link from "next/link"

import { App } from "@/types/db_tables"
import { cn } from "@/lib/utils"

type AppIconProps = {
  app_slug: App["app_slug"]
  app_title: App["app_title"]
  app_icon_src: App["app_icon_src"]
  size?: number | string
  className?: string
  isLink?: boolean
  externalLink?: string
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
  const ImageElement = (
    <Image
      src={app_icon_src || "/images/openai-svgrepo-com.svg"}
      width={200}
      height={200}
      alt={app_title || "App Logo"}
      className="aspect-square rounded-xl"
    />
  )

  return (
    <>
      {isLink ? (
        <Link
          className={cn(
            "flex flex-none items-center justify-center overflow-hidden rounded-xl p-2 shadow-sm transition-all duration-200 ease-out hover:shadow-md dark:bg-primary dark:hover:shadow-outline",
            size ? `h-${size} w-${size}` : "h-14 w-14",
            className
          )}
          href={`/ai-apps/${app_slug || "#"}`}
        >
          {ImageElement}
        </Link>
      ) : (
        <>
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
        </>
      )}
    </>
  )
}
