"use client"

import { useState } from "react"
import { Delete, Ellipsis, Flag, Pencil, Share2 } from "lucide-react"

import {
  CommentActionsProp,
  CommentDeleteServiceType,
  TCommentRowId,
  TCommentWithProfile,
  TSetOptimisticComment,
} from "@/types/db_tables"
import { cn } from "@/lib/utils"
import useUserProfile from "@/hooks/react-hooks/use-user"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { CommentDeleteDialog } from "./comment-delete-dialog"
import { CommentShareModal } from "./comment-share-modal"

type CommentDropDownMenuProps<V extends (...args: any) => any> = Pick<
  CommentActionsProp,
  "isEditing" | "setIsEditing"
> & {
  comment: TCommentWithProfile
  db_row_id: TCommentRowId
  setOptimisitcComment: TSetOptimisticComment
  deleteCommentService: CommentDeleteServiceType<V>
}

export const CommentDropDownMenu = <V extends (...args: any) => any>({
  comment,
  db_row_id,
  isEditing,
  setIsEditing,
  deleteCommentService,
  setOptimisitcComment,
}: CommentDropDownMenuProps<V>) => {
  const { data: profile } = useUserProfile()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)

  return (
    <>
      <CommentDeleteDialog<V>
        comment={comment}
        db_row_id={db_row_id}
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        setOptimisitcComment={setOptimisitcComment}
        deleteCommentService={deleteCommentService}
      />
      <CommentShareModal
        nested={true}
        comment={comment}
        open={isShareDialogOpen}
        onOpenChange={setIsShareDialogOpen}
      />
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="cursor-pointer text-muted-foreground/70 ring-offset-background transition-all duration-150 ease-in-out hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 data-[state=open]:text-primary"
        >
          <Ellipsis size={16} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className={cn(
              "cursor-pointer",
              comment.profiles?.user_id === profile?.user_id ? "" : "hidden"
            )}
            onClick={() => setIsEditing(!isEditing)}
          >
            <div className="flex w-full items-center justify-between px-1">
              Edit
              <Pencil size={12} className="mb-1" />
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <div
              className="flex w-full cursor-pointer items-center justify-between px-1"
              onClick={() => setIsShareDialogOpen(true)}
            >
              Share
              <Share2 size={12} />
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem
            className={cn(
              "group cursor-pointer hover:!bg-destructive",
              comment.profiles?.user_id === profile?.user_id ? "" : "hidden"
            )}
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            <div className=" flex w-full items-center justify-between px-1">
              <span className="text-destructive group-hover:text-background dark:text-red-500 group-hover:dark:text-primary">
                Delete
              </span>
              <Delete
                size={12}
                className="text-destructive group-hover:text-background dark:text-red-500 group-hover:dark:text-primary"
              />
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem
            className={cn(
              "cursor-pointer",
              comment.profiles?.user_id === profile?.user_id ? "hidden" : ""
            )}
          >
            <div className="flex w-full items-center justify-between px-1">
              Report
              <Flag size={12} />
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
