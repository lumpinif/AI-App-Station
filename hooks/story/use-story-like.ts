import { useOptimistic, useTransition } from "react"
import { useRouter } from "next/navigation"
import { createSupabaseBrowserClient } from "@/utils/supabase/browser-client"
import { User } from "@supabase/supabase-js"
import { toast } from "sonner"
import { useDebouncedCallback } from "use-debounce"

import { Post_likes } from "@/types/db_tables"
import useAccountModal from "@/hooks/use-account-modal-store"

type LikeState = {
  isUserLiked?: boolean
  postLikesCount?: number
}

export const useStoryLike = (
  user_id: User["id"],
  post_id: string,
  post_likes: Post_likes[]
) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const openAccountModal = useAccountModal((state) => state.openModal)
  const supabase = createSupabaseBrowserClient()

  const isUserLiked = post_likes.some((like) => like.user_id === user_id)
  const postLikesCount = post_likes.length

  const [optimisticLikeState, setOptimisticLikeState] = useOptimistic(
    { isUserLiked, postLikesCount },
    (state, newState: LikeState) => ({ ...state, ...newState })
  )

  const handleRemoveLikeDebounced = useDebouncedCallback(
    async (user_id: User["id"]) => {
      const { error: removeLikeError } = await supabase
        .from("post_likes")
        .delete()
        .match({ post_id: post_id, user_id: user_id })

      if (removeLikeError) {
        toast.error("Failed to remove like. Please try again.")
      }
    },
    1000,
    { leading: true, trailing: true }
  )

  const handleLikeDebounced = useDebouncedCallback(
    async (user_id: User["id"]) => {
      const { error: addLikeError } = await supabase.from("post_likes").insert({
        post_id: post_id,
        user_id: user_id,
      })
      if (addLikeError) {
        toast.error("Failed to like. Please try again.")
      }
    },
    1000,
    { leading: true, trailing: true }
  )

  const handleLikes = async () => {
    startTransition(() => {
      if (!user_id) {
        toast.error("Please login to like a story.")
        openAccountModal()
        return
      }

      if (isUserLiked) {
        handleRemoveLikeDebounced(user_id)
        setOptimisticLikeState({
          isUserLiked: !isUserLiked,
          postLikesCount: postLikesCount - 1,
        })
      } else {
        handleLikeDebounced(user_id)
        setOptimisticLikeState({
          isUserLiked: !isUserLiked,
          postLikesCount: postLikesCount + 1,
        })
      }

      router.refresh()
    })
  }

  return {
    isPending,
    handleLikes,
    optimisticLikeState,
  }
}
