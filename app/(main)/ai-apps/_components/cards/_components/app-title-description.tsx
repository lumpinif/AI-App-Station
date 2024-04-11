import Link from "next/link"

import { App } from "@/types/db_tables"
import { cn } from "@/lib/utils"

type AppTitleWithDescriptionProps = {
  app_slug: App["app_slug"]
  app_title: App["app_title"]
  description: App["description"]
  className?: string
  titleSize?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl"
  titleFont?: "semi-bold" | "bold" | "medium" | "regular" | "light"
  descriptionSize?: "sm" | "base" | "md" | "lg"
  descriptionFont?: "bold" | "semi-bold" | "medium" | "regular" | "light"
  isTruncate?: boolean
  isLink?: boolean
  titleClassname?: string
  descriptionClassname?: string
}

export const AppTitleWithDescription: React.FC<
  AppTitleWithDescriptionProps
> = ({
  app_slug,
  app_title,
  description,
  className,
  titleSize,
  titleClassname,
  titleFont,
  descriptionSize,
  descriptionFont,
  descriptionClassname,
  isTruncate = true,
  isLink = true,
}) => {
  const titleElement = (
    <h4
      className={cn(
        "text-nowrap",
        isTruncate ? "truncate" : "",
        titleSize ? `text-${titleSize}` : "",
        titleFont ? `font-${titleFont}` : "",
        titleClassname
      )}
    >
      {app_title}
    </h4>
  )

  const descriptionElement = (
    <p
      className={cn(
        "cursor-default text-muted-foreground",
        isTruncate ? "truncate" : "",
        descriptionSize ? `text-${descriptionSize}` : "text-sm",
        descriptionFont ? `font-${descriptionFont}` : "",
        descriptionClassname
      )}
    >
      {description || "No description available."}
    </p>
  )

  return (
    <>
      {isLink ? (
        <div className={cn("flex min-w-0 flex-col", className)}>
          <Link
            href={`/ai-apps/${app_slug}`}
            className="w-fit active:text-blue-600 sm:hover:text-blue-500"
            passHref
          >
            {titleElement}
          </Link>
          {descriptionElement}
        </div>
      ) : (
        <div className={cn("flex min-w-0 flex-col", className)}>
          {titleElement}
          {descriptionElement}
        </div>
      )}
    </>
  )
}
