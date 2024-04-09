import React from "react"
import { Ellipsis, Loader, Loader2, MessageCircle } from "lucide-react"

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
      <div className={cn("flex items-center space-x-1", className)}>
        <span className="group rounded-full">
          <div onClick={handleClick}>
            <MessageCircle
              className="cursor-pointer stroke-current stroke-[1.5] text-muted-foreground group-hover:stroke-blue-500 "
              size={18}
            />
          </div>
        </span>
        {isFetching && (
          <Ellipsis className="h-4 w-4 animate-pulse text-muted-foreground" />
        )}
        {isReplied && (
          <div
            onClick={() => setisShowReplies(!isShowReplies)}
            className={cn(
              "w-fit cursor-pointer select-none text-sm text-muted-foreground hover:text-primary",
              isShowReplies ? "text-primary" : ""
            )}
          >
            {isShowReplies ? (
              <span className="text-muted-foreground underline underline-offset-4">
                Hide {repliesCount} replies
              </span>
            ) : (
              <span className="hover:underline">{repliesCount}</span>
            )}
          </div>
        )}
      </div>
    </>
  )
}
