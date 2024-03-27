import Image from "next/image"
import Link from "next/link"

import { App } from "@/types/db_tables"

type AppIconProps = {
  app_slug: App["app_slug"]
  app_title: App["app_title"]
  app_icon_src: App["app_icon_src"]
}

export const AppIcon: React.FC<AppIconProps> = ({
  app_slug,
  app_title,
  app_icon_src,
}) => {
  return (
    <>
      <Link
        className="flex h-14 w-14 flex-none items-center justify-center overflow-hidden rounded-xl bg-card transition-all duration-200 ease-out hover:shadow-md dark:hover:shadow-outline"
        href={`/ai-apps/${app_slug || "#"}`}
      >
        <Image
          src={app_icon_src || "/logo.svg"}
          width={200}
          height={200}
          alt={app_title || "App Logo"}
          className="aspect-square"
          layout="fixed"
        />
      </Link>
    </>
  )
}
