"use client"

import { Delete, EllipsisVertical, Flag, Pencil, Share2 } from "lucide-react"

import { CommentWithProfile } from "@/types/db_tables"
import { cn } from "@/lib/utils"
import useUser from "@/hooks/react-hooks/use-user"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import CommentDeleteButton from "./comment-delete-button"

type CommentDropDownMenuProps = {
  comment: CommentWithProfile
} & {
  isEditing: boolean
  setIsEditing: (isEditing: boolean) => void
}

export const CommentDropDownMenu: React.FC<CommentDropDownMenuProps> = ({
  comment,
  setIsEditing,
  isEditing,
}) => {
  const { data: profile } = useUser()
  return (
    <>
      <div>
        <AlertDialog>
          <AlertDialogContent className="glass-card-background rounded-lg border-none shadow-outline backdrop-blur-xl max-sm:max-w-sm ">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                comment.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-destructive text-muted-foreground hover:bg-destructive/80 hover:text-primary">
                <CommentDeleteButton
                  app_id={comment.app_id}
                  comment_id={comment.comment_id}
                  parent_id={comment.parent_id}
                />
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
              className="ring-offset-background focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            >
              <EllipsisVertical size={16} />
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
              <AlertDialogTrigger asChild>
                <DropdownMenuItem
                  className={cn(
                    "cursor-pointer",
                    comment.profiles?.user_id === profile?.user_id
                      ? ""
                      : "hidden"
                  )}
                >
                  <div className="flex w-full items-center justify-between px-1">
                    <span>Delete</span>
                    <Delete size={12} />
                  </div>
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <DropdownMenuItem>
                <div className="flex w-full items-center justify-between px-1">
                  Share
                  <Share2 size={12} />
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
        </AlertDialog>
      </div>
    </>
  )
}
