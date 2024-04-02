import React from "react"
import { MessageCircle } from "lucide-react"

import { CommentActionsProp } from "@/types/db_tables"
import { cn } from "@/lib/utils"

type CommentReplyButtonProps = Omit<
  CommentActionsProp,
  "comment" | "isEditing" | "setIsEditing"
> & {
  toggleReplying: () => void
}
export const CommentReplyButton: React.FC<CommentReplyButtonProps> = ({
  className,
  repliesCount,
  isReplied,
  isShowReplies,
  toggleReplying,
  setisShowReplies,
}) => {
  return (
    <>
      <div className={cn("flex items-center", className)}>
        <span className="group rounded-full p-2 hover:bg-blue-500/10">
          <div onClick={toggleReplying}>
            <MessageCircle
              className="stroke-current stroke-[1.5] text-muted-foreground group-hover:stroke-blue-500 "
              size={20}
            />
          </div>
        </span>
        {isReplied && (
          <div
            onClick={setisShowReplies}
            className={cn(
              "mt-1 w-fit cursor-pointer text-xs text-muted-foreground hover:text-primary",
              isShowReplies ? "text-primary" : ""
            )}
          >
            {isShowReplies
              ? `Hide ${repliesCount} replies`
              : `${repliesCount} replies`}
          </div>
        )}
      </div>
    </>
  )
}
