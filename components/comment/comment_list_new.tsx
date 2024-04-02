// components/CommentList.tsx

import { CommentWithProfile } from "@/types/db_tables"

import Comment from "./comment_new"

type CommentListProps = {
  comments: CommentWithProfile[]
}

const CommentList = ({ comments }: CommentListProps) => {
  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <Comment key={comment.app_id} comment={comment} />
      ))}
    </div>
  )
}

export default CommentList
