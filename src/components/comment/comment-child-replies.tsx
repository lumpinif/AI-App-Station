"use client"

import { useEffect, useState } from "react"

import {
  CommentDeleteServiceType,
  CommentEditServiceType,
  CommentReplyServiceType,
  CommentsOfTable,
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
  commentsOf: CommentsOfTable
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
  parent_id,
  commentsOf,
  commentsList,
  indentLevel = 0,
  setOptimisitcComment,
  commentReplyService,
  updateCommentService,
  deleteCommentService,
}: CommentChildRepliesProps<T, U, R, V>) => {
  const [isShowReplies, setIsShowReplies] = useState<boolean>(false)

  const childComments = commentsList.filter((i) => i.parent_id === parent_id)
  const repliesCount = childComments.length

  useEffect(() => {
    if (repliesCount === 0) {
      if (!isShowReplies) {
        setIsShowReplies(true)
      }
    }
  }, [isShowReplies, repliesCount])

  return (
    <>
      {repliesCount > 0 && (
        <>
          <span className="ml-16 py-2 md:pl-2">
            <CommentShowReplies
              repliesCount={repliesCount}
              isShowReplies={isShowReplies}
              setIsShowReplies={setIsShowReplies}
            />
          </span>
          {isShowReplies && (
            <CommentList<T, U, R, V>
              commentsOf={commentsOf}
              commentsList={commentsList}
              indentLevel={indentLevel + 1}
              setIsShowReplies={setIsShowReplies}
              commentReplyService={commentReplyService}
              setOptimisitcComment={setOptimisitcComment}
              updateCommentService={updateCommentService}
              deleteCommentService={deleteCommentService}
              idsToRender={childComments.map((i) => i.comment_id)}
            />
          )}
        </>
      )}
    </>
  )
}
