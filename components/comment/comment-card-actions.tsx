"use client"

import React from "react"
import { addAppComment } from "@/server/queries/supabase/comments/app_comments"

import {
  App_Comments,
  AppCommentActionsProp,
  AppCommentWithProfile,
} from "@/types/db_tables"

import { CommentDropDownMenu } from "./comment-dropdown-menu"
import CommentEditForm from "./comment-edit-form"
import { CommentLIkeButton } from "./comment-like-button"
import { CommentReplyButton } from "./comment-reply-button"
import CommentReplyForm from "./comment-reply-form"

type CommentActionsProps = Pick<
  AppCommentActionsProp,
  "isReplied" | "comment"
> & {
  commentsList: AppCommentWithProfile[]
  parent_id: App_Comments["parent_id"]
  isFetching?: boolean
  setOptimisitcComment: (newComment: AppCommentWithProfile) => void
}

export const CommentCardActions: React.FC<CommentActionsProps> = ({
  comment,
  parent_id,
  isReplied,
  isFetching,
  commentsList,
  setOptimisitcComment,
}) => {
  const [isReplying, setReplying] = React.useState<boolean>(false)
  const [isEditing, setIsEditing] = React.useState<boolean>(false)

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
          comment={comment}
          className="sm:gap-x-1"
          isReplied={isReplied}
          isFetching={isFetching}
          repliesCount={repliesCount}
          toggleReplying={() => setReplying(!isReplying)}
        />
        <CommentDropDownMenu
          comment={comment}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      </div>
      {isReplying && (
        <CommentReplyForm
          parent_name={
            comment.profiles.user_name ||
            `User_${comment.profiles.user_id.slice(-5)}`
          }
          addCommentService={addAppComment}
          db_row_id={comment.app_id}
          parent_id={comment.comment_id}
          className="w-full md:max-w-xl"
          toggleReplying={() => setReplying(!isReplying)}
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
