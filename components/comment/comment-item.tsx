"use client"

import React from "react"
import { toast } from "sonner"

import { CommentWithProfile } from "@/types/db_tables"
import { cn } from "@/lib/utils"
import { useReplies } from "@/hooks/react-hooks/use-replies-query"

import { Comment } from "./comment"
import { CommentActions } from "./comment-actions"
import { CommentDropDownMenu } from "./comment-dropdown-menu"

type CommentItemsProps = {
  comment: CommentWithProfile
} & {
  depth?: number
  children: React.ReactNode
}

export const CommentItems: React.FC<CommentItemsProps> = ({
  comment,
  depth = 0,
  children,
}) => {
  const [isShowReplies, setisShowReplies] = React.useState<boolean>(false)
  const [isEditing, setIsEditing] = React.useState<boolean>(false)
  const { data, error, isFetching } = useReplies(comment.comment_id)
  const isReplied = data?.replies ? data?.replies.length > 0 : false
  const repliesCount = data?.replies ? data?.replies.length : 0

  if (error) {
    toast.error("Failed to fetch replies")
  }

  return (
    <div className={cn("flex flex-col", depth === 1 ? "ml-10" : "")}>
      <div
        className="relative flex gap-x-4 rounded-lg p-4 hover:bg-muted/10"
        id={comment.comment_id}
      >
        <div className="flex w-full flex-col">
          <div className="flex justify-between">
            {children}
            <CommentDropDownMenu
              comment={comment}
              setIsEditing={setIsEditing}
              isEditing={isEditing}
            />
          </div>
          <div className="ml-10">
            <CommentActions
              comment={comment}
              isEditing={isEditing}
              isReplied={isReplied}
              isShowReplies={isShowReplies}
              repliesCount={repliesCount}
              setIsEditing={() => setIsEditing(!isEditing)}
              setisShowReplies={setisShowReplies}
              isFetching={isFetching}
            />
          </div>
        </div>
      </div>
      {isReplied && isShowReplies && (
        <div>
          {data?.replies &&
            data.replies.map((reply) => (
              <CommentItems
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

{
  /* {isReplied && isShowReplies && (
      <>
        {depth === 0 ? (
          <>
            <span className="absolute -bottom-1 left-1/2 right-1/2 h-full w-0.5 translate-x-[0.5px] border-l" />
            <span className="absolute -bottom-1 right-0 h-0.5 w-1/2 translate-x-[0.5px] border-b" />
            <span className="absolute -bottom-6 right-0 h-1/6 w-0.5 translate-x-[0.5px] border-r" />
          </>
        ) : (
          <span className="absolute left-1/2 right-1/2 top-11 h-[calc(100%-1rem)] w-0.5 translate-x-[0.5px] border-l" />
        )}
      </>
    )} */
}
