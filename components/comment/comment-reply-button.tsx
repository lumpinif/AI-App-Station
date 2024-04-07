import React from "react"
import { Loader2, MessageCircle } from "lucide-react"

import { CommentActionsProp } from "@/types/db_tables"
import { cn } from "@/lib/utils"
import useUser from "@/hooks/react-hooks/use-user"
import useAccountModal from "@/hooks/use-account-modal-store"

type CommentReplyButtonProps = Pick<
  CommentActionsProp,
  "repliesCount" | "isReplied" | "isShowReplies" | "setisShowReplies"
> & {
  className?: string
  toggleReplying: () => void
  isFetching: boolean
}
export const CommentReplyButton: React.FC<CommentReplyButtonProps> = ({
  className,
  repliesCount,
  isReplied,
  isShowReplies,
  toggleReplying,
  setisShowReplies,
  isFetching,
}) => {
  const { data: profile } = useUser()
  const OpenModal = useAccountModal((state) => state.OpenModal)
  const handleClick = () => {
    if (!profile?.user_id) {
      OpenModal()
      return
    }
    toggleReplying()
    return
  }
  return (
    <>
      <div className={cn("flex items-center", className)}>
        <span className="group rounded-full p-2 hover:bg-blue-500/10">
          <div onClick={handleClick}>
            <MessageCircle
              className="cursor-pointer stroke-current stroke-[1.5] text-muted-foreground group-hover:stroke-blue-500 "
              size={20}
            />
          </div>
        </span>
        {isFetching && (
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        )}
        {isReplied && (
          <div
            onClick={() => setisShowReplies(!isShowReplies)}
            className={cn(
              "w-fit cursor-pointer select-none text-xs text-muted-foreground hover:text-primary",
              isShowReplies ? "text-primary" : ""
            )}
          >
            {isShowReplies ? (
              <span>Hide {repliesCount} replies</span>
            ) : (
              <span>{repliesCount} replies</span>
            )}
          </div>
        )}
      </div>
    </>
  )
}
