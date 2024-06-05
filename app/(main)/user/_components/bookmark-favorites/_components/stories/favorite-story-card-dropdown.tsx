"use client"

import { useState } from "react"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { User } from "@supabase/supabase-js"
import { ExternalLink } from "lucide-react"

import { Post_likes, Posts, Profiles } from "@/types/db_tables"
import { useStoryLike } from "@/hooks/story/use-story-like"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { LikeHeart } from "@/components/shared/like-heart"
import { StoryShareButton } from "@/app/(main)/story/_components/story-share-button"

type FavoriteStoryCardDropdownProps = {
  user_id: User["id"]
  post_id: Posts["post_id"]
  post_likes: Post_likes[]
  authorProfile: Profiles
}

export const FavoriteStoryCardDropdown: React.FC<
  FavoriteStoryCardDropdownProps
> = ({ user_id, post_id, post_likes, authorProfile }) => {
  const [showShareDialog, setShowShareDialog] = useState(false)
  const { optimisticLikeState, handleLikes, isPending } = useStoryLike(
    user_id,
    post_id,
    post_likes
  )

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <StoryShareButton
          withTrigger={false}
          post_title={post_id}
          open={showShareDialog}
          author={authorProfile}
          onOpenChange={setShowShareDialog}
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                aria-label="Open menu"
                className="flex size-8 p-0 data-[state=open]:bg-muted"
              >
                <DotsHorizontalIcon className="size-4" aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-40 border dark:border-0 dark:shadow-outline"
            >
              <TooltipTrigger asChild>
                <DropdownMenuItem
                  onClick={handleLikes}
                  className="hover:cursor-pointer active:scale-[0.98]"
                >
                  <span>Liked</span>
                  <DropdownMenuShortcut className="opacity-100">
                    <LikeHeart isLiked={optimisticLikeState.isUserLiked} />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                sideOffset={10}
                className="flex items-center gap-2 dark:bg-foreground dark:text-background"
              >
                <span>Toggle like</span>
              </TooltipContent>

              <DropdownMenuItem
                onClick={() => setShowShareDialog(true)}
                className="hover:cursor-pointer active:scale-[0.98]"
              >
                <span>Share</span>
                <DropdownMenuShortcut>
                  <ExternalLink className="size-4" />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </StoryShareButton>
      </Tooltip>
    </TooltipProvider>
  )
}
