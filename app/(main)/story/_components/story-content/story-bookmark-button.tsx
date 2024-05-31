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
import { useStoryBookmark } from "@/hooks/story/use-story-bookmark"
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
  const { isPending, handleBookmarks, optimisticBookmarkState } =
    useStoryBookmark(user, post_id, post_bookmarks)

  return (
    <div className={cn("flex items-center space-x-1 md:space-x-2")}>
      <button className={cn("group rounded-full")} onClick={handleBookmarks}>
        <Bookmark
          className={cn(
            "transition-color text-muted-foreground size-4 stroke-current stroke-[1.5] outline-none duration-200 ease-out sm:group-hover:fill-amber-500 sm:group-hover:text-amber-500",
            optimisticBookmarkState.isUserBookmarked &&
              "fill-current text-amber-500",
            className
          )}
        />
      </button>
      {optimisticBookmarkState.bookmarksCount > 0 && (
        <span className="text-muted-foreground text-sm font-medium">
          {optimisticBookmarkState.bookmarksCount}
        </span>
      )}
    </div>
  )
}
