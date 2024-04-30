"use client"

import { useEffect, useOptimistic } from "react"
import { useRouter } from "next/navigation"
import { createSupabaseBrowserClient } from "@/utils/supabase/browser-client"

import { CommentWithProfile } from "@/types/db_tables"
import { cn } from "@/lib/utils"
import { CommentList } from "@/components/comment/comment-list"

type CommentListProps = {
  commentsList: CommentWithProfile[]
} & {
  className?: string
}

export const AppDetailCommentList: React.FC<CommentListProps> = ({
  className,
  commentsList,
}) => {
  const [optimisticComments, setOptimisticComment] = useOptimistic<
    CommentWithProfile[],
    CommentWithProfile
  >(commentsList, (currentOptimisticComments, newComment) => {
    const newOptimisticComment = [...currentOptimisticComments]

    const index = newOptimisticComment.findIndex(
      (comment) => comment.comment_id === newComment.comment_id
    )

    newOptimisticComment[index] = newComment
    return newOptimisticComment
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
      <CommentList
        commentsList={optimisticComments}
        setOptimisitcComment={setOptimisticComment}
      />
      <span className="text-muted-foreground px-4 py-2 text-end text-xs max-sm:mb-6">
        No more comments
      </span>
    </div>
  )
}

export default AppDetailCommentList
