"use client"

import { useOptimistic } from "react"

import { CommentWithProfile } from "@/types/db_tables"
import { Comment } from "@/components/comment/comment"
import { CommentItems } from "@/components/comment/comment-item"

type CommentListProps = {
  commentsList: CommentWithProfile[]
}

export const AppDetailCommentList: React.FC<CommentListProps> = ({
  commentsList,
}) => {
  const [optimisticComments, setOptimisticComment] = useOptimistic<
    CommentWithProfile[],
    CommentWithProfile
  >(commentsList, (currentOptimisticComments, newComment) => {
    const newOptimisticComment = [...currentOptimisticComments]

    const index = newOptimisticComment.findIndex(
      (comment) => comment.comment_id === newComment.comment_id
    )

    newOptimisticComment[index] = newComment
    return newOptimisticComment
  })
  return (
    <>
      {optimisticComments.map((comment) => (
        <CommentItems
          key={comment.comment_id}
          comment={comment}
          setOptimisitcComment={setOptimisticComment}
        >
          <Comment comment={comment} />
        </CommentItems>
      ))}
    </>
  )
}

export default AppDetailCommentList
