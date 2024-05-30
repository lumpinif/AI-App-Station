import { getUserData } from "@/server/auth"
import { getAppComments } from "@/server/queries/supabase/comments/app_comments"
import { User } from "@supabase/supabase-js"

import { App_Comments, Apps } from "@/types/db_tables"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CommentCard } from "@/components/comment/comment-card"
import { CommentFormButton } from "@/components/comment/comment-form-button"
import { CommentListFilter } from "@/components/comment/comment-list-filter"
import {
  EnhancedDrawer,
  EnhancedDrawerClose,
  EnhancedDrawerContent,
  EnhancedDrawerTrigger,
} from "@/components/shared/enhanced-drawer"
import { ProgressiveBlur } from "@/components/shared/progressive-blur"

import AppDetailCommentList from "./app-detail-commentList"

type CommentListProps = {
  user: User | null
  app_id: Apps["app_id"]
  c_order?: "asc" | "desc"
  orderBy?: keyof App_Comments
}

const AppDetailCommentSection = async ({
  user,
  app_id,
  c_order,
  orderBy,
}: CommentListProps) => {
  const { comments: appComments, error: getAllCommentsError } =
    await getAppComments(app_id, c_order, orderBy)

  // TODO: HANDLE NO COMMENTS AND ERROR
  if (getAllCommentsError) {
    console.error(getAllCommentsError)
  }

  if (!appComments || appComments.length === 0 || appComments === null)
    return (
      <section className="flex flex-col space-y-6 md:space-y-8">
        <div className="flex items-center space-x-4">
          <span className="font-medium tracking-wide">0 Comments</span>
          <p className="text-muted-foreground">
            Be the first one to comment ...
          </p>
        </div>
        <CommentFormButton db_row_id={app_id} />
      </section>
    )

  const commentsList =
    appComments?.map((comment) => ({
      ...comment,
      user_has_liked_comment: Array.isArray(comment.app_comment_likes)
        ? !!comment.app_comment_likes.find((like) => like.user_id === user?.id)
        : false,
      likes_count: Array.isArray(comment.app_comment_likes)
        ? comment.app_comment_likes.length
        : 0,
      user_has_commented_comment: Array.isArray(appComments)
        ? !!appComments.find(
            (reply) =>
              reply.parent_id === comment.comment_id &&
              reply.user_id === user?.id
          )
        : false,
    })) ?? []

  if (appComments && appComments.length > 0)
    return (
      <section
        className="flex w-full flex-col space-y-6 md:space-y-8"
        suppressHydrationWarning
      >
        <div className="flex w-full items-center space-x-4">
          {appComments && appComments.length > 0 && (
            <span className="font-medium tracking-wide">
              {appComments.length} Comments
            </span>
          )}
          <CommentListFilter c_order={c_order} orderBy={orderBy} />
        </div>

        <CommentFormButton db_row_id={app_id} />

        <div className="sm:hidden" id="comments-section">
          <EnhancedDrawer>
            <EnhancedDrawerTrigger asChild>
              <div className="flex flex-col space-y-2">
                <CommentCard
                  comment={commentsList[0]}
                  className="bg-muted dark:bg-muted/20 w-full cursor-pointer rounded-lg p-4"
                />
                <span className="text-muted-foreground/60 ring-offset-background cursor-pointer text-end text-xs focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
                  tap to check more
                </span>
              </div>
            </EnhancedDrawerTrigger>
            <EnhancedDrawerContent className="ring-offset-background h-4/5 max-h-[calc(100vh-2rem)] rounded-t-3xl focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
              <EnhancedDrawerClose title="Ratings & Reviews" />
              <AppDetailCommentList
                commentsList={commentsList}
                className="mb-6 w-full p-4"
              />
              <ProgressiveBlur className="h-24" />
            </EnhancedDrawerContent>
          </EnhancedDrawer>
        </div>
        <div className="hidden w-full flex-col space-y-4 sm:flex">
          <ScrollArea className="relative h-[42rem]">
            <AppDetailCommentList
              commentsList={commentsList}
              className="mb-14"
            />
            <ProgressiveBlur className="h-24" />
          </ScrollArea>
        </div>
      </section>
    )
}

export default AppDetailCommentSection
