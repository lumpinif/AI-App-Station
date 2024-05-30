import { TCommentWithProfile } from "@/types/db_tables"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import CommentDeleteButton from "./comment-delete-button"

type CommentDeleteDialogProps = React.ComponentPropsWithoutRef<
  typeof Dialog
> & {
  isOpen: boolean
  comment: TCommentWithProfile
  onOpenChange: (open: boolean) => void
}

export const CommentDeleteDialog: React.FC<CommentDeleteDialogProps> = ({
  isOpen,
  comment,
  onOpenChange,
  ...props
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange} {...props}>
      <DialogContent className="shadow-outline rounded-lg backdrop-blur-xl max-sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Are you absolutely sure?
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            comment along with all replies.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col gap-y-2 sm:flex-row sm:gap-y-0">
          <Button onClick={() => onOpenChange(false)} variant={"outline"}>
            Cancel
          </Button>
          <CommentDeleteButton
            app_id={comment.app_id}
            comment_id={comment.comment_id}
            parent_id={comment.parent_id}
            variant={"destructive"}
            className="w-full sm:w-20"
            onDeleted={() => onOpenChange(false)}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
