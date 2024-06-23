import { addAppComment } from "@/server/queries/supabase/comments/app_comments"

import { addAppCommentReturnType, Apps } from "@/types/db_tables"
import { cn } from "@/lib/utils"
import useDailyAppComments from "@/hooks/react-hooks/use-daily-app-comments"
import useUserProfile from "@/hooks/react-hooks/use-user"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CommentFormButton } from "@/components/comment/comment-form-button"
import { CommentMobileDrawer } from "@/components/comment/comment-mobile-drawer"
import AppDetailCommentList from "@/app/(main)/ai-apps/[slug]/_components/comment/app-detail-comment-list"

type DACommentPreviewProps = {
  app_id: Apps["app_id"]
  // c_order?: "asc" | "desc"
  // orderBy?: keyof App_Comments
}

export const DACommentPreview: React.FC<DACommentPreviewProps> = ({
  app_id,
}) => {
  const { data: profile } = useUserProfile()
  const { data, error: useDACError } = useDailyAppComments(app_id)

  const app_comments = data?.app_comments
  const getCommentsError = data?.getAppCommentsError

  if (!app_comments || app_comments.length === 0)
    return (
      <section className="flex flex-col space-y-6 md:space-y-8">
        <div className="flex flex-col items-center">
          <p className="text-muted-foreground">
            Be the first one to comment ...
          </p>
          <span className="font-medium tracking-wide">0 Comments</span>
        </div>
        <CommentFormButton<addAppCommentReturnType>
          db_row_id={app_id}
          commentReplyService={addAppComment}
        />
      </section>
    )

  if (getCommentsError || useDACError) {
    console.error(getCommentsError)
    return (
      <section className="flex flex-col space-y-6 md:space-y-8">
        <div className="flex items-center space-x-4 max-sm:flex-col">
          <span className="font-medium tracking-wide">
            Error loading comments
          </span>
          <p className="text-muted-foreground">Please try again later.</p>
        </div>
        <CommentFormButton<addAppCommentReturnType>
          db_row_id={app_id}
          commentReplyService={addAppComment}
        />
      </section>
    )
  }

  const commentsList =
    app_comments?.map((comment) => ({
      ...comment,
      user_has_liked_comment: Array.isArray(comment.app_comment_likes)
        ? !!comment.app_comment_likes.find(
            (like) => like.user_id === profile?.user_id
          )
        : false,
      likes_count: Array.isArray(comment.app_comment_likes)
        ? comment.app_comment_likes.length
        : 0,
      user_has_commented_comment: Array.isArray(app_comments)
        ? !!app_comments.find(
            (reply) =>
              reply.parent_id === comment.comment_id &&
              reply.user_id === profile?.user_id
          )
        : false,
    })) ?? []

  return (
    <section
      id="app-comments-section"
      className="flex w-full flex-col space-y-6 md:space-y-8"
      suppressHydrationWarning
    >
      {/* COMMENT SECTION HEADER */}
      <div className="flex w-full items-center space-x-4">
        <span className="font-medium tracking-wide">
          {app_comments.length} Comments
        </span>

        {/* <CommentListFilter c_order={c_order} orderBy={orderBy} /> */}
      </div>

      <CommentFormButton<addAppCommentReturnType>
        db_row_id={app_id}
        commentReplyService={addAppComment}
      />

      {/* MOBILE DRAWER */}
      <div className="sm:hidden" id="app-comments-section">
        <CommentMobileDrawer firstComment={commentsList[0]}>
          <AppDetailCommentList
            commentsList={commentsList}
            className="mb-6 w-full p-4"
          />
        </CommentMobileDrawer>
      </div>

      {/* DESKTOP COMMENT LIST*/}
      <div className="hidden w-full flex-col space-y-4 sm:flex">
        <ScrollArea
          className={cn(
            "relative h-fit pb-2",
            commentsList.length >= 5 && "h-[50rem] pb-2"
          )}
        >
          <AppDetailCommentList commentsList={commentsList} className="mb-14" />
        </ScrollArea>
      </div>
    </section>
  )
}
