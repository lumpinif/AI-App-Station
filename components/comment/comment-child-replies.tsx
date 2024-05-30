"use client"

import { useState } from "react"

import { TCommentParentId } from "@/types/db_tables"

import { CommentList, CommentListProps } from "./comment-list"
import { CommentShowReplies } from "./comment-show-replies"

type CommentChildRepliesProps = CommentListProps & {
  parent_id: TCommentParentId
}

export const CommentChildReplies: React.FC<CommentChildRepliesProps> = ({
  commentsList,
  parent_id,
  indentLevel = 0,
  setOptimisitcComment,
}) => {
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
