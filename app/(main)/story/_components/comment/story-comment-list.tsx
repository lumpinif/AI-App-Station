"use client"

import { useEffect, useOptimistic } from "react"
import { useRouter } from "next/navigation"
import {
  addPostComment,
  deletePostComment,
  updatePostComment,
} from "@/server/queries/supabase/comments/post_comments"
import { createSupabaseBrowserClient } from "@/utils/supabase/browser-client"

import {
  addPostCommentReturnType,
  CommentOptimisticAction,
  deletePostCommentReturnType,
  PostCommentWithProfile,
  updatePostCommentReturnType,
} from "@/types/db_tables"
import { cn } from "@/lib/utils"
import { CommentList } from "@/components/comment/comment-list"

type CommentListProps = {
  className?: string
  commentsList: PostCommentWithProfile[]
}

export const StoryCommentList: React.FC<CommentListProps> = ({
  className,
  commentsList,
}) => {
  const [optimisticComments, setOptimisticComment] = useOptimistic<
    PostCommentWithProfile[],
    CommentOptimisticAction
  >(commentsList, (currentOptimisticComments, action) => {
    switch (action.type) {
      case "update":
        if ("post_comment_likes" in action.comment) {
          // Ensure it's PostCommentWithProfile
          const index = currentOptimisticComments.findIndex(
            (comment) => comment.comment_id === action.comment.comment_id
          )

          if (index !== -1) {
            const updatedComments = [...currentOptimisticComments]
            updatedComments[index] = action.comment as PostCommentWithProfile
            return updatedComments
          }

          return [
            ...currentOptimisticComments,
            action.comment as PostCommentWithProfile,
          ]
        }
        return currentOptimisticComments

      case "delete":
        return currentOptimisticComments.filter(
          (comment) => comment.comment_id !== action.comment_id
        )

      default:
        return currentOptimisticComments
    }
  })

  const router = useRouter()
  const supabase = createSupabaseBrowserClient()

  //Real-time subscribtion to initial comments
  useEffect(() => {
    const channel = supabase
      .channel("realtime initial comments")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "post_comments",
        },
        (payload) => {
          router.refresh()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [router, supabase])

  return (
    <div
      className={cn("flex w-full flex-col", className)}
      suppressHydrationWarning
    >
      <CommentList<
        PostCommentWithProfile,
        addPostCommentReturnType,
        updatePostCommentReturnType,
        deletePostCommentReturnType
      >
        commentsOf="posts"
        commentsList={optimisticComments}
        commentReplyService={addPostComment}
        updateCommentService={updatePostComment}
        deleteCommentService={deletePostComment}
        setOptimisitcComment={setOptimisticComment}
      />
      <span className="text-muted-foreground px-4 py-2 text-end text-xs max-sm:mb-6">
        No more comments
      </span>
    </div>
  )
}

export default StoryCommentList
