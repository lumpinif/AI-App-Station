"use client"

import { useOptimistic, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { createSupabaseBrowserClient } from "@/utils/supabase/browser-client"
import { Heart } from "lucide-react"
import { toast } from "sonner"
import { useDebouncedCallback } from "use-debounce"

import { App_likes, AppDetails, Profile } from "@/types/db_tables"
import { cn } from "@/lib/utils"
import useUser from "@/hooks/react-hooks/use-user"
import useAccountModal from "@/hooks/use-account-modal-store"

type AppDetailLikeButtonProps = {
  app_id: AppDetails["app_id"]
  data: App_likes[]
  className?: string
}

type LikeState = {
  isUserLiked?: boolean
  appLikesCount?: number
}

export const AppDetailLikeButton: React.FC<AppDetailLikeButtonProps> = ({
  className,
  data: app_likes,
  app_id,
}) => {
  // console.log("🚀 ~ app_likes:", app_likes)
  const { data: profile } = useUser()

  const isUserLiked = app_likes.some(
    (like) => like.user_id === profile?.user_id
  )
  const appLikesCount = app_likes.length

  const router = useRouter()

  const [optimisticLikeState, setOptimisticLikeState] = useOptimistic(
    { isUserLiked, appLikesCount },
    (state, newState: LikeState) => ({ ...state, ...newState })
  )

  const supabase = createSupabaseBrowserClient()
  const [isPending, startTransition] = useTransition()
  const OpenModal = useAccountModal((state) => state.OpenModal)

  const handleLikeDebounced = useDebouncedCallback(
    async (profile: Profile) => {
      const { error: removeLikeError } = await supabase
        .from("app_likes")
        .delete()
        .match({ user_id: profile.user_id })

      if (removeLikeError) {
        toast.error("Failed to remove like. Please try again.")
      }
    },
    1000, // Adjust the debounce delay (in milliseconds) as needed,
    { leading: true, trailing: true }
  )

  const handleRemoveLikeDebounced = useDebouncedCallback(
    async (profile: Profile) => {
      const { error: addLikeError } = await supabase.from("app_likes").insert({
        app_id: app_id,
        user_id: profile.user_id,
      })
      if (addLikeError) {
        toast.error("Failed to like. Please try again.")
      }
    },
    1000,
    { leading: true, trailing: true }
  )

  const handleLikes = async () => {
    if (!profile?.user_id) {
      toast.error("Please login to like a app.")
      OpenModal()
      return
    }

    if (isUserLiked) {
      handleLikeDebounced(profile)
      setOptimisticLikeState({
        isUserLiked: !isUserLiked,
        appLikesCount: appLikesCount - 1,
      })
    } else {
      handleRemoveLikeDebounced(profile)
      setOptimisticLikeState({
        isUserLiked: !isUserLiked,
        appLikesCount: appLikesCount + 1,
      })
    }

    router.refresh()
  }

  return (
    <>
      <div
        className={cn("flex items-center space-x-1 md:space-x-2", className)}
      >
        <button
          className={cn("group rounded-full")}
          onClick={() => startTransition(() => handleLikes())}
        >
          <Heart
            className={cn(
              "transition-color stroke-current stroke-[1.5] text-muted-foreground outline-none duration-200 ease-out group-hover:fill-rose-500 group-hover:text-rose-500",
              optimisticLikeState.isUserLiked && "fill-current text-rose-500"
            )}
            size={18}
          />
        </button>
        {appLikesCount > 0 && (
          <span className="text-sm font-medium text-muted-foreground">
            {optimisticLikeState.appLikesCount}
          </span>
        )}
      </div>
    </>
  )
}
