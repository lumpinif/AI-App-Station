"use client"

import { User } from "@supabase/supabase-js"
import { Heart } from "lucide-react"
import numeral from "numeral"

import { Post_likes, Posts } from "@/types/db_tables"
import { cn } from "@/lib/utils"
import { useStoryLike } from "@/hooks/story/use-story-like"
import { LikeHeart } from "@/components/shared/like-heart"

type StoryLikeButtonProps = {
  post_id: Posts["post_id"]
  data: Post_likes[]
  className?: string
  user: User | null
}

export const StoryLikeButton: React.FC<StoryLikeButtonProps> = ({
  user,
  post_id,
  className,
  data: post_likes,
}) => {
  const { optimisticLikeState, handleLikes, isPending } = useStoryLike(
    user?.id!,
    post_id,
    post_likes
  )

  return (
    <div className={cn("flex items-center space-x-1 md:space-x-2")}>
      <button className={cn("group rounded-full")} onClick={handleLikes}>
        <LikeHeart
          className={className}
          isLiked={optimisticLikeState.isUserLiked}
        />
      </button>
      {optimisticLikeState.postLikesCount > 0 && (
        <span className="text-muted-foreground text-sm font-medium">
          {numeral(optimisticLikeState.postLikesCount).format("0.[0]a")}
        </span>
      )}
    </div>
  )
}
