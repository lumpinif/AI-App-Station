import { getInitialComments } from "@/server/data"

import { CommentWithProfile } from "@/types/db_tables"
import { Comment } from "@/components/comment/comment"
import { CommentForm } from "@/components/comment/comment-form"
import { CommentItems } from "@/components/comment/comment-item"

type CommentListProps = {
  app_id: CommentWithProfile["app_id"]
}

const AppDetailCommentList = async ({ app_id }: CommentListProps) => {
  const { comments } = await getInitialComments(app_id)

  if (!comments) return "no comments"

  return (
    <>
      <div className="mt-4">
        <CommentForm app_id={app_id} />
      </div>
      <div className="">
        {comments.map((comment) => (
          <CommentItems key={comment.comment_id} comment={comment}>
            <Comment comment={comment} />
          </CommentItems>
        ))}
      </div>
    </>
  )
}

export default AppDetailCommentList
