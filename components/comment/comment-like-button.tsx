import { useCallback, useReducer } from "react"
import { addLikeToComment } from "@/server/data"
import { ThumbsDown, ThumbsUp } from "lucide-react"

import { Comment, CommentActionsProp } from "@/types/db_tables"
import { cn } from "@/lib/utils"

// Define actions for the reducer
const actionTypes = {
  LIKE: "LIKE",
  UPDATE_SUCCESS: "UPDATE_SUCCESS",
  UPDATE_FAIL: "UPDATE_FAIL",
}

interface LikeState {
  likes_count: number
}

type LikeAction =
  | { type: "LIKE" }
  | { type: "UPDATE_SUCCESS"; payload: number }
  | { type: "UPDATE_FAIL" }

// Reducer function to handle state changes
const likeReducer = (state: LikeState, action: LikeAction): LikeState => {
  switch (action.type) {
    case "LIKE":
      // No payload needed here
      return { ...state, likes_count: state.likes_count + 1 }
    case "UPDATE_SUCCESS":
      // TypeScript now understands that `payload` exists on `UPDATE_SUCCESS` actions
      return { ...state, likes_count: action.payload }
    case "UPDATE_FAIL":
      // Rollback the optimistic update by decrementing the like count
      // No payload needed here
      return { ...state, likes_count: Math.max(0, state.likes_count - 1) }
    default:
      return state
  }
}

type CommentLikeButtonProps = Pick<CommentActionsProp, "likes_count"> & {
  comment_id: Comment["comment_id"]
  className?: string
}

export const CommentLikeButton: React.FC<CommentLikeButtonProps> = ({
  className,
  comment_id,
  likes_count,
}) => {
  const [state, dispatch] = useReducer(likeReducer, { likes_count })

  const handleLike = useCallback(async () => {
    // Dispatch an action to optimistically increment the like count
    dispatch({ type: "LIKE" })

    try {
      // Attempt to add a like to the comment in the backend
      const response = await addLikeToComment(comment_id, state.likes_count)

      // Check if the response contains an error
      if (response.error) {
        console.error(response.error)
        // Rollback the optimistic update in case of an error
        dispatch({ type: "UPDATE_FAIL" })
      } else if (response.likes_count && response.likes_count.length > 0) {
        // Assuming the first item in the array is the updated likes count
        const updatedLikesCount = response.likes_count[0].likes_count

        // If successful, confirm the optimistic update with actual data from the server
        dispatch({ type: "UPDATE_SUCCESS", payload: updatedLikesCount })
      } else {
        // Handle unexpected response structure
        console.error("Unexpected response structure:", response)
        dispatch({ type: "UPDATE_FAIL" })
      }
    } catch (error) {
      console.error(error)
      // In case of an error during the request, rollback the optimistic update
      dispatch({ type: "UPDATE_FAIL" })
    }
  }, [comment_id, state.likes_count, dispatch])

  return (
    <>
      <div className={cn("flex items-center", className)}>
        <span
          className="group rounded-full p-2 hover:bg-rose-500/10"
          onClick={handleLike}
        >
          <ThumbsUp
            className="stroke-current stroke-[1.5] text-muted-foreground group-hover:stroke-rose-500 "
            size={20}
          />
        </span>
        {/* {likes_count && (
          <span className="mt-1 text-xs text-muted-foreground">
            {likes_count}
          </span>
        )} */}
        {state.likes_count && (
          <span className="mt-1 text-xs text-muted-foreground">
            {state.likes_count}
          </span>
        )}
      </div>
      <div className={cn("flex items-center", className)}>
        <span className="group rounded-full p-2 hover:bg-rose-500/10">
          <ThumbsDown
            className="stroke-current stroke-[1.5] text-muted-foreground group-hover:stroke-rose-500 "
            size={20}
          />
        </span>
        {likes_count && (
          <span className="mt-1 text-xs text-muted-foreground">
            {likes_count}
          </span>
        )}
      </div>
    </>
  )
}
