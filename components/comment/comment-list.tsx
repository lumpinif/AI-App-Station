"use client"

import { useState } from "react"

import { Comment as CommentType, CommentWithProfile } from "@/types/db_tables"
import { cn } from "@/lib/utils"

import { CommentCard } from "./comment-card"
import { CommentCardActions } from "./comment-card-actions"
import { CommentDropDownMenu } from "./comment-dropdown-menu"
import { CommentShowReplies } from "./comment-show-replies"

type CommentListProps = {
  commentsList: CommentWithProfile[]
  idsToRender?: string[]
  indentLevel?: number
  setOptimisitcComment: (newComment: CommentWithProfile) => void
}

export function CommentList({
  commentsList: optimisticComments,
  idsToRender = [],
  indentLevel = 0,
  setOptimisitcComment,
}: CommentListProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false)

  if (!idsToRender.length) {
    idsToRender = optimisticComments
      .filter((i) => !i.parent_id)
      .map((i) => i.comment_id)
  }

  const getIsReplied = (
    commentsList: CommentWithProfile[],
    parent_id: string
  ) => {
    const childItems = commentsList.filter((i) => i.parent_id === parent_id)

    const repliesCount = childItems.length
    const isReplied = repliesCount > 0
    return isReplied
  }

  return (
    <ul
      className={cn(
        "relative flex flex-col gap-2",
        indentLevel > 0 && indentLevel <= 4 ? "ml-9 pl-2" : ""
      )}
    >
      {indentLevel > 0 && indentLevel <= 4 && (
        <span className="absolute left-0 h-full w-px sm:bg-muted sm:dark:bg-muted/10" />
      )}
      {idsToRender.map((comment_id) => {
        const comment = optimisticComments.find(
          (i) => i.comment_id === comment_id
        )

        //TODO: HANDLE NO COMMENTS
        if (!comment) return null
        return (
          <div className="flex flex-col" key={comment.comment_id}>
            <div
              className="relative flex space-x-4 rounded-lg p-4 transition-all duration-100 ease-out sm:hover:bg-muted sm:dark:hover:bg-muted/20"
              id={comment.comment_id}
            >
              <div className="flex w-full flex-col space-y-4">
                <div className="flex justify-between gap-1">
                  <div className="w-full flex-1">
                    <CommentCard comment={comment!}>
                      <CommentCardActions
                        commentsList={optimisticComments}
                        parent_id={comment!.comment_id}
                        comment={comment}
                        isEditing={isEditing}
                        isReplied={getIsReplied(
                          optimisticComments,
                          comment.comment_id
                        )}
                        setIsEditing={() => setIsEditing(!isEditing)}
                        setOptimisitcComment={setOptimisitcComment}
                      />
                    </CommentCard>
                  </div>
                  <CommentDropDownMenu
                    comment={comment}
                    setIsEditing={setIsEditing}
                    isEditing={isEditing}
                  />
                </div>
              </div>
            </div>
            <ChildReplies
              commentsList={optimisticComments}
              parent_id={comment!.comment_id}
              indentLevel={indentLevel + 1}
              setOptimisitcComment={setOptimisitcComment}
            />
          </div>
        )
      })}
      <span className="w-full px-4 py-4 text-end text-xs text-muted-foreground">
        No more comments
      </span>
    </ul>
  )
}

type ChildRepliesProps = CommentListProps & {
  parent_id: CommentType["parent_id"]
}
function ChildReplies({
  commentsList,
  parent_id,
  indentLevel = 0,
  setOptimisitcComment,
}: ChildRepliesProps) {
  const [isShowReplies, setIsShowReplies] = useState<boolean>(false)
  const childItems = commentsList.filter((i) => i.parent_id === parent_id)

  const repliesCount = childItems.length
  const isReplied = repliesCount > 0

  return (
    <>
      {isReplied && (
        <>
          <span className="ml-16 py-2 md:pl-2">
            <CommentShowReplies
              setIsShowReplies={setIsShowReplies}
              isShowReplies={isShowReplies}
              repliesCount={repliesCount}
            />
          </span>
          {isShowReplies && (
            <CommentList
              setOptimisitcComment={setOptimisitcComment}
              commentsList={commentsList}
              idsToRender={childItems.map((i) => i.comment_id)}
              indentLevel={indentLevel + 1}
            />
          )}
        </>
      )}
    </>
  )
}
