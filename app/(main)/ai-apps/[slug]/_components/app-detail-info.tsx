import Link from "next/link"
import { Rating } from "@mui/material"
import { Star } from "lucide-react"

import { AppDetails } from "@/types/db_tables"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

import { AppCommentsBadge } from "../../_components/cards/_components/app-comments-badge"

type AppDetailInfoProps = {
  data: AppDetails
  className?: string
  rating_score: number
  rating_count: number
}

export const AppDetailInfo: React.FC<AppDetailInfoProps> = ({
  data: app,
  className,
  rating_score,
  rating_count,
}) => {
  return (
    <>
      <div className={cn("w-full space-y-6", className)}>
        <div className="flex w-full items-center justify-between">
          <span className="flex space-x-1 text-sm text-muted-foreground">
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
          <span className="text-xs text-muted-foreground">{app.pricing}</span>
        </div>
        <div className="flex items-center space-x-2 overflow-x-auto">
          <Rating
            readOnly
            name="read-only"
            size="small"
            value={4.5}
            precision={0.5}
            emptyIcon={<Star className="fill-muted stroke-0" size={18} />}
          />
          <div className="text-nowrap text-xs">
            {rating_score} • {rating_count} Ratings
          </div>

          <AppCommentsBadge
            app_slug={app.app_slug}
            comments_count={app.comments_count}
          />

          <span className="flex items-center gap-x-1  text-sm">
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
      </div>
    </>
  )
}
