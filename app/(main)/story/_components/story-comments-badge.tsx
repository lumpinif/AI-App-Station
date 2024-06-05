import Link from "next/link"
import { MessageCircle } from "lucide-react"
import numeral from "numeral"

import { Posts, Profiles } from "@/types/db_tables"
import { cn, getPostAuthorSlug } from "@/lib/utils"

type StoryCommentsBadgeProps = {
  profile: Profiles
  className?: string
  comments_count: number
  post_id: Posts["post_id"]
}

export const StoryCommentsBadge: React.FC<StoryCommentsBadgeProps> = ({
  profile,
  post_id,
  className,
  comments_count,
}) => {
  const commentsCount = comments_count > 0 ? comments_count : 0
  const formattedCommentsCount = numeral(commentsCount).format("0.[0]a")

  // if (commentsCount === 0) return null

  const author_slug = getPostAuthorSlug(profile)

  return (
    <Link
      className={cn("group", className)}
      href={`/story/${author_slug}/${post_id}/#story-comments-section`}
    >
      <div className="m-0 flex items-center gap-x-1 p-0">
        <MessageCircle
          className={cn(
            "transition-color size-4 fill-primary stroke-current stroke-[1.5] text-muted-foreground outline-none duration-200 ease-out sm:group-hover:fill-blue-500 sm:group-hover:text-blue-500"
            // TODO: IMPLEMENT THIS LATE WITH CHECK IF COMMENTED BY USER
            // commentsCount > 0 && "fill-blue-500 text-blue-500"
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
