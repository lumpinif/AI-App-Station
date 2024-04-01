import * as React from "react"
import { DeleteComment } from "@/server/data/supabase"
import { toast } from "sonner"

import { CommentAction } from "@/types/db_tables"

type CommentDeleteButtonProps = Pick<CommentAction, "comment_id" | "app_id"> & {
  className?: string
}

const CommentDeleteButton: React.FC<CommentDeleteButtonProps> = ({
  className,
  app_id,
  comment_id,
}) => {
  const [isPending, startTransition] = React.useTransition()

  const handleDelete = () => {
    startTransition(async () => {
      try {
        const result = await DeleteComment(comment_id, app_id)
        if (result !== null) {
          toast.success("Comment deleted")
        } else {
          toast.error("Something went wrong")
        }
      } catch (error) {
        toast.error("Failed to delete comment")
      }
    })
  }

  return (
    <>
      <form action={handleDelete} className="w-full">
        <button type="submit">
          {/* <div className="flex w-full items-center px-1"> */}
          <span>Delete</span>
          {/* <Delete size={12} /> */}
          {/* </div> */}
        </button>
      </form>
    </>
  )
}

export default CommentDeleteButton
