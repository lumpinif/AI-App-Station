import { useOptimistic, useTransition } from "react"
import { useRouter } from "next/navigation"
import { createSupabaseBrowserClient } from "@/utils/supabase/browser-client"
import { User } from "@supabase/supabase-js"
import { toast } from "sonner"
import { useDebouncedCallback } from "use-debounce"

import { App_bookmarks, Apps } from "@/types/db_tables"
import { BookmarkState } from "@/types/shared"

import useAccountModal from "../use-account-modal-store"

export const useAppBookmark = (
  user: User | null,
  app_id: Apps["app_id"],
  app_bookmarks: App_bookmarks[]
) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const openAccountModal = useAccountModal((state) => state.openModal)
  const supabase = createSupabaseBrowserClient()

  const isUserBookmarked = app_bookmarks.some(
    (bookmark) => bookmark.user_id === user?.id
  )
  const bookmarksCount = app_bookmarks.length

  const [optimisticBookmarkState, setOptimisticBookmarkState] = useOptimistic(
    { isUserBookmarked, bookmarksCount },
    (state, newState: BookmarkState) => ({ ...state, ...newState })
  )

  const handleBookmarkToggleDebounced = useDebouncedCallback(
    async (isLiked: boolean, user_id: User["id"]) => {
      if (isLiked) {
        const { error: removeBookmarkError } = await supabase
          .from("app_bookmarks")
          .delete()
          .match({ user_id: user_id })

        if (removeBookmarkError) {
          toast.error("Failed to remove bookmark. Please try again.")
        }
      } else {
        const { error: addBookmarkError } = await supabase
          .from("app_bookmarks")
          .insert({
            app_id: app_id,
            user_id: user_id,
          })
        if (addBookmarkError) {
          toast.error("Failed to add bookmark. Please try again.")
        }
      }
    },
    1000,
    { leading: true, trailing: true }
  )

  const handleBookmarks = async () => {
    startTransition(() => {
      if (!user?.id) {
        toast.error("Please login to bookmark a app.")
        openAccountModal()
        return
      }

      setOptimisticBookmarkState({
        isUserBookmarked: !isUserBookmarked,
        bookmarksCount: isUserBookmarked
          ? bookmarksCount - 1
          : bookmarksCount + 1,
      })

      handleBookmarkToggleDebounced(isUserBookmarked, user.id)

      router.refresh()
    })
  }

  return {
    isPending,
    handleBookmarks,
    optimisticBookmarkState,
  }
}
