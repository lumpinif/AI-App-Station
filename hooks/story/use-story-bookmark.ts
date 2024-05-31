import { useOptimistic, useTransition } from "react"
import { useRouter } from "next/navigation"
import { createSupabaseBrowserClient } from "@/utils/supabase/browser-client"
import { User } from "@supabase/supabase-js"
import { toast } from "sonner"
import { useDebouncedCallback } from "use-debounce"

import { Post_Bookmarks, Posts } from "@/types/db_tables"

import useAccountModal from "../use-account-modal-store"

type BookmarkState = {
  isUserBookmarked?: boolean
  bookmarksCount?: number
}

export const useStoryBookmark = (
  user: User | null,
  post_id: Posts["post_id"],
  post_bookmarks: Post_Bookmarks[]
) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const openAccountModal = useAccountModal((state) => state.openModal)
  const supabase = createSupabaseBrowserClient()

  const isUserBookmarked = post_bookmarks.some(
    (bookmark) => bookmark.user_id === user?.id
  )
  const bookmarksCount = post_bookmarks.length

  const [optimisticBookmarkState, setOptimisticBookmarkState] = useOptimistic(
    { isUserBookmarked, bookmarksCount },
    (state, newState: BookmarkState) => ({ ...state, ...newState })
  )

  const handleBookmarkToggleDebounced = useDebouncedCallback(
    async (
      isLiked: boolean,
      user_id: User["id"],
      post_id: Posts["post_id"]
    ) => {
      if (isLiked) {
        const { error: removeBookmarkError } = await supabase
          .from("post_bookmarks")
          .delete()
          .match({ user_id: user_id })

        if (removeBookmarkError) {
          toast.error("Failed to remove bookmark. Please try again.")
        }
      } else {
        const { error: addBookmarkError } = await supabase
          .from("post_bookmarks")
          .insert({
            post_id: post_id,
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
        toast.error("Please login to bookmark a story.")
        openAccountModal()
        return
      }

      setOptimisticBookmarkState({
        isUserBookmarked: !isUserBookmarked,
        bookmarksCount: isUserBookmarked
          ? bookmarksCount - 1
          : bookmarksCount + 1,
      })

      handleBookmarkToggleDebounced(isUserBookmarked, user.id, post_id)

      router.refresh()
    })
  }

  return {
    isPending,
    handleBookmarks,
    optimisticBookmarkState,
  }
}
