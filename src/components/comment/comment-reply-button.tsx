import React from "react"
import { MessageCircle } from "lucide-react"

import { CommentActionsProp, TCommentWithProfile } from "@/types/db_tables"
import { cn } from "@/lib/utils"
import useUserProfile from "@/hooks/react-hooks/use-user"
import useAccountModal from "@/hooks/use-account-modal-store"

type CommentReplyButtonProps = Pick<
  CommentActionsProp,
  "isReplied" | "repliesCount"
> & {
  comment: TCommentWithProfile
  className?: string
  toggleReplying: () => void
}
export const CommentReplyButton: React.FC<CommentReplyButtonProps> = ({
  comment,
  className,
  isReplied,
  repliesCount,
  toggleReplying,
}) => {
  const { data: profile } = useUserProfile()
  const openAccountModal = useAccountModal((state) => state.openModal)
  const isUserReplied = comment.user_has_commented_comment

  const handleClick = () => {
    if (!profile?.user_id) {
      openAccountModal()
    }
    toggleReplying()
  }

  return (
    <>
      <div className={cn("flex items-center space-x-1", className)}>
        <span className="group rounded-full">
          <div onClick={handleClick}>
            <MessageCircle
              className={cn(
                "cursor-pointer stroke-current stroke-[1.5] text-muted-foreground hover:fill-blue-500 group-hover:stroke-blue-500",
                isUserReplied && "fill-blue-500 stroke-blue-500"
              )}
              size={18}
            />
          </div>
        </span>

        {isReplied && (
          <div className={cn("w-fit cursor-default select-none text-sm")}>
            <span className="text-muted-foreground">{repliesCount}</span>
          </div>
        )}
      </div>
    </>
  )
}
