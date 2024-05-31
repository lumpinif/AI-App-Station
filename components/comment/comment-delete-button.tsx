import * as React from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import {
  CommentDeleteServiceType,
  TCommentId,
  TCommentRowId,
  TCommentWithProfile,
  TSetOptimisticComment,
} from "@/types/db_tables"

import { LoadingSpinner } from "../shared/loading-spinner"
import { SpinnerButton } from "../shared/spinner-button"
import { ButtonProps } from "../ui/button"

type CommentDeleteButtonProps<V extends (...args: any) => any> = ButtonProps & {
  db_row_id: TCommentRowId
  comment_id: TCommentId
  setOptimisitcComment: TSetOptimisticComment
  deleteCommentService: CommentDeleteServiceType<V>
  onDeleted?: () => void
}

const CommentDeleteButton = <V extends (...args: any) => any>({
  db_row_id,
  comment_id,
  onDeleted,
  setOptimisitcComment,
  deleteCommentService,
  ...props
}: CommentDeleteButtonProps<V>) => {
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()

  const handleDelete = () => {
    startTransition(() => {
      const deleteAppCommentPromise = async () => {
        const { error: deleteAppCommentError } = await deleteCommentService(
          db_row_id,
          comment_id
        )

        if (deleteAppCommentError) {
          throw new Error(deleteAppCommentError)
        }
      }

      // Optimistically update the state to remove the comment
      setOptimisitcComment({
        type: "delete",
        comment_id,
      })

      router.refresh()

      toast.promise(deleteAppCommentPromise(), {
        loading: (
          <span className="flex items-center gap-x-2">
            <LoadingSpinner size={16} /> Deleting the comment... Please wait
          </span>
        ),
        success: () => {
          if (onDeleted) onDeleted()
          return "Comment Deleted"
        },
        error: (error) => {
          return error.message || "Failed to delete comment"
        },
      })
    })
  }

  return (
    <SpinnerButton
      variant="default"
      isLoading={isPending}
      onClick={handleDelete}
      role="button"
      {...props}
    >
      <span className="flex w-fit items-center text-center">Delete</span>
    </SpinnerButton>
  )
}

export default CommentDeleteButton
