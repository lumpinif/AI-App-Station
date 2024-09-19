"use client"

import { useEffect, useOptimistic } from "react"
import { useRouter } from "next/navigation"
import {
  addAppComment,
  deleteAppComment,
  updateAppComment,
} from "@/server/queries/supabase/comments/app_comments"
import { createSupabaseBrowserClient } from "@/utils/supabase/browser-client"

import {
  addAppCommentReturnType,
  AppCommentWithProfile,
  CommentOptimisticAction,
  deleteAppCommentReturnType,
  TSetOptimisticComment,
  updateAppCommentReturnType,
} from "@/types/db_tables"
import { cn } from "@/lib/utils"
import { CommentList } from "@/components/comment/comment-list"

type CommentListProps = {
  className?: string
  commentsList: AppCommentWithProfile[]
}

export const AppDetailCommentList: React.FC<CommentListProps> = ({
  className,
  commentsList,
}) => {
  const [optimisticComments, setOptimisticComment] = useOptimistic<
    AppCommentWithProfile[],
    CommentOptimisticAction
  >(commentsList, (currentOptimisticComments, action) => {
    switch (action.type) {
      case "update":
        if ("app_comment_likes" in action.comment) {
          // Ensure it's AppCommentWithProfile
          const index = currentOptimisticComments.findIndex(
            (comment) => comment.comment_id === action.comment.comment_id
          )

          if (index !== -1) {
            const updatedComments = [...currentOptimisticComments]
            updatedComments[index] = action.comment as AppCommentWithProfile
            return updatedComments
          }

          return [
            ...currentOptimisticComments,
            action.comment as AppCommentWithProfile,
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
          table: "app_comments",
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
        AppCommentWithProfile,
        addAppCommentReturnType,
        updateAppCommentReturnType,
        deleteAppCommentReturnType
      >
        commentsOf="apps"
        commentsList={optimisticComments}
        commentReplyService={addAppComment}
        updateCommentService={updateAppComment}
        deleteCommentService={deleteAppComment}
        setOptimisitcComment={setOptimisticComment as TSetOptimisticComment}
      />
      <span className="px-4 py-2 text-end text-xs text-muted-foreground max-sm:mb-6">
        No more comments
      </span>
    </div>
  )
}

export default AppDetailCommentList
