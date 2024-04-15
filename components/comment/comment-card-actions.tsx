"use client"

import React from "react"

import {
  Comment,
  CommentActionsProp,
  CommentWithProfile,
} from "@/types/db_tables"

import CommentEditForm from "./comment-edit-form"
import { CommentLIkeButton } from "./comment-like-button"
import { CommentReplyButton } from "./comment-reply-button"
import CommentReplyForm from "./comment-reply-form"

type CommentActionsProps = Pick<
  CommentActionsProp,
  "isEditing" | "isReplied" | "comment" | "setIsEditing"
> & {
  commentsList: CommentWithProfile[]
  parent_id: Comment["parent_id"]
  isFetching?: boolean
  setOptimisitcComment: (newComment: CommentWithProfile) => void
}

export const CommentCardActions: React.FC<CommentActionsProps> = ({
  commentsList,
  parent_id,
  comment,
  isEditing,
  setIsEditing,
  isFetching,
  setOptimisitcComment,
}) => {
  const [isReplying, setReplying] = React.useState<boolean>(false)

  const childItems = commentsList.filter((i) => i.parent_id === parent_id)

  const repliesCount = childItems.length

  return (
    <div className="flex w-full flex-col space-y-4">
      <div className="flex items-center gap-x-4">
        <CommentLIkeButton
          comment={comment}
          setOptimisticComment={setOptimisitcComment}
        />
        <CommentReplyButton
          className="sm:gap-x-1"
          replies={childItems}
          repliesCount={repliesCount}
          toggleReplying={() => setReplying(!isReplying)}
          isFetching={isFetching}
        />
      </div>
      {isReplying && (
        <CommentReplyForm
          parent_name={
            comment.profiles.display_name ||
            `User_${comment.profiles.user_id.slice(-5)}`
          }
          app_id={comment.app_id}
          parent_id={comment.comment_id}
          className="w-full md:max-w-xl"
          toggleReplying={() => setReplying(!isReplying)}
          // setIsShowReplies={setIsShowReplies}
        />
      )}
      {isEditing && (
        <CommentEditForm
          comment={comment}
          parent_id={comment.parent_id}
          comment_id={comment.comment_id}
          app_id={comment.app_id}
          className="w-full md:max-w-xl"
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  )
}
