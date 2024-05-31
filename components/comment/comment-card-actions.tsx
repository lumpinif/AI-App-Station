"use client"

import React from "react"

import {
  CommentActionsProp,
  CommentDeleteServiceType,
  CommentEditServiceType,
  CommentReplyServiceType,
  CommentsOfTable,
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
  commentsOf: CommentsOfTable
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
  commentsOf,
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

  const commentLikesTable =
    commentsOf === "apps" ? "app_comment_likes" : "post_comment_likes"

  const db_row_id = commentsOf === "apps" ? comment.app_id : comment.post_id

  return (
    <div className="flex w-full flex-col space-y-4">
      <div className="flex items-center gap-x-4">
        <CommentLIkeButton
          comment={comment}
          commentLikesTable={commentLikesTable}
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
          db_row_id={db_row_id}
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
          db_row_id={db_row_id}
          parent_id={comment.comment_id}
          commentReplyService={commentReplyService}
          toggleReplying={() => setReplying(!isReplying)}
          className="w-full md:max-w-xl"
        />
      )}
      {isEditing && (
        <CommentEditForm<R>
          comment={comment}
          db_row_id={db_row_id}
          setIsEditing={setIsEditing}
          comment_id={comment.comment_id}
          updateCommentService={updateCommentService}
          setOptimisticComment={setOptimisitcComment}
          className="w-full md:max-w-xl"
        />
      )}
    </div>
  )
}
