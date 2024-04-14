import { getUserSession } from "@/server/auth"
import { getAllComments } from "@/server/data"

import { Comment, CommentWithProfile } from "@/types/db_tables"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CommentCard } from "@/components/comment/comment-card"
import { CommentForm } from "@/components/comment/comment-form"
import { CommentListFilter } from "@/components/comment/comment-list-filter"
import {
  EnhancedDrawer,
  EnhancedDrawerClose,
  EnhancedDrawerContent,
  EnhancedDrawerTrigger,
} from "@/components/shared/enhanced-drawer"
import { BottomBlur } from "@/components/shared/progressive-blur"

import AppDetailCommentList from "./app-detail-commentList"

type CommentListProps = {
  app_id: CommentWithProfile["app_id"]
  c_order?: "asc" | "desc"
  orderBy?: keyof Comment
}

const AppDetailCommentSection = async ({
  app_id,
  c_order,
  orderBy,
}: CommentListProps) => {
  const {
    data: { session },
  } = await getUserSession()

  // TODO: HANDLE NO COMMENTS AND ERROR
  const { comments: allComments, error } = await getAllComments(
    app_id,
    c_order,
    orderBy
  )

  if (!allComments || allComments.length === 0 || allComments === null)
    return (
      <>
        <div className="flex items-center space-x-4">
          <span className="font-medium tracking-wide">0 Comments</span>
          <p className="text-muted-foreground">
            Be the first one to comment ...
          </p>
        </div>
        <CommentForm app_id={app_id} />
      </>
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
      <section className="flex w-full flex-col space-y-6 md:space-y-8">
        <div className="flex w-full items-center space-x-4">
          {allComments && allComments.length > 0 && (
            <span className="font-medium tracking-wide">
              {allComments.length} Comments
            </span>
          )}
          <CommentListFilter c_order={c_order} orderBy={orderBy} />
        </div>

        <CommentForm app_id={app_id} />

        <div className="sm:hidden">
          <EnhancedDrawer>
            <EnhancedDrawerTrigger asChild>
              <div className="flex flex-col space-y-2">
                <CommentCard
                  comment={commentsList[0]}
                  className="w-full cursor-pointer rounded-lg bg-muted p-4 dark:bg-muted/20"
                />
                <span className="cursor-pointer text-end text-xs text-muted-foreground/60 ring-offset-background focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
                  tap to check more
                </span>
              </div>
            </EnhancedDrawerTrigger>
            <EnhancedDrawerContent className="h-4/5 max-h-[calc(100vh-2rem)] rounded-t-3xl ring-offset-background focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
              <EnhancedDrawerClose title="Ratings & Reviews" />
              <AppDetailCommentList
                commentsList={commentsList}
                className="mb-6 w-full p-4"
              />
              <BottomBlur className="h-24" />
            </EnhancedDrawerContent>
          </EnhancedDrawer>
        </div>
        <div className="hidden w-full flex-col space-y-4 sm:flex">
          <ScrollArea className="relative h-[35rem]">
            <BottomBlur className="h-24" />
            <AppDetailCommentList
              commentsList={commentsList}
              className="mb-14"
            />
          </ScrollArea>
        </div>
      </section>
    )
}

export default AppDetailCommentSection
