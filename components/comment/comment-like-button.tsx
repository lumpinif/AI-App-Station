import { ThumbsDown, ThumbsUp } from "lucide-react"

import { CommentAction } from "@/types/db_tables"
import { cn } from "@/lib/utils"

type CommentLikeButtonProps = Pick<
  CommentAction,
  "comment_id" | "likes_count"
> & {
  className?: string
}

export const CommentLikeButton: React.FC<CommentLikeButtonProps> = ({
  className,
  comment_id,
  likes_count,
}) => {
  return (
    <>
      <div className={cn("flex items-center", className)}>
        <span className="group rounded-full p-2 hover:bg-rose-500/10">
          <ThumbsUp
            className="stroke-current stroke-[1.5] text-muted-foreground group-hover:stroke-rose-500 "
            size={20}
          />
        </span>
        {likes_count && (
          <span className="mt-1 text-xs text-muted-foreground">
            {likes_count}
          </span>
        )}
      </div>
      <div className={cn("flex items-center", className)}>
        <span className="group rounded-full p-2 hover:bg-rose-500/10">
          <ThumbsDown
            className="stroke-current stroke-[1.5] text-muted-foreground group-hover:stroke-rose-500 "
            size={20}
          />
        </span>
        {likes_count && (
          <span className="mt-1 text-xs text-muted-foreground">
            {likes_count}
          </span>
        )}
      </div>
    </>
  )
}
