import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { createSupabaseBrowserClient } from "@/utils/supabase/browser-client"
import { useQueryClient } from "@tanstack/react-query"
import { Heart } from "lucide-react"
import { toast } from "sonner"
import { useDebouncedCallback } from "use-debounce"

import { CommentWithProfile, Profile } from "@/types/db_tables"
import { cn } from "@/lib/utils"
import useUser from "@/hooks/react-hooks/use-user"
import useAccountModal from "@/hooks/use-account-modal-store"

type CommentLIkeButtonProps = {
  comment: CommentWithProfile
  className?: string
  setOptimisticComment: (newComment: CommentWithProfile) => void
}

export const CommentLIkeButton: React.FC<CommentLIkeButtonProps> = ({
  className,
  comment,
  setOptimisticComment,
}) => {
  const supabase = createSupabaseBrowserClient()
  const [isPending, startTransition] = useTransition()
  const queryClient = useQueryClient()
  const queryKey = ["replies", comment.parent_id]
  const OpenModal = useAccountModal((state) => state.OpenModal)

  const router = useRouter()
  const { data: profile } = useUser()

  const handleLikeDebounced = useDebouncedCallback(
    async (profile: Profile) => {
      const { error: addLikeError } = await supabase
        .from("comment_likes")
        .insert({
          comment_id: comment.comment_id,
          user_id: profile.user_id,
        })
      if (addLikeError) {
        toast.error("Failed to like. Please try again.")
      }
      queryClient.invalidateQueries({ queryKey: queryKey })
    },
    1000, // Adjust the debounce delay (in milliseconds) as needed,
    { leading: true, trailing: true }
  )

  const handleRemoveLikeDebounced = useDebouncedCallback(
    async (profile: Profile) => {
      const { error: removeLikeError } = await supabase
        .from("comment_likes")
        .delete()
        .match({ comment_id: comment.comment_id, user_id: profile.user_id })

      if (removeLikeError) {
        toast.error("Failed to remove like. Please try again.")
      }
      queryClient.invalidateQueries({ queryKey: queryKey })
    },
    1000,
    { leading: true, trailing: true }
  )

  const handleLikes = async () => {
    console.log("clicked!")
    // checking if we have a user login
    if (!profile?.user_id) {
      toast.error("Please login to like a comment.")
      OpenModal()
      return
    }

    if (comment.user_has_liked_comment) {
      setOptimisticComment({
        ...comment,
        likes_count: comment.likes_count - 1,
        user_has_liked_comment: !comment.user_has_liked_comment,
      })

      handleRemoveLikeDebounced(profile)
    } else {
      setOptimisticComment({
        ...comment,
        likes_count: comment.likes_count + 1,
        user_has_liked_comment: !comment.user_has_liked_comment,
      })

      handleLikeDebounced(profile)
    }

    router.refresh()
  }

  return (
    <>
      <div
        className={cn("flex items-center space-x-1 md:space-x-2", className)}
      >
        <button
          className={cn("group rounded-full")}
          onClick={() => startTransition(() => handleLikes())}
        >
          <Heart
            className={cn(
              "transition-color stroke-current stroke-[1.5] text-muted-foreground outline-none duration-200 ease-out group-hover:fill-rose-500 group-hover:text-rose-500",
              comment.user_has_liked_comment && "fill-current text-rose-500"
            )}
            size={18}
          />
        </button>
        {comment.likes_count > 0 && (
          <span className="text-sm font-medium text-muted-foreground">
            {comment.likes_count}
          </span>
        )}
      </div>
    </>
  )
}
