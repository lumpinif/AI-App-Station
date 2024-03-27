import Link from "next/link"

import { App } from "@/types/db_tables"

type AppTitleWithDescriptionProps = {
  app_slug: App["app_slug"]
  app_title: App["app_title"]
  description: App["description"]
}

export const AppTitleWithDescription: React.FC<
  AppTitleWithDescriptionProps
> = ({ app_slug, app_title, description }) => {
  return (
    <>
      <Link
        href={`/ai-apps/${app_slug || "#"}`}
        className="flex w-28 min-w-0 flex-1 flex-col truncate "
        passHref
      >
        <span className="truncate text-nowrap hover:underline">
          {app_title}
        </span>
        <span className="truncate text-nowrap text-sm text-muted-foreground">
          {description || "No description available."}
        </span>
      </Link>
    </>
  )
}
