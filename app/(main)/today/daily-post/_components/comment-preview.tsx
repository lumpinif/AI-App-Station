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
import useUserProfile from "@/hooks/react-hooks/use-user"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CommentFormButton } from "@/components/comment/comment-form-button"
import { CommentListFilter } from "@/components/comment/comment-list-filter"
import { CommentMobileDrawer } from "@/components/comment/comment-mobile-drawer"
import { ProgressiveBlur } from "@/components/shared/progressive-blur"
import StoryCommentList from "@/app/(main)/story/_components/comment/story-comment-list"

type CommentPreviewProps = {
  post_id: Posts["post_id"]
  c_order?: "asc" | "desc"
  orderBy?: keyof Post_Comments
}

export const CommentPreview: React.FC<CommentPreviewProps> = ({
  post_id,
  c_order,
  orderBy,
}) => {
  const { data: profile } = useUserProfile()

  if (true)
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

  return (
    <section
      id="story-comments-section"
      className="flex w-full flex-col space-y-6 md:space-y-8"
      suppressHydrationWarning
    ></section>
  )
}
