import Link from "next/link"

import { Apps } from "@/types/db_tables"
import { cn } from "@/lib/utils"

type AppTitleWithDescriptionProps = {
  isLink?: boolean
  className?: string
  isTruncate?: boolean
  linkClassName?: string
  descriptionCN?: string
  titleClassname?: string
  children?: React.ReactNode
  app_slug: Apps["app_slug"]
  app_title: Apps["app_title"]
  descriptionClassname?: string
  description: Apps["description"]
  descriptionSize?: "sm" | "base" | "md" | "lg"
  titleSize?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl"
  titleFont?: "semi-bold" | "bold" | "medium" | "regular" | "light"
  descriptionFont?: "bold" | "semi-bold" | "medium" | "regular" | "light"
}

export const AppTitleWithDescription: React.FC<
  AppTitleWithDescriptionProps
> = ({
  children,
  app_slug,
  app_title,
  titleFont,
  titleSize,
  className,
  description,
  descriptionCN,
  linkClassName,
  isLink = true,
  titleClassname,
  descriptionSize,
  descriptionFont,
  isTruncate = true,
  descriptionClassname,
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
            href={{
              pathname: `/ai-apps/${app_slug}`,
            }}
            className={cn(
              "w-fit active:text-blue-600 sm:hover:text-blue-500",
              linkClassName
            )}
            passHref
          >
            {children ? (
              <span className="flex items-center justify-between">
                {titleElement}
                <span className="hidden sm:flex">{children}</span>
              </span>
            ) : (
              <>{titleElement}</>
            )}
          </Link>
          {descriptionElement}
        </div>
      ) : (
        <div className={cn("flex w-full min-w-0 flex-col gap-1", className)}>
          {children ? (
            <span className="flex w-full items-center space-x-6">
              {titleElement}
              <span className="hidden sm:flex">{children}</span>
            </span>
          ) : (
            <>{titleElement}</>
          )}
          {descriptionElement}
        </div>
      )}
    </>
  )
}
