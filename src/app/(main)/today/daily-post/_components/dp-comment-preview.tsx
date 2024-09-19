import Link from "next/link"
import { useRouter } from "next/navigation"
import { addPostComment } from "@/server/queries/supabase/comments/post_comments"

import { addPostCommentReturnType, Posts } from "@/types/db_tables"
import { cn } from "@/lib/utils"
import useDailyPostComments from "@/hooks/react-hooks/use-daily-post-comments"
import useUserProfile from "@/hooks/react-hooks/use-user"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CommentCard } from "@/components/comment/comment-card"
import { CommentFormButton } from "@/components/comment/comment-form-button"
import { CommentMobileDrawer } from "@/components/comment/comment-mobile-drawer"
import StoryCommentList from "@/app/(main)/story/_components/comment/story-comment-list"

type DPCommentPreviewProps = {
  post_id: Posts["post_id"]
  created_on: Posts["created_on"]
  // c_order?: "asc" | "desc"
  // orderBy?: keyof Post_Comments
}

export const DPCommentPreview: React.FC<DPCommentPreviewProps> = ({
  post_id,
  created_on,
}) => {
  const { data: profile } = useUserProfile()
  const { data, error: useDPCError } = useDailyPostComments(post_id)

  const post_comments = data?.post_comments
  const getCommentsError = data?.getPostCommentsError

  if (!post_comments || post_comments.length === 0)
    return (
      <section className="flex flex-col space-y-6 md:space-y-8">
        <div className="flex flex-col items-center">
          <p className="text-muted-foreground">
            Be the first one to comment ...
          </p>
          <span className="font-medium tracking-wide">0 Comments</span>
        </div>
        <CommentFormButton<addPostCommentReturnType>
          db_row_id={post_id}
          commentReplyService={addPostComment}
        />
      </section>
    )

  if (getCommentsError || useDPCError) {
    console.error(getCommentsError)
    return (
      <section className="flex flex-col space-y-6 md:space-y-8">
        <div className="flex items-center space-x-4 max-sm:flex-col">
          <span className="font-medium tracking-wide">
            Error loading comments
          </span>
          <p className="text-muted-foreground">Please try again later.</p>
        </div>
        <CommentFormButton<addPostCommentReturnType>
          db_row_id={post_id}
          commentReplyService={addPostComment}
        />
      </section>
    )
  }

  const commentsList =
    post_comments?.map((comment) => ({
      ...comment,
      user_has_liked_comment: Array.isArray(comment.post_comment_likes)
        ? !!comment.post_comment_likes.find(
            (like) => like.user_id === profile?.user_id
          )
        : false,
      likes_count: Array.isArray(comment.post_comment_likes)
        ? comment.post_comment_likes.length
        : 0,
      user_has_commented_comment: Array.isArray(post_comments)
        ? !!post_comments.find(
            (reply) =>
              reply.parent_id === comment.comment_id &&
              reply.user_id === profile?.user_id
          )
        : false,
    })) ?? []

  return (
    <section
      className="flex w-full flex-col space-y-6 md:space-y-8"
      suppressHydrationWarning
    >
      {/* COMMENT SECTION HEADER */}
      <div className="flex w-full items-center space-x-4">
        <span className="font-medium tracking-wide">
          {post_comments.length} Comments
        </span>

        {/* <CommentListFilter c_order={c_order} orderBy={orderBy} /> */}
      </div>

      <CommentFormButton<addPostCommentReturnType>
        db_row_id={post_id}
        commentReplyService={addPostComment}
      />

      {/* MOBILE DRAWER */}
      <div className="sm:hidden">
        {/* <CommentMobileDrawer firstComment={commentsList[0]}>
          <StoryCommentList
            commentsList={commentsList}
            className="mb-6 w-full p-4"
          />
        </CommentMobileDrawer> */}

        {/* Trigger Link */}
        <Link
          className="w-full text-nowrap"
          href={`/today/daily-post/${created_on}/#comments-section`}
        >
          <button
            type="button"
            className="flex w-full flex-col space-y-2 active:scale-[.98]"
          >
            <CommentCard
              comment={commentsList[0]}
              className="w-full cursor-pointer rounded-lg bg-muted p-4 dark:bg-muted/20"
            />
            <span className="cursor-pointer text-end text-xs text-muted-foreground/60 ring-offset-background focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
              tap to check more
            </span>
          </button>
        </Link>
      </div>

      {/* DESKTOP COMMENT LIST*/}
      <div className="hidden w-full flex-col space-y-4 sm:flex">
        <ScrollArea
          className={cn(
            "relative h-fit pb-2",
            commentsList.length >= 5 && "h-[50rem] pb-2"
          )}
        >
          <StoryCommentList commentsList={commentsList} className="mb-14" />
        </ScrollArea>
      </div>
    </section>
  )
}
