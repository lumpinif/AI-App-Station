import { Heart } from "lucide-react"
import numeral from "numeral"

import {
  CommentLikesTable,
  TCommentWithProfile,
  TSetOptimisticComment,
} from "@/types/db_tables"
import { cn } from "@/lib/utils"
import { useCommentLike } from "@/hooks/comment/use-comment-like"

type CommentLIkeButtonProps = {
  className?: string
  comment: TCommentWithProfile
  commentLikesTable: CommentLikesTable
  setOptimisticComment: TSetOptimisticComment
}

export const CommentLIkeButton: React.FC<CommentLIkeButtonProps> = ({
  comment,
  className,
  commentLikesTable = "app_comment_likes",
  setOptimisticComment,
}) => {
  const { handleLikes } = useCommentLike(
    comment,
    commentLikesTable,
    setOptimisticComment
  )

  return (
    <div className={cn("flex items-center space-x-1 md:space-x-2", className)}>
      <button className={cn("group rounded-full")} onClick={handleLikes}>
        <Heart
          className={cn(
            "transition-color text-muted-foreground stroke-current stroke-[1.5] outline-none duration-200 ease-out sm:group-hover:fill-rose-500 sm:group-hover:text-rose-500",
            comment.user_has_liked_comment && "fill-current text-rose-500"
          )}
          size={18}
        />
      </button>
      {comment.likes_count > 0 && (
        <span className="text-muted-foreground text-sm font-medium">
          {numeral(comment.likes_count).format("0.[0]a")}
        </span>
      )}
    </div>
  )
}
