import {
  addPostComment,
  getPostComments,
} from "@/server/queries/supabase/comments/post_comments"
import { User } from "@supabase/supabase-js"

import {
  addPostCommentReturnType,
  Post_Comments,
  Posts,
} from "@/types/db_tables"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CommentFormButton } from "@/components/comment/comment-form-button"
import { CommentListFilter } from "@/components/comment/comment-list-filter"
import { CommentMobileDrawer } from "@/components/comment/comment-mobile-drawer"
import { ProgressiveBlur } from "@/components/shared/progressive-blur"

import StoryCommentList from "./story-comment-list"

type CommentListProps = {
  user: User | null
  post_id: Posts["post_id"]
  c_order?: "asc" | "desc"
  orderBy?: keyof Post_Comments
}

const StoryCommentSection = async ({
  user,
  post_id,
  c_order,
  orderBy,
}: CommentListProps) => {
  const { comments: postComments, error: getAllCommentsError } =
    await getPostComments(post_id, c_order, orderBy)

  // TODO: HANDLE NO COMMENTS AND ERROR
  if (getAllCommentsError) {
    console.error(getAllCommentsError)
    // return (
    //   <section className="flex flex-col space-y-6 md:space-y-8">
    //     <div className="flex items-center space-x-4">
    //       <span className="font-medium tracking-wide">Error loading comments</span>
    //       <p className="text-muted-foreground">
    //         Please try again later.
    //       </p>
    //     </div>
    //     <CommentFormButton<addPostCommentReturnType>
    //       db_row_id={post_id}
    //       commentReplyService={addPostComment}
    //     />
    //   </section>
    // )
  }

  if (!postComments || postComments.length === 0)
    return (
      <section className="flex flex-col space-y-6 md:space-y-8">
        <div className="flex items-center space-x-4">
          <span className="font-medium tracking-wide">0 Comments</span>
          <p className="text-muted-foreground">
            Be the first one to comment ...
          </p>
        </div>
        <CommentFormButton<addPostCommentReturnType>
          db_row_id={post_id}
          commentReplyService={addPostComment}
        />
      </section>
    )

  const commentsList =
    postComments?.map((comment) => ({
      ...comment,
      user_has_liked_comment: Array.isArray(comment.post_comment_likes)
        ? !!comment.post_comment_likes.find((like) => like.user_id === user?.id)
        : false,
      likes_count: Array.isArray(comment.post_comment_likes)
        ? comment.post_comment_likes.length
        : 0,
      user_has_commented_comment: Array.isArray(postComments)
        ? !!postComments.find(
            (reply) =>
              reply.parent_id === comment.comment_id &&
              reply.user_id === user?.id
          )
        : false,
    })) ?? []

  return (
    <section
      id="story-comments-section"
      className="flex w-full flex-col space-y-6 md:space-y-8"
      suppressHydrationWarning
    >
      {/* COMMENT SECTION HEADER */}
      <div className="flex w-full items-center space-x-4">
        <span className="font-medium tracking-wide">
          {postComments.length} Comments
        </span>

        <CommentListFilter c_order={c_order} orderBy={orderBy} />
      </div>

      <CommentFormButton<addPostCommentReturnType>
        db_row_id={post_id}
        commentReplyService={addPostComment}
      />

      {/* MOBILE DRAWER */}
      <div className="sm:hidden" id="story-comments-section">
        <CommentMobileDrawer firstComment={commentsList[0]}>
          <StoryCommentList
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
          <StoryCommentList commentsList={commentsList} className="mb-14" />
          <ProgressiveBlur className="h-24" />
        </ScrollArea>
      </div>
    </section>
  )
}

export default StoryCommentSection
