// components/CommentList.tsx

import { getInitialComments } from "@/server/data"

import { CommentWithProfile } from "@/types/db_tables"
import Comment from "@/components/comment/comment_new"

type CommentListProps = {
  app_id: CommentWithProfile["app_id"]
}

const CommentList = async ({ app_id }: CommentListProps) => {
  const { comments } = await getInitialComments(app_id)

  if (!comments) return "no comments"
  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <Comment key={comment.app_id} comment={comment} />
      ))}
    </div>
  )
}

export default CommentList
