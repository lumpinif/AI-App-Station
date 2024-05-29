import * as React from "react"
import { DeleteAppComment } from "@/server/queries/supabase/comments/app_comments"
import { useQueryClient } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

import { App_Comments } from "@/types/db_tables"
import { cn } from "@/lib/utils"

import { LoadingSpinner } from "../shared/loading-spinner"
import { SpinnerButton } from "../shared/spinner-button"
import { ButtonProps } from "../ui/button"

type CommentDeleteButtonProps = ButtonProps & {
  app_id: App_Comments["app_id"]
  comment_id: App_Comments["comment_id"]
  parent_id: App_Comments["parent_id"]
  onDeleted?: () => void
}

const CommentDeleteButton: React.FC<CommentDeleteButtonProps> = ({
  app_id,
  comment_id,
  parent_id,
  onDeleted,
  ...props
}) => {
  const [isPending, startTransition] = React.useTransition()
  const queryClient = useQueryClient()
  const queryKey = parent_id ? ["replies", parent_id] : ["replies", comment_id]

  const handleDelete = () => {
    const DeleteAppCommentPromise = async () => {
      const { error: deleteAppCommentError } = await DeleteAppComment(
        app_id,
        comment_id
      )

      if (deleteAppCommentError) {
        throw new Error(deleteAppCommentError)
      }
    }

    toast.promise(DeleteAppCommentPromise(), {
      loading: (
        <span className="flex items-center gap-x-2">
          <LoadingSpinner size={16} /> Deleting the comment... Please wait
        </span>
      ),
      success: () => {
        queryClient.invalidateQueries({ queryKey: queryKey })
        onDeleted && onDeleted()
        return "Comment Deleted"
      },
      error: (error) => {
        return error.message || "Failed to delete comment"
      },
    })
  }

  return (
    <SpinnerButton
      variant={"default"}
      isLoading={isPending}
      onClick={() => startTransition(handleDelete)}
      role="button"
      {...props}
    >
      <span className="flex w-fit items-center text-center">Delete</span>
    </SpinnerButton>
  )
}

export default CommentDeleteButton
