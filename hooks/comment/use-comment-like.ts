import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { createSupabaseBrowserClient } from "@/utils/supabase/browser-client"
import { toast } from "sonner"
import { useDebouncedCallback } from "use-debounce"

import {
  CommentLikesTable,
  Profiles,
  TCommentWithProfile,
  TSetOptimisticComment,
} from "@/types/db_tables"

import useUserProfile from "../react-hooks/use-user"
import useAccountModal from "../use-account-modal-store"

export const useCommentLike = (
  comment: TCommentWithProfile,
  commentLikesTable: CommentLikesTable,
  setOptimisticComment: TSetOptimisticComment
) => {
  const supabase = createSupabaseBrowserClient()
  const [isPending, startTransition] = useTransition()
  const openAccountModal = useAccountModal((state) => state.openModal)
  const router = useRouter()
  const { data: profile } = useUserProfile()

  const handleLikeToggleDebounced = useDebouncedCallback(
    async (profile: Profiles, isLiked: boolean) => {
      if (isLiked) {
        const { error: removeLikeError } = await supabase
          .from(commentLikesTable)
          .delete()
          .match({ comment_id: comment.comment_id, user_id: profile.user_id })
        if (removeLikeError) {
          toast.error("Failed to remove like. Please try again.")
        }
      } else {
        const { error: addLikeError } = await supabase
          .from(commentLikesTable)
          .insert({ comment_id: comment.comment_id, user_id: profile.user_id })
        if (addLikeError) {
          toast.error("Failed to like. Please try again.")
        }
      }
    },
    1000,
    { leading: true, trailing: true }
  )

  const handleLikes = () => {
    startTransition(() => {
      if (!profile?.user_id) {
        toast.error("Please login to like a comment.")
        openAccountModal()
        return
      }

      const isLiked = comment.user_has_liked_comment || false

      setOptimisticComment({
        type: "update",
        comment: {
          ...comment,
          likes_count: isLiked
            ? comment.likes_count - 1
            : comment.likes_count + 1,
          user_has_liked_comment: !isLiked,
        },
      })

      handleLikeToggleDebounced(profile, isLiked)
      router.refresh()
    })
  }

  return {
    isPending,
    handleLikes,
  }
}
