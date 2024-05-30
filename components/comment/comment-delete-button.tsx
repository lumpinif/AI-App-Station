import * as React from "react"
import { toast } from "sonner"

import {
  CommentDeleteServiceType,
  TCommentId,
  TCommentRowId,
} from "@/types/db_tables"

import { LoadingSpinner } from "../shared/loading-spinner"
import { SpinnerButton } from "../shared/spinner-button"
import { ButtonProps } from "../ui/button"

type CommentDeleteButtonProps<V extends (...args: any) => any> = ButtonProps & {
  db_row_id: TCommentRowId
  comment_id: TCommentId
  deleteCommentService: CommentDeleteServiceType<V>
  onDeleted?: () => void
}

const CommentDeleteButton = <V extends (...args: any) => any>({
  db_row_id,
  comment_id,
  onDeleted,
  deleteCommentService,
  ...props
}: CommentDeleteButtonProps<V>) => {
  const [isPending, startTransition] = React.useTransition()

  const handleDelete = () => {
    const DeleteAppCommentPromise = async () => {
      const { error: deleteAppCommentError } = await deleteCommentService(
        db_row_id,
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
