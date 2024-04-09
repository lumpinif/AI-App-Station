import { getUserSession } from "@/server/auth"
import { getInitialComments } from "@/server/data"

import { CommentWithProfile } from "@/types/db_tables"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Comment } from "@/components/comment/comment"
import { CommentForm } from "@/components/comment/comment-form"
import {
  EnhancedDrawer,
  EnhancedDrawerContent,
  EnhancedDrawerTrigger,
} from "@/components/shared/enhanced-drawer"

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
      <div className="sm:hidden">
        <EnhancedDrawer>
          <EnhancedDrawerTrigger asChild>
            <div className="flex flex-col space-y-2">
              <Comment
                comment={commentsList[0]}
                className="w-full cursor-pointer rounded-lg bg-muted p-4 dark:bg-muted/20"
              />
              <span className="cursor-pointer text-end text-xs text-muted-foreground/60 ring-offset-background focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
                tap to check more...
              </span>
            </div>
          </EnhancedDrawerTrigger>
          <EnhancedDrawerContent className="h-3/4 max-h-[calc(100vh-2rem)] ring-offset-background focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
            <DrawerClose title="Ratings & Reviews" />
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

export default AppDetailCommentSection
