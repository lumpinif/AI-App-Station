"use client"

import { useState } from "react"

import {
  CommentDeleteServiceType,
  CommentEditServiceType,
  CommentReplyServiceType,
  TCommentParentId,
  TCommentWithProfile,
} from "@/types/db_tables"

import { CommentList, CommentListProps } from "./comment-list"
import { CommentShowReplies } from "./comment-show-replies"

type CommentChildRepliesProps<
  T extends TCommentWithProfile,
  U extends (...args: any) => any,
  R extends (...args: any) => any,
  V extends (...args: any) => any,
> = CommentListProps<T, U, R, V> & {
  parent_id: TCommentParentId
  commentReplyService: CommentReplyServiceType<U>
  updateCommentService: CommentEditServiceType<R>
  deleteCommentService: CommentDeleteServiceType<V>
}

export const CommentChildReplies = <
  T extends TCommentWithProfile,
  U extends (...args: any) => any,
  R extends (...args: any) => any,
  V extends (...args: any) => any,
>({
  commentsList,
  parent_id,
  indentLevel = 0,
  setOptimisitcComment,
  commentReplyService,
  updateCommentService,
  deleteCommentService,
}: CommentChildRepliesProps<T, U, R, V>) => {
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
            <CommentList<T, U, R, V>
              setOptimisitcComment={setOptimisitcComment}
              commentsList={commentsList}
              idsToRender={childItems.map((i) => i.comment_id)}
              indentLevel={indentLevel + 1}
              commentReplyService={commentReplyService}
              updateCommentService={updateCommentService}
              deleteCommentService={deleteCommentService}
            />
          )}
        </>
      )}
    </>
  )
}
