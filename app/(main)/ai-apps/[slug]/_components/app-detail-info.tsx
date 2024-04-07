import Link from "next/link"
import { Rating } from "@mui/material"
import { Star } from "lucide-react"

import { AppDetails } from "@/types/db_tables"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

import { AppCommentsBadge } from "../../_components/cards/_components/app-comments-badge"
import { AppTitleWithDescription } from "../../_components/cards/_components/app-title-description"

type AppDetailInfoProps = {
  data: AppDetails
  className?: string
}

export const AppDetailInfo: React.FC<AppDetailInfoProps> = ({
  data: app,
  className,
}) => {
  return (
    <>
      <div className={cn("", className)}>
        <div className="flex flex-col gap-y-2">
          <AppTitleWithDescription
            {...app}
            className="tracking-tight sm:tracking-wide sm:[&>*:nth-child(1)]:hover:no-underline"
            titleSize="3xl"
            titleClassname="md:text-4xl xl:text-5xl"
            titleFont="bold"
            descriptionSize="base"
            isTruncate={false}
            isLink={false}
          />
          <span className="flex w-full gap-x-1 text-sm text-muted-foreground">
            {app.developers && app.developers.length > 0 ? (
              app.developers.map((dev) => (
                <span
                  key={dev.developer_name}
                  className="flex items-center gap-x-1 "
                >
                  <Badge>
                    {dev.developer_slug ? (
                      <Link href={dev.developer_slug}>
                        {dev.developer_name}
                      </Link>
                    ) : (
                      <span>{dev.developer_name}</span>
                    )}
                  </Badge>
                </span>
              ))
            ) : (
              <Badge variant={"secondary"}>
                <span>Unknow Developer</span>
              </Badge>
            )}
          </span>
          <span className="text-muted-foreground">{app.pricing}</span>
        </div>
        <div className="flex items-center gap-x-2 pt-1">
          <div className="flex flex-col space-y-2">
            <Rating
              readOnly
              name="read-only"
              size="small"
              value={4.5}
              precision={0.5}
              emptyIcon={<Star className="fill-muted stroke-0" size={18} />}
            />
            <div className="flex items-center space-x-2">
              <AppCommentsBadge />
              <div className="text-nowrap text-xs">4.7 • 161 Ratings</div>
            </div>
          </div>
        </div>
        <span className="flex items-center gap-x-1 text-sm ">
          <div className="hover:nav-link text-blue-600">
            <a href={app.app_url || ""}>{app.app_url}</a>
          </div>
          <span className="flex items-center gap-x-1 text-muted-foreground">
            {app.categories && app.categories.length > 0 ? (
              app.categories?.map((category, index) => (
                <span
                  key={category.category_id}
                  className="flex items-center gap-x-1"
                >
                  <Link
                    href={`/ai-apps/categories/${category.slug}`}
                    className="hover:underline"
                  >
                    <span className="text-xs">{category.category_title}</span>
                  </Link>
                  {app.categories && index !== app.categories.length - 1 && (
                    <div className="h-1 w-1 rounded-full bg-muted-foreground" />
                  )}
                </span>
              ))
            ) : (
              <span className="text-xs">No Category</span>
            )}
          </span>
        </span>
      </div>
    </>
  )
}
