"use client"

import { useOptimistic, useTransition } from "react"
import { useRouter } from "next/navigation"
import { createSupabaseBrowserClient } from "@/utils/supabase/browser-client"
import { User } from "@supabase/supabase-js"
import { Bookmark } from "lucide-react"
import { toast } from "sonner"
import { useDebouncedCallback } from "use-debounce"

import { Post_Bookmarks, Posts } from "@/types/db_tables"
import { cn } from "@/lib/utils"
import useAccountModal from "@/hooks/use-account-modal-store"

type StoryBookmarkProps = {
  post_id: Posts["post_id"]
  data: Post_Bookmarks[]
  className?: string
  user: User | null
}

type BookmarkState = {
  isUserBookmarked?: boolean
  bookmarksCount?: number
}

export const StoryBookmarkButton: React.FC<StoryBookmarkProps> = ({
  user,
  post_id,
  className,
  data: post_bookmarks,
}) => {
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

  const handleRemoveBookmarkDebounced = useDebouncedCallback(
    async (user: User) => {
      const { error: removeBookmarkError } = await supabase
        .from("post_bookmarks")
        .delete()
        .match({ user_id: user.id })

      if (removeBookmarkError) {
        toast.error("Failed to remove bookmark. Please try again.")
      }
    },
    1000, // Adjust the debounce delay (in milliseconds) as needed,
    { leading: true, trailing: true }
  )

  const handleBookmarkDebounced = useDebouncedCallback(
    async (user: User) => {
      const { error: addBookmarkError } = await supabase
        .from("post_bookmarks")
        .insert({
          post_id: post_id,
          user_id: user.id,
        })
      if (addBookmarkError) {
        toast.error("Failed to add bookmark. Please try again.")
      }
    },
    1000,
    { leading: true, trailing: true }
  )

  const handleBookmarks = async () => {
    if (!user?.id) {
      toast.error("Please login to bookmark a story.")
      openAccountModal()
      return
    }

    if (isUserBookmarked) {
      handleRemoveBookmarkDebounced(user)
      setOptimisticBookmarkState({
        isUserBookmarked: !isUserBookmarked,
        bookmarksCount: bookmarksCount - 1,
      })
    } else {
      handleBookmarkDebounced(user)
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
            "transition-color text-muted-foreground size-4 stroke-current stroke-[1.5] outline-none duration-200 ease-out sm:group-hover:fill-amber-500 sm:group-hover:text-amber-500",
            optimisticBookmarkState.isUserBookmarked &&
              "fill-current text-amber-500",
            className
          )}
        />
      </button>
      {bookmarksCount > 0 && (
        <span className="text-muted-foreground text-sm font-medium">
          {optimisticBookmarkState.bookmarksCount}
        </span>
      )}
    </div>
  )
}
