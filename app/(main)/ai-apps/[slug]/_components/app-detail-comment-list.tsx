"use client"

import { useEffect, useOptimistic } from "react"
import { useRouter } from "next/navigation"
import { createSupabaseBrowserClient } from "@/utils/supabase/browser-client"
import { useQueryClient } from "@tanstack/react-query"

import { Comment as CommentType, CommentWithProfile } from "@/types/db_tables"
import { Comment } from "@/components/comment/comment"
import { CommentItems } from "@/components/comment/comment-item"

type CommentListProps = {
  commentsList: CommentWithProfile[]
}

export const AppDetailCommentList: React.FC<CommentListProps> = ({
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
  const queryClient = useQueryClient()

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
          const payloadComment = payload.new as CommentType
          const queryKey = ["replies", payloadComment.parent_id]

          router.refresh()

          if (payloadComment.parent_id !== null)
            queryClient.invalidateQueries({ queryKey: queryKey })
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [queryClient, router, supabase])

  return (
    <>
      {optimisticComments.map((comment) => (
        <CommentItems
          key={comment.comment_id}
          comment={comment}
          setOptimisitcComment={setOptimisticComment}
        >
          <Comment comment={comment} />
        </CommentItems>
      ))}
    </>
  )
}

export default AppDetailCommentList
