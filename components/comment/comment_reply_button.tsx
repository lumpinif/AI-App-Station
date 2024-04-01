import React from "react"
import { MessageCircle } from "lucide-react"

import { CommentAction } from "@/types/db_tables"
import { cn } from "@/lib/utils"

import { Button } from "../ui/button"
import { Input } from "../ui/input"

type CommentReplyButtonProps = Pick<
  CommentAction,
  "comment_id" | "isReplied" | "toggleReplies" | "showReplies" | "repliesCount"
> & {
  className?: string
  toggleReplying: () => void
  isReplying: boolean
}

export const CommentReplyButton: React.FC<CommentReplyButtonProps> = ({
  className,
  repliesCount,
  isReplied,
  showReplies,
  toggleReplies,
  toggleReplying,
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
            onClick={toggleReplies}
            className={cn(
              "mt-1 w-fit cursor-pointer text-xs text-muted-foreground hover:text-primary",
              showReplies ? "text-primary" : ""
            )}
          >
            {showReplies
              ? `Hide ${repliesCount} replies`
              : `${repliesCount} replies`}
          </div>
        )}
      </div>
    </>
  )
}
