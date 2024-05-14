import Link from "next/link"

import { Apps } from "@/types/db_tables"
import { cn } from "@/lib/utils"

type AppTitleWithDescriptionProps = {
  app_slug: Apps["app_slug"]
  app_title: Apps["app_title"]
  description: Apps["description"]
  className?: string
  titleSize?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl"
  titleFont?: "semi-bold" | "bold" | "medium" | "regular" | "light"
  descriptionSize?: "sm" | "base" | "md" | "lg"
  descriptionFont?: "bold" | "semi-bold" | "medium" | "regular" | "light"
  isTruncate?: boolean
  isLink?: boolean
  titleClassname?: string
  descriptionClassname?: string
  children?: React.ReactNode
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
  children,
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
        "text-muted-foreground cursor-default",
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
            className="w-fit active:text-blue-600 sm:hover:text-blue-500"
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
