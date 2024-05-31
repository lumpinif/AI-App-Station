"use client"

import { User } from "@supabase/supabase-js"
import { Bookmark } from "lucide-react"

import { App_bookmarks, AppDetails } from "@/types/db_tables"
import { cn } from "@/lib/utils"
import { useAppBookmark } from "@/hooks/app/use-app-bookmark"

type AppDetailBookmarkButtonProps = {
  app_id: AppDetails["app_id"]
  data: App_bookmarks[]
  className?: string
  user: User | null
}

export const AppDetailBookmarkButton: React.FC<
  AppDetailBookmarkButtonProps
> = ({ user, app_id, className, data: app_bookmarks }) => {
  const { isPending, handleBookmarks, optimisticBookmarkState } =
    useAppBookmark(user, app_id, app_bookmarks)

  return (
    <div className={cn("flex items-center space-x-1 md:space-x-2")}>
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
