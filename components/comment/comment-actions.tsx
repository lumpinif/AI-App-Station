"use client"

import React from "react"

import { CommentActionsProp, CommentWithProfile } from "@/types/db_tables"
import { cn } from "@/lib/utils"

import CommentEditForm from "./comment-edit-form"
import { CommentLIkeButton } from "./comment-like-button"
import { CommentReplyButton } from "./comment-reply-button"
import CommentReplyForm from "./comment-reply-form"
import { CommentShowReplies } from "./comment-show-replies"

type CommentActionsProps = Pick<
  CommentActionsProp,
  | "isShowReplies"
  | "setisShowReplies"
  | "isEditing"
  | "isReplied"
  | "comment"
  | "repliesCount"
  | "setIsEditing"
> & {
  isFetching: boolean
  setOptimisitcComment: (newComment: CommentWithProfile) => void
}

export const CommentActions: React.FC<CommentActionsProps> = ({
  comment,
  isShowReplies,
  setisShowReplies,
  isEditing,
  setIsEditing,
  repliesCount,
  isReplied,
  isFetching,
  setOptimisitcComment,
}) => {
  const [isReplying, setReplying] = React.useState<boolean>(false)

  return (
    <div className="flex w-full flex-col">
      <div className="flex items-center gap-x-4">
        <CommentLIkeButton
          comment={comment}
          setOptimisticComment={setOptimisitcComment}
        />
        <CommentReplyButton
          className="sm:gap-x-1"
          repliesCount={repliesCount}
          isReplied={isReplied}
          isShowReplies={isShowReplies}
          toggleReplying={() => setReplying(!isReplying)}
          isFetching={isFetching}
        />
      </div>
      {isReplied && (
        <CommentShowReplies
          className="my-4"
          setisShowReplies={() => setisShowReplies(!isShowReplies)}
          isShowReplies={isShowReplies}
          repliesCount={repliesCount}
        />
      )}
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
          setisShowReplies={setisShowReplies}
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
