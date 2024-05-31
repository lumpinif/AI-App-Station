"use client"

import { useOptimistic, useTransition } from "react"
import { useRouter } from "next/navigation"
import { createSupabaseBrowserClient } from "@/utils/supabase/browser-client"
import { User } from "@supabase/supabase-js"
import { Heart } from "lucide-react"
import numeral from "numeral"
import { toast } from "sonner"
import { useDebouncedCallback } from "use-debounce"

import { App_likes, AppDetails } from "@/types/db_tables"
import { cn } from "@/lib/utils"
import useAccountModal from "@/hooks/use-account-modal-store"

type AppDetailLikeButtonProps = {
  app_id: AppDetails["app_id"]
  data: App_likes[]
  className?: string
  user: User | null
}

type LikeState = {
  isUserLiked?: boolean
  appLikesCount?: number
}

export const AppDetailLikeButton: React.FC<AppDetailLikeButtonProps> = ({
  user,
  app_id,
  className,
  data: app_likes,
}) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const openAccountModal = useAccountModal((state) => state.openModal)
  const supabase = createSupabaseBrowserClient()

  const isUserLiked = app_likes.some((like) => like.user_id === user?.id)

  const appLikesCount = app_likes.length

  const [optimisticLikeState, setOptimisticLikeState] = useOptimistic(
    { isUserLiked, appLikesCount },
    (state, newState: LikeState) => ({ ...state, ...newState })
  )

  const handleRemoveLikeDebounced = useDebouncedCallback(
    async (user: User) => {
      const { error: removeLikeError } = await supabase
        .from("app_likes")
        .delete()
        .match({ app_id: app_id, user_id: user.id })

      if (removeLikeError) {
        toast.error("Failed to remove like. Please try again.")
      }
    },
    1000, // Adjust the debounce delay (in milliseconds) as needed,
    { leading: true, trailing: true }
  )

  const handleLikeDebounced = useDebouncedCallback(
    async (user: User) => {
      const { error: addLikeError } = await supabase.from("app_likes").insert({
        app_id: app_id,
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
      toast.error("Please login to like a app.")
      openAccountModal()
      return
    }

    if (isUserLiked) {
      handleRemoveLikeDebounced(user)
      setOptimisticLikeState({
        isUserLiked: !isUserLiked,
        appLikesCount: appLikesCount - 1,
      })
    } else {
      handleLikeDebounced(user)
      setOptimisticLikeState({
        isUserLiked: !isUserLiked,
        appLikesCount: appLikesCount + 1,
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
            "transition-color size-4 stroke-current stroke-[1.5] text-muted-foreground outline-none duration-200 ease-out sm:group-hover:fill-rose-500 sm:group-hover:text-rose-500",
            optimisticLikeState.isUserLiked && "fill-current text-rose-500",
            className
          )}
        />
      </button>
      {appLikesCount > 0 && (
        <span className="text-sm font-medium text-muted-foreground">
          {numeral(optimisticLikeState.appLikesCount).format("0.[0]a")}
        </span>
      )}
    </div>
  )
}
