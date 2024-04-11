import { CommentActionsProp } from "@/types/db_tables"
import { cn } from "@/lib/utils"

type CommentShowRepliesProps = Pick<
  CommentActionsProp,
  "repliesCount" | "isShowReplies" | "setIsShowReplies"
> & {
  className?: string
}

export const CommentShowReplies: React.FC<CommentShowRepliesProps> = ({
  className,
  setIsShowReplies,
  repliesCount,
  isShowReplies,
}) => {
  return (
    <div
      onClick={() => setIsShowReplies(!isShowReplies)}
      className={cn(
        "w-fit cursor-pointer select-none text-sm text-muted-foreground hover:text-primary",
        isShowReplies ? "text-primary" : "",
        className
      )}
    >
      {isShowReplies ? (
        <span className="text-blue-500 underline-offset-4 sm:text-blue-500/80 sm:hover:text-blue-500">
          Hide {repliesCount}{" "}
          {repliesCount > 1 ? <span>replies</span> : <span>reply</span>}
        </span>
      ) : (
        <span className="text-blue-500/80 underline-offset-4 sm:hover:text-blue-500">
          Show {repliesCount}{" "}
          {repliesCount > 1 ? <span>Replies</span> : <span>Reply</span>}
        </span>
      )}
    </div>
  )
}
