"use client"

import { User } from "@supabase/supabase-js"
import { Bookmark } from "lucide-react"

import { Post_Bookmarks, Posts } from "@/types/db_tables"
import { cn } from "@/lib/utils"
import { useStoryBookmark } from "@/hooks/story/use-story-bookmark"

type StoryBookmarkProps = {
  post_id: Posts["post_id"]
  data: Post_Bookmarks[]
  className?: string
  user: User | null
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
    <div className={cn("flex items-center gap-x-1")}>
      <button className={cn("group rounded-full")} onClick={handleBookmarks}>
        <Bookmark
          className={cn(
            "transition-color size-4 stroke-current stroke-[1.5] text-muted-foreground outline-none duration-200 ease-out sm:group-hover:fill-amber-500 sm:group-hover:text-amber-500",
            optimisticBookmarkState.isUserBookmarked &&
              "fill-current text-amber-500",
            className
          )}
        />
      </button>
      {optimisticBookmarkState.bookmarksCount > 0 && (
        <span className="text-sm font-medium text-muted-foreground">
          {optimisticBookmarkState.bookmarksCount}
        </span>
      )}
    </div>
  )
}
