"use client"

import { useOptimistic, useTransition } from "react"
import { useRouter } from "next/navigation"
import { createSupabaseBrowserClient } from "@/utils/supabase/browser-client"
import { Bookmark } from "lucide-react"
import { toast } from "sonner"
import { useDebouncedCallback } from "use-debounce"

import { App_bookmarks, AppDetails, Profile } from "@/types/db_tables"
import { cn } from "@/lib/utils"
import useUser from "@/hooks/react-hooks/use-user"
import useAccountModal from "@/hooks/use-account-modal-store"

type AppDetailBookmarkProps = {
  app_id: AppDetails["app_id"]
  data: App_bookmarks[]
  className?: string
}

type BookmarkState = {
  isUserBookmarked?: boolean
  bookmarksCount?: number
}

export const AppDetailBookmark: React.FC<AppDetailBookmarkProps> = ({
  className,
  data: app_bookmarks,
  app_id,
}) => {
  const { data: profile } = useUser()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const OpenModal = useAccountModal((state) => state.OpenModal)
  const supabase = createSupabaseBrowserClient()

  const isUserBookmarked = app_bookmarks.some(
    (bookmark) => bookmark.user_id === profile?.user_id
  )
  const bookmarksCount = app_bookmarks.length

  const [optimisticBookmarkState, setOptimisticBookmarkState] = useOptimistic(
    { isUserBookmarked, bookmarksCount },
    (state, newState: BookmarkState) => ({ ...state, ...newState })
  )

  const handleRemoveBookmarkDebounced = useDebouncedCallback(
    async (profile: Profile) => {
      const { error: removeBookmarkError } = await supabase
        .from("app_bookmarks")
        .delete()
        .match({ user_id: profile.user_id })

      if (removeBookmarkError) {
        toast.error("Failed to remove bookmark. Please try again.")
      }
    },
    1000, // Adjust the debounce delay (in milliseconds) as needed,
    { leading: true, trailing: true }
  )

  const handleBookmarkDebounced = useDebouncedCallback(
    async (profile: Profile) => {
      const { error: addBookmarkError } = await supabase
        .from("app_bookmarks")
        .insert({
          app_id: app_id,
          user_id: profile.user_id,
        })
      if (addBookmarkError) {
        toast.error("Failed to add bookmark. Please try again.")
      }
    },
    1000,
    { leading: true, trailing: true }
  )

  const handleBookmarks = async () => {
    if (!profile?.user_id) {
      toast.error("Please login to bookmark a app.")
      OpenModal()
      return
    }

    if (isUserBookmarked) {
      handleRemoveBookmarkDebounced(profile)
      setOptimisticBookmarkState({
        isUserBookmarked: !isUserBookmarked,
        bookmarksCount: bookmarksCount - 1,
      })
    } else {
      handleBookmarkDebounced(profile)
      setOptimisticBookmarkState({
        isUserBookmarked: !isUserBookmarked,
        bookmarksCount: bookmarksCount + 1,
      })
    }

    router.refresh()
  }

  return (
    <div className={cn("flex items-center space-x-1 md:space-x-2")}>
      <button
        className={cn("group rounded-full")}
        onClick={() => startTransition(() => handleBookmarks())}
      >
        <Bookmark
          className={cn(
            "transition-color size-4 stroke-current stroke-[1.5] text-muted-foreground outline-none duration-200 ease-out sm:group-hover:fill-amber-500 sm:group-hover:text-amber-500",
            optimisticBookmarkState.isUserBookmarked &&
              "fill-current text-amber-500",
            className
          )}
        />
      </button>
      {bookmarksCount > 0 && (
        <span className="text-sm font-medium text-muted-foreground">
          {optimisticBookmarkState.bookmarksCount}
        </span>
      )}
    </div>
  )
}
