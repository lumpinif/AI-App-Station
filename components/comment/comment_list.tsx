import { getInitialComments } from "@/server/data"

import { CommentWithProfile } from "@/types/db_tables"

import Comment from "./comment"

type CommentListProps = {
  app_id: CommentWithProfile["app_id"]
}

const AppDetailCommentList = async ({ app_id }: CommentListProps) => {
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

export default AppDetailCommentList
