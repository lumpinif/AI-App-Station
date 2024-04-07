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
  isTruncate = true,
  isLink = true,
}) => {
  const titleElement = (
    <span
      className={cn(
        "text-nowrap",
        isTruncate ? "truncate" : "",
        titleSize ? `text-${titleSize}` : "",
        titleFont ? `font-${titleFont}` : "",
        titleClassname
      )}
    >
      {app_title}
    </span>
  )

  const descriptionElement = (
    <span
      className={cn(
        "text-muted-foreground",
        isTruncate ? "truncate" : "",
        descriptionSize ? `text-${descriptionSize}` : "text-sm",
        descriptionFont ? `font-${descriptionFont}` : ""
      )}
    >
      {description || "No description available."}
    </span>
  )

  return (
    <>
      {isLink ? (
        <Link
          href={`/ai-apps/${app_slug || "#"}`}
          className={cn(
            "flex min-w-0 flex-col sm:[&>*:nth-child(1)]:hover:underline",
            className
          )}
          passHref
        >
          {titleElement}
          {descriptionElement}
        </Link>
      ) : (
        <div
          className={cn("flex min-w-0 max-w-2xl flex-col text-wrap", className)}
        >
          {titleElement}
          {descriptionElement}
        </div>
      )}
    </>
  )
}
