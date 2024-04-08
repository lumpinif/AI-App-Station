"use client"

import React, { useOptimistic } from "react"
import { toast } from "sonner"

import { CommentWithProfile } from "@/types/db_tables"
import { cn } from "@/lib/utils"
import { useReplies } from "@/hooks/react-hooks/use-replies-query"
import useUser from "@/hooks/react-hooks/use-user"

import { Comment } from "./comment"
import { CommentActions } from "./comment-actions"
import { CommentDropDownMenu } from "./comment-dropdown-menu"

type CommentItemsProps = {
  comment: CommentWithProfile
} & {
  depth?: number
  children: React.ReactNode
  setOptimisitcComment: (newComment: CommentWithProfile) => void
}

export const CommentItems: React.FC<CommentItemsProps> = ({
  comment,
  depth = 0,
  children,
  setOptimisitcComment,
}) => {
  const {
    data,
    error: useRepliesError,
    isFetching,
  } = useReplies(comment.comment_id)
  const [isShowReplies, setisShowReplies] = React.useState<boolean>(false)
  const [isEditing, setIsEditing] = React.useState<boolean>(false)
  const { data: profile } = useUser()

  const replies =
    data?.replies?.map((reply) => ({
      ...reply,
      user_has_liked_comment: !!reply.comment_likes.find(
        (like) => like.user_id === profile?.user_id
      ),
      likes_count: reply.comment_likes.length,
    })) ?? []

  const [optimisticReplies, setOptimisitcReply] = useOptimistic<
    CommentWithProfile[],
    CommentWithProfile
  >(replies, (currentOptimisticReplies, newReply) => {
    const newOptimisticReply = [...currentOptimisticReplies]

    const index = newOptimisticReply.findIndex(
      (reply) => reply.comment_id === newReply.comment_id
    )

    newOptimisticReply[index] = newReply
    return newOptimisticReply
  })

  const isReplied = data?.replies ? data.replies.length > 0 : false
  const repliesCount = data?.replies?.length ?? 0

  if (useRepliesError) {
    toast.error("Failed to fetch replies")
  }

  return (
    <div className={cn("flex flex-col", depth === 1 ? "ml-10" : "")}>
      <div
        className="relative flex gap-x-4 rounded-lg p-4 hover:bg-muted/10"
        id={comment.comment_id}
      >
        <div className="flex w-full flex-col space-y-2">
          <div className="flex justify-between">
            {children}
            <CommentDropDownMenu
              comment={comment}
              setIsEditing={setIsEditing}
              isEditing={isEditing}
            />
          </div>
          <div className="ml-12">
            <CommentActions
              comment={comment}
              isEditing={isEditing}
              isReplied={isReplied}
              isShowReplies={isShowReplies}
              repliesCount={repliesCount}
              setIsEditing={() => setIsEditing(!isEditing)}
              setisShowReplies={setisShowReplies}
              isFetching={isFetching}
              setOptimisitcComment={setOptimisitcComment}
            />
          </div>
        </div>
      </div>
      {isReplied && isShowReplies && (
        <div>
          {optimisticReplies.map((reply) => (
            <CommentItems
              setOptimisitcComment={setOptimisitcReply}
              key={reply.comment_id}
              comment={reply}
              depth={Math.min(depth + 1, 2)}
            >
              <Comment comment={reply} key={reply.comment_id} />
            </CommentItems>
          ))}
        </div>
      )}
    </div>
  )
}
