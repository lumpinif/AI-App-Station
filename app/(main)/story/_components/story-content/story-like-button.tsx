"use client"

import { useOptimistic, useTransition } from "react"
import { useRouter } from "next/navigation"
import { createSupabaseBrowserClient } from "@/utils/supabase/browser-client"
import { User } from "@supabase/supabase-js"
import { Heart } from "lucide-react"
import numeral from "numeral"
import { toast } from "sonner"
import { useDebouncedCallback } from "use-debounce"

import { Post_likes, Posts } from "@/types/db_tables"
import { cn } from "@/lib/utils"
import useAccountModal from "@/hooks/use-account-modal-store"

type StoryLikeButtonProps = {
  post_id: Posts["post_id"]
  data: Post_likes[]
  className?: string
  user: User | null
}

type LikeState = {
  isUserLiked?: boolean
  postLikesCount?: number
}

export const StoryLikeButton: React.FC<StoryLikeButtonProps> = ({
  user,
  post_id,
  className,
  data: post_likes,
}) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const openAccountModal = useAccountModal((state) => state.openModal)
  const supabase = createSupabaseBrowserClient()

  const isUserLiked = post_likes.some((like) => like.user_id === user?.id)

  const postLikesCount = post_likes.length

  const [optimisticLikeState, setOptimisticLikeState] = useOptimistic(
    { isUserLiked, postLikesCount },
    (state, newState: LikeState) => ({ ...state, ...newState })
  )

  const handleRemoveLikeDebounced = useDebouncedCallback(
    async (user: User) => {
      const { error: removeLikeError } = await supabase
        .from("post_likes")
        .delete()
        .match({ post_id: post_id, user_id: user.id })

      if (removeLikeError) {
        toast.error("Failed to remove like. Please try again.")
      }
    },
    1000, // Adjust the debounce delay (in milliseconds) as needed,
    { leading: true, trailing: true }
  )

  const handleLikeDebounced = useDebouncedCallback(
    async (user: User) => {
      const { error: addLikeError } = await supabase.from("post_likes").insert({
        post_id: post_id,
        user_id: user.id,
      })
      if (addLikeError) {
        toast.error("Failed to like. Please try again.")
      }
    },
    1000,
    { leading: true, trailing: true }
  )

  const handleLikes = async () => {
    if (!user?.id) {
      toast.error("Please login to like a story.")
      openAccountModal()
      return
    }

    if (isUserLiked) {
      handleRemoveLikeDebounced(user)
      setOptimisticLikeState({
        isUserLiked: !isUserLiked,
        postLikesCount: postLikesCount - 1,
      })
    } else {
      handleLikeDebounced(user)
      setOptimisticLikeState({
        isUserLiked: !isUserLiked,
        postLikesCount: postLikesCount + 1,
      })
    }

    router.refresh()
  }

  return (
    <div className={cn("flex items-center space-x-1 md:space-x-2")}>
      <button
        className={cn("group rounded-full")}
        onClick={() => startTransition(() => handleLikes())}
      >
        <Heart
          className={cn(
            "transition-color text-muted-foreground size-4 stroke-current stroke-[1.5] outline-none duration-200 ease-out sm:group-hover:fill-rose-500 sm:group-hover:text-rose-500",
            optimisticLikeState.isUserLiked && "fill-current text-rose-500",
            className
          )}
        />
      </button>
      {postLikesCount > 0 && (
        <span className="text-muted-foreground text-sm font-medium">
          {numeral(optimisticLikeState.postLikesCount).format("0.[0]a")}
        </span>
      )}
    </div>
  )
}
