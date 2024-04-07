import React, { useCallback, useOptimistic, useTransition } from "react"
import { useRouter } from "next/navigation"
import { addLike, getLikesCount, removeLike } from "@/server/data"
import { ThumbsUp } from "lucide-react"
import { toast } from "sonner"
import { useDebouncedCallback } from "use-debounce"

import { CommentActionsProp } from "@/types/db_tables"
import { cn } from "@/lib/utils"
import useUser from "@/hooks/react-hooks/use-user"
import useAccountModal from "@/hooks/use-account-modal-store"

type CommentLIkeButtonProps = Pick<CommentActionsProp, "comment" | "className">

export const CommentLIkeButton: React.FC<CommentLIkeButtonProps> = ({
  comment,
  className,
}) => {
  const initialLikesCount = comment.likes_count
  const [likeCount, setLikeCount] = React.useState<number>(initialLikesCount)
  const [isLikeActive, setIsLikeActive] = React.useState(false)
  const [optimisticLikeCount, setOptimisticLikeCount] = useOptimistic(
    likeCount,
    (prevCount: number, amount: number) => prevCount + amount
  )
  const [optimisticIsLikeActive, setOptimisticIsLikeActive] = useOptimistic(
    isLikeActive,
    (state, newState: boolean) => newState
  )

  const [isPending, startTransition] = useTransition()

  const { data: profile } = useUser()

  const OpenModal = useAccountModal((state) => state.OpenModal)

  const router = useRouter()

  // checking if the user has liked the comment
  React.useEffect(() => {
    if (!profile?.user_id) return

    const userLikedComment = comment.comment_likes.some(
      (like) => like.user_id === profile.user_id
    )
    setIsLikeActive(userLikedComment)
  }, [comment.comment_id, comment.comment_likes, profile?.user_id])

  // TODO: FIX THE OPTIMISTIC LIKES_COUNT FLICKERING PROBLEM
  const toggleLike = useCallback(
    async (optimisticIsLikeActive: boolean) => {
      if (!profile?.user_id) {
        toast.error("Please login to like a comment.")
        return
      }

      console.log(
        "before if else , current opt-button state:",
        optimisticIsLikeActive
      )
      console.log(
        "before if else , current opt-like-count:",
        optimisticLikeCount
      )
      console.log("before if else , current real button state:", isLikeActive)
      console.log("before if else , current real like-count:", likeCount)

      if (!optimisticIsLikeActive) {
        console.log("if optimisticIsLikeActive,", !optimisticIsLikeActive)

        try {
          const { removeLikeError } = await removeLike(
            comment.app_id,
            comment.comment_id,
            profile.user_id
          )

          console.log("removing a record from the comment_likes table...")

          if (removeLikeError) {
            toast.error("Failed to remove like. Please try again.")
            return
          } else {
            console.log("set real like button state to false")
            setIsLikeActive(false) // Update the actual state if the operation succeeds
            const { updatedLikesCount, likesCountError } = await getLikesCount(
              comment.comment_id
            )

            console.log(
              "checking latest like count:",
              updatedLikesCount?.likes_count
            )
            if (likesCountError) {
              toast.error("Failed to get likes count. Please try again.")
              return
            }
            if (
              updatedLikesCount &&
              updatedLikesCount.likes_count !== optimisticLikeCount
            ) {
              console.log(
                "🚀 updated likes count is different from opt-like-count",
                "updated likes count:",
                updatedLikesCount?.likes_count,
                "opt:",
                optimisticLikeCount
              )

              setLikeCount(updatedLikesCount?.likes_count)

              console.log(
                "🚀 setting real like count to",
                updatedLikesCount?.likes_count
              )

              console.log(
                "🚀 after setting real like count, opt-like-cout:",
                optimisticLikeCount
              )
            }
          }
        } catch (error) {
          toast.error("Catch Error removing like. Please try again.")
          return
        }
      } else {
        console.log(
          "if optimisticIsLikeActive,then we add like,",
          optimisticIsLikeActive
        )
        console.log("adding a record to the comment_likes table...")

        try {
          const { addLikeError, existingLikeError } = await addLike(
            comment.app_id,
            comment.comment_id,
            profile.user_id
          )

          if (existingLikeError) {
            setIsLikeActive(true)
            toast.error("You have already liked this comment.")
            return
          }
          if (addLikeError) {
            setIsLikeActive(false)
            toast.error("Failed to add like. Please try again.")
            return
          } else {
            console.log(
              "add like to database, and set real like button state to",
              true
            )
            setIsLikeActive(true) // Update the actual state if the operation succeeds

            console.log("current real like count", likeCount)
            console.log("current opt-like-count", optimisticLikeCount)
            console.log("------------------------")
            console.log("current real like button state", isLikeActive)
            console.log("current opt-like-button ", optimisticIsLikeActive)
            console.log("------------------------")
            console.log("getting latest like count...")
            const { updatedLikesCount, likesCountError } = await getLikesCount(
              comment.comment_id
            )

            if (likesCountError) {
              toast.error("Failed to get likes count. Please try again.")
              return
            }
            if (
              updatedLikesCount &&
              updatedLikesCount.likes_count !== optimisticLikeCount
            ) {
              console.log(
                "latest updated likes count from supabase:",
                updatedLikesCount.likes_count
              )
              console.log("current opt-like-count", optimisticLikeCount)
              setLikeCount(updatedLikesCount?.likes_count)
              console.log(
                "🚀 ~ setting real likes count to updated likes count",
                updatedLikesCount?.likes_count
              )
              console.log(
                "after set real like count, opt-like-count:",
                optimisticLikeCount
              )
            }
          }
        } catch (error) {
          setIsLikeActive(false)
          toast.error("Catch Error adding like. Please try again.")
          return
        }
      }
    },

    [
      comment.app_id,
      comment.comment_id,
      isLikeActive,
      likeCount,
      optimisticLikeCount,
      profile?.user_id,
    ]
  )

  const handleLikeDebounced = useDebouncedCallback(
    (newLikeActive) => {
      console.log("use debounced toggle triggered!")
      toggleLike(newLikeActive)
    },
    1000, // Adjust the debounce delay (in milliseconds) as needed,
    { leading: true, trailing: true }
  )

  async function handleLikeClick() {
    if (!profile?.user_id) {
      OpenModal()
      return
    }
    console.log("like clicked, current like button state", isLikeActive)

    const newLikeActive = !optimisticIsLikeActive
    console.log("new like active state:", newLikeActive)
    setOptimisticIsLikeActive(newLikeActive)

    console.log("set opt-button to state:", newLikeActive)

    console.log("current real like count:", likeCount)
    console.log("current opt-like-count:", optimisticLikeCount)

    setOptimisticLikeCount(newLikeActive ? +1 : -1)
    console.log("set opt-like-count to:", newLikeActive ? +1 : -1)

    handleLikeDebounced(newLikeActive)
  }

  return (
    <>
      <div className={cn("flex items-center space-x-1", className)}>
        <button
          className={cn("group rounded-full p-2 hover:bg-rose-500/10")}
          onClick={() => startTransition(() => handleLikeClick())}
        >
          <ThumbsUp
            className={cn(
              "stroke-current stroke-[1.5] text-muted-foreground group-hover:text-rose-500",
              optimisticIsLikeActive && "fill-current text-rose-500"
            )}
            size={20}
          />
        </button>
        {optimisticLikeCount > 0 ? (
          <span className="text-xs text-muted-foreground">
            {optimisticLikeCount}
          </span>
        ) : null}
      </div>
    </>
  )
}
