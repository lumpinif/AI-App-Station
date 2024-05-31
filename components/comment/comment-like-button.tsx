import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { createSupabaseBrowserClient } from "@/utils/supabase/browser-client"
import { Heart } from "lucide-react"
import numeral from "numeral"
import { toast } from "sonner"
import { useDebouncedCallback } from "use-debounce"

import {
  CommentLikesTable,
  Profiles,
  TCommentWithProfile,
  TSetOptimisticComment,
} from "@/types/db_tables"
import { cn } from "@/lib/utils"
import useUserProfile from "@/hooks/react-hooks/use-user"
import useAccountModal from "@/hooks/use-account-modal-store"

type CommentLIkeButtonProps = {
  className?: string
  comment: TCommentWithProfile
  commentLikesTable: CommentLikesTable
  setOptimisticComment: TSetOptimisticComment
}

export const CommentLIkeButton: React.FC<CommentLIkeButtonProps> = ({
  comment,
  className,
  commentLikesTable = "app_comment_likes",
  setOptimisticComment,
}) => {
  const supabase = createSupabaseBrowserClient()
  const [isPending, startTransition] = useTransition()
  const openAccountModal = useAccountModal((state) => state.openModal)
  const router = useRouter()
  const { data: profile } = useUserProfile()

  const handleLikeToggleDebounced = useDebouncedCallback(
    async (profile: Profiles, isLiked: boolean) => {
      if (isLiked) {
        const { error: removeLikeError } = await supabase
          .from(commentLikesTable)
          .delete()
          .match({ comment_id: comment.comment_id, user_id: profile.user_id })
        if (removeLikeError) {
          toast.error("Failed to remove like. Please try again.")
        }
      } else {
        const { error: addLikeError } = await supabase
          .from(commentLikesTable)
          .insert({ comment_id: comment.comment_id, user_id: profile.user_id })
        if (addLikeError) {
          toast.error("Failed to like. Please try again.")
        }
      }
    },
    1000,
    { leading: true, trailing: true }
  )

  const handleLikes = () => {
    if (!profile?.user_id) {
      toast.error("Please login to like a comment.")
      openAccountModal()
      return
    }

    const isLiked = comment.user_has_liked_comment || false

    setOptimisticComment({
      type: "update",
      comment: {
        ...comment,
        likes_count: isLiked
          ? comment.likes_count - 1
          : comment.likes_count + 1,
        user_has_liked_comment: !isLiked,
      },
    })

    handleLikeToggleDebounced(profile, isLiked)
    router.refresh()
  }

  return (
    <>
      <div
        className={cn("flex items-center space-x-1 md:space-x-2", className)}
      >
        <button
          className={cn("group rounded-full")}
          onClick={() => startTransition(handleLikes)}
        >
          <Heart
            className={cn(
              "transition-color text-muted-foreground stroke-current stroke-[1.5] outline-none duration-200 ease-out sm:group-hover:fill-rose-500 sm:group-hover:text-rose-500",
              comment.user_has_liked_comment && "fill-current text-rose-500"
            )}
            size={18}
          />
        </button>
        {comment.likes_count > 0 && (
          <span className="text-muted-foreground text-sm font-medium">
            {numeral(comment.likes_count).format("0.[0]a")}
          </span>
        )}
      </div>
    </>
  )
}
