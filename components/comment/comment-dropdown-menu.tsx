"use client"

import { useState } from "react"
import { Delete, Ellipsis, Flag, Pencil, Share2 } from "lucide-react"

import {
  AppCommentActionsProp,
  AppCommentWithProfile,
  CommentActionsProp,
  TCommentWithProfile,
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

type CommentDropDownMenuProps = {
  comment: TCommentWithProfile
} & Pick<CommentActionsProp, "isEditing" | "setIsEditing">

export const CommentDropDownMenu: React.FC<CommentDropDownMenuProps> = ({
  comment,
  setIsEditing,
  isEditing,
}) => {
  const { data: profile } = useUserProfile()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)

  return (
    <>
      <CommentDeleteDialog
        comment={comment}
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
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
          className="text-muted-foreground/70 ring-offset-background hover:text-muted-foreground cursor-pointer focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
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
              "hover:!bg-destructive group cursor-pointer",
              comment.profiles?.user_id === profile?.user_id ? "" : "hidden"
            )}
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            <div className=" flex w-full items-center justify-between px-1">
              <span className="text-destructive group-hover:text-background group-hover:dark:text-primary dark:text-red-500">
                Delete
              </span>
              <Delete
                size={12}
                className="text-destructive group-hover:text-background group-hover:dark:text-primary dark:text-red-500"
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
