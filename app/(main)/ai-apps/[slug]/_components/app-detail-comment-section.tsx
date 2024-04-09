import { getUserSession } from "@/server/auth"
import { getInitialComments } from "@/server/data"

import { CommentWithProfile } from "@/types/db_tables"
import { CommentForm } from "@/components/comment/comment-form"

import AppDetailCommentList from "./app-detail-comment-list"

type CommentListProps = {
  app_id: CommentWithProfile["app_id"]
}

const AppDetailCommentSection = async ({ app_id }: CommentListProps) => {
  const {
    data: { session },
  } = await getUserSession()
  const { comments } = await getInitialComments(app_id)
  // TODO: HANDLE NO COMMENTS
  if (!comments) return "no comments"

  const commentsList =
    comments.map((comment) => ({
      ...comment,
      user_has_liked_comment: !!comment.comment_likes.find(
        (like) => like.user_id === session?.user.id
      ),
      likes_count: comment.comment_likes.length,
    })) ?? []

  return (
    <>
      <div className="mt-4">
        <CommentForm app_id={app_id} />
      </div>
      <AppDetailCommentList commentsList={commentsList} />
    </>
  )
}

export default AppDetailCommentSection
