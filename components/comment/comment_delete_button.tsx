import * as React from "react"
import { DeleteComment } from "@/server/data/supabase"
import { useQueryClient } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

import { Comment } from "@/types/db_tables"

type CommentDeleteButtonProps = {
  app_id: Comment["app_id"]
  comment_id: Comment["comment_id"]
  parent_id: Comment["parent_id"]
  className?: string
}

const CommentDeleteButton: React.FC<CommentDeleteButtonProps> = ({
  className,
  app_id,
  comment_id,
  parent_id,
}) => {
  const [isPending, startTransition] = React.useTransition()
  const queryClient = useQueryClient()
  const queryKey = parent_id ? ["replies", parent_id] : ["replies", comment_id]

  const handleDelete = () => {
    startTransition(async () => {
      try {
        const result = await DeleteComment(comment_id, app_id)
        if (result !== null) {
          toast.success("Comment deleted")
          queryClient.invalidateQueries({ queryKey: queryKey })
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

          <span className="flex items-center">
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Delete
          </span>
          {/* <Delete size={12} /> */}
          {/* </div> */}
        </button>
      </form>
    </>
  )
}

export default CommentDeleteButton
