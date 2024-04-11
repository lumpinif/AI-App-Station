import { getUserSession } from "@/server/auth"
import { getAllComments } from "@/server/data/supabase"

import { CommentWithProfile } from "@/types/db_tables"
import { CommentCard } from "@/components/comment/comment-card"
import { CommentForm } from "@/components/comment/comment-form"
import {
  EnhancedDrawer,
  EnhancedDrawerClose,
  EnhancedDrawerContent,
  EnhancedDrawerTrigger,
} from "@/components/shared/enhanced-drawer"

import AppDetailCommentList from "./app-detail-commentList"

type CommentListProps = {
  app_id: CommentWithProfile["app_id"]
}

const TestAppDetailCommentSection = async ({ app_id }: CommentListProps) => {
  const {
    data: { session },
  } = await getUserSession()

  const { comments: allComments, error } = await getAllComments(app_id)

  // TODO: HANDLE NO COMMENTS
  if (!allComments || allComments.length === 0 || allComments === null)
    return (
      <div className="mt-4 space-y-4">
        <CommentForm app_id={app_id} />
        <p>Be the first one to comment ...</p>
      </div>
    )

  const commentsList =
    allComments.map((comment) => ({
      ...comment,
      user_has_liked_comment: !!comment.comment_likes.find(
        (like) => like.user_id === session?.user.id
      ),
      likes_count: comment.comment_likes.length,
    })) ?? []

  if (allComments && allComments.length > 0)
    return (
      <>
        <div className="mt-4">
          <CommentForm app_id={app_id} />
        </div>
        <div className="sm:hidden">
          <EnhancedDrawer>
            <EnhancedDrawerTrigger asChild>
              <div className="flex flex-col space-y-2">
                <CommentCard
                  comment={commentsList[0]}
                  className="w-full cursor-pointer rounded-lg bg-muted p-4 dark:bg-muted/20"
                />
                <span className="cursor-pointer text-end text-xs text-muted-foreground/60 ring-offset-background focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
                  tap to check more...
                </span>
              </div>
            </EnhancedDrawerTrigger>
            <EnhancedDrawerContent className="h-3/5 max-h-[calc(100vh-2rem)] rounded-3xl ring-offset-background focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
              <EnhancedDrawerClose title="Ratings & Reviews" />
              <AppDetailCommentList
                commentsList={commentsList}
                className="mb-6 p-4"
              />
            </EnhancedDrawerContent>
          </EnhancedDrawer>
        </div>
        <div className="hidden sm:block">
          <AppDetailCommentList commentsList={commentsList} />
        </div>
      </>
    )
}

export default TestAppDetailCommentSection
