import React from "react"
import { MessageCircle } from "lucide-react"

import { CommentActionsProp, CommentWithProfile } from "@/types/db_tables"
import { cn } from "@/lib/utils"
import useUser from "@/hooks/react-hooks/use-user"
import useAccountModal from "@/hooks/use-account-modal-store"

type CommentReplyButtonProps = Pick<
  CommentActionsProp,
  "isReplied" | "repliesCount"
> & {
  className?: string
  toggleReplying: () => void
  isFetching?: boolean
  replies: CommentWithProfile[]
}
export const CommentReplyButton: React.FC<CommentReplyButtonProps> = ({
  isReplied,
  repliesCount,
  replies,
  className,
  toggleReplying,
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

  const isUserReplied = replies?.find(
    (reply) => reply.user_id === profile?.user_id
  )

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
