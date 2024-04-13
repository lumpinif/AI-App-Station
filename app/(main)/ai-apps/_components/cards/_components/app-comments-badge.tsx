import Link from "next/link"
import { MessageCircle } from "lucide-react"
import numeral from "numeral"

import { App } from "@/types/db_tables"
import { cn } from "@/lib/utils"

type AppCommentsBadgeProps = {
  app_slug: App["app_slug"]
  comments_count: number
  className?: string
}

export const AppCommentsBadge: React.FC<AppCommentsBadgeProps> = ({
  comments_count,
  app_slug,
  className,
}) => {
  const commentsCount = comments_count > 0 ? comments_count : 0
  const formattedCommentsCount = numeral(commentsCount).format("0.[0]a")

  return (
    <>
      <Link
        href={`/ai-apps/${app_slug}/#ratings-and-reviews`}
        className={cn("group hover:underline", className)}
      >
        <div className="m-0 flex items-center gap-x-1 p-0">
          <MessageCircle
            className="stroke-muted-foreground stroke-1 group-hover:fill-muted dark:stroke-muted dark:group-hover:fill-muted"
            size={16}
          />
          {commentsCount > 0 ? (
            <span className="text-xs">{formattedCommentsCount}</span>
          ) : null}
        </div>
      </Link>
    </>
  )
}
