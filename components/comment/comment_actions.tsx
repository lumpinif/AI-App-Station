import React from "react"

import { CommentActionsProp } from "@/types/db_tables"

import CommentEditForm from "./comment_edit_form"
import { CommentReplyButton } from "./comment_reply_button"
import CommentReplyForm from "./comment_reply_form"
import { CommentLikeButton } from "./comment-like-button"

export const CommentActions: React.FC<CommentActionsProp> = ({
  comment,
  isShowReplies,
  setisShowReplies,
  isEditing,
  setIsEditing,
  repliesCount,
  isReplied,
}) => {
  const [isReplying, setReplying] = React.useState<boolean>(false)
  return (
    <div className="flex w-full flex-col">
      <div className="flex items-center gap-x-2 md:gap-x-4">
        <CommentLikeButton
          className="sm:gap-x-1"
          comment_id={comment.comment_id}
          likes_count={comment.likes_count}
        />
        <CommentReplyButton
          className="sm:gap-x-1"
          repliesCount={repliesCount}
          isReplied={isReplied}
          isShowReplies={isShowReplies}
          setisShowReplies={() => setisShowReplies(!isShowReplies)}
          toggleReplying={() => setReplying(!isReplying)}
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
          setisShowReplies={setisShowReplies}
        />
      )}
      {isEditing && (
        <CommentEditForm
          comment_id={comment.comment_id}
          comment={comment.comment}
          app_id={comment.app_id}
          className="w-full md:max-w-xl"
          setIsEditing={setIsEditing}
        />
      )}

      {/* <div className="flex flex-1 items-center gap-x-1">
        <span className="group rounded-full p-2 hover:bg-purple-500/10">
          <BarChart2
            className="stroke-current stroke-[1.5] text-muted-foreground group-hover:stroke-purple-500 "
            size={20}
          />
        </span>
        {views_count && (
          <span className="mt-1 text-xs text-muted-foreground">
            {views_count}
          </span>
        )}
      </div> */}
      {/* <span className="group rounded-full p-2 hover:bg-green-500/10">
        <Share
          className="stroke-current stroke-[1.5] text-muted-foreground group-hover:stroke-green-500 "
          size={20}
        />
      </span> */}
    </div>
  )
}
