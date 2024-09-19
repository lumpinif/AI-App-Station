import Link from "next/link"
import { MessageCircle } from "lucide-react"
import numeral from "numeral"

import { Apps } from "@/types/db_tables"
import { cn } from "@/lib/utils"

type AppCommentsBadgeProps = {
  className?: string
  app_slug: Apps["app_slug"]
  iconClassName?: string
  comments_count: Apps["comments_count"]
}

export const AppCommentsBadge: React.FC<AppCommentsBadgeProps> = ({
  app_slug,
  className,
  iconClassName,
  comments_count,
}) => {
  const commentsCount = comments_count > 0 ? comments_count : 0
  const formattedCommentsCount = numeral(commentsCount).format("0.[0]a")

  return (
    <Link
      href={`/ai-apps/${app_slug}/#ratings-and-reviews`}
      className={cn("group", className)}
    >
      <div className="m-0 flex items-center gap-x-1 p-0">
        <MessageCircle
          className={cn(
            "transition-color size-4 stroke-1 text-muted-foreground outline-none duration-200 ease-out sm:group-hover:fill-blue-500 sm:group-hover:text-blue-500",
            // TODO: IMPLEMENT THIS LATE WITH CHECK IF COMMENTED BY USER
            // commentsCount > 0 && "fill-blue-500 text-blue-500"
            iconClassName
          )}
        />
        {commentsCount > 0 ? (
          <span className="text-sm font-medium text-muted-foreground">
            {formattedCommentsCount}
          </span>
        ) : null}
      </div>
    </Link>
  )
}
