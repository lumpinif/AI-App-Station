"use client"

import React from "react"

import {
  CommentActionsProp,
  CommentDeleteServiceType,
  CommentEditServiceType,
  CommentReplyServiceType,
  TCommentParentId,
  TCommentWithProfile,
  TSetOptimisticComment,
} from "@/types/db_tables"

import { CommentDropDownMenu } from "./comment-dropdown-menu"
import CommentEditForm from "./comment-edit-form"
import { CommentLIkeButton } from "./comment-like-button"
import { CommentReplyButton } from "./comment-reply-button"
import CommentReplyForm from "./comment-reply-form"

type CommentActionsProps<
  U extends (...args: any) => any,
  R extends (...args: any) => any,
  V extends (...args: any) => any,
> = Pick<CommentActionsProp, "isReplied"> & {
  comment: TCommentWithProfile
  commentsList: TCommentWithProfile[]
  parent_id: TCommentParentId
  isFetching?: boolean
  setOptimisitcComment: TSetOptimisticComment
  commentReplyService: CommentReplyServiceType<U>
  updateCommentService: CommentEditServiceType<R>
  deleteCommentService: CommentDeleteServiceType<V>
}

export const CommentCardActions = <
  U extends (...args: any) => any,
  R extends (...args: any) => any,
  V extends (...args: any) => any,
>({
  comment,
  parent_id,
  isReplied,
  isFetching,
  commentsList,
  setOptimisitcComment,
  commentReplyService,
  updateCommentService,
  deleteCommentService,
}: CommentActionsProps<U, R, V>) => {
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
        <CommentDropDownMenu<V>
          comment={comment}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          deleteCommentService={deleteCommentService}
        />
      </div>
      {isReplying && (
        <CommentReplyForm<U>
          parent_name={
            comment.profiles.user_name ||
            `User_${comment.profiles.user_id.slice(-5)}`
          }
          db_row_id={comment.app_id}
          parent_id={comment.comment_id}
          commentReplyService={commentReplyService}
          toggleReplying={() => setReplying(!isReplying)}
          className="w-full md:max-w-xl"
        />
      )}
      {isEditing && (
        <CommentEditForm<R>
          comment={comment}
          db_row_id={comment.app_id}
          setIsEditing={setIsEditing}
          parent_id={comment.parent_id}
          comment_id={comment.comment_id}
          updateCommentService={updateCommentService}
          className="w-full md:max-w-xl"
        />
      )}
    </div>
  )
}
