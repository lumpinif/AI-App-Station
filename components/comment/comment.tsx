"use client"

import React from "react"
import Link from "next/link"
import { Delete, EllipsisVertical, Flag, Pencil, Share2 } from "lucide-react"
import moment from "moment"
import { toast } from "sonner"

import { CommentWithProfile } from "@/types/db_tables"
import { cn } from "@/lib/utils"
import { useReplies } from "@/hooks/react-hooks/use-replies-query"
import useUser from "@/hooks/react-hooks/use-user"

import { Icons } from "../icons/icons"
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
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Skeleton } from "../ui/skeleton"
import { CommentActions } from "./comment_actions"
import CommentDeleteButton from "./comment_delete_button"

type CommentProps = {
  comment: CommentWithProfile
} & {
  depth?: number
}

const Comment = ({ comment, depth = 0 }: CommentProps) => {
  const [isShowReplies, setisShowReplies] = React.useState<boolean>(false)
  const [isEditing, setIsEditing] = React.useState<boolean>(false)
  const { data, error, isFetching } = useReplies(comment.comment_id)
  const { data: profile } = useUser()

  if (isFetching)
    return (
      <>
        <div
          className={cn(
            "flex w-full items-start space-x-4 px-4",
            depth === 1 ? "ml-6 mt-3" : "mt-3",
            depth === 0 && "mt-6"
          )}
        >
          <Skeleton className="h-10 w-10 flex-none rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-6 w-1/2 max-w-xl" />
            <Skeleton className="h-10 w-full max-w-lg" />
          </div>
        </div>
      </>
    )

  if (error) {
    toast.error("Failed to fetch replies")
  }

  if (!data?.replies) return null
  const isReplied = data.replies.length > 0
  const repliesCount = data.replies.length

  return (
    <div className={cn("flex flex-col", depth === 1 ? "pl-6" : "")}>
      <div
        className="flex gap-x-4 rounded-lg p-4 hover:bg-muted/10"
        id={comment.comment_id}
      >
        <div className="relative shrink-0">
          {isReplied && isShowReplies && (
            <>
              {depth === 0 ? (
                <>
                  <span className="absolute -bottom-1 left-1/2 right-1/2 h-full w-0.5 translate-x-[0.5px] border-l" />
                  <span className="absolute -bottom-1 right-0 h-0.5 w-1/2 translate-x-[0.5px] border-b" />
                  <span className="absolute -bottom-6 right-0 h-1/6 w-0.5 translate-x-[0.5px] border-r" />
                </>
              ) : (
                <span className="absolute left-1/2 right-1/2 top-11 h-[calc(100%-1rem)] w-0.5 translate-x-[0.5px] border-l" />
              )}
            </>
          )}
          <Avatar>
            <AvatarImage
              src={comment.profiles.avatar_url as string}
              alt="Avatar"
              className="animate-fade rounded-full"
            />
            <AvatarFallback>
              <span className="flex h-full w-full items-center justify-center bg-muted">
                <Icons.user
                  className={cn(
                    "h-[calc(75%)] w-[calc(75%)] animate-fade rounded-full text-muted-foreground"
                  )}
                />
              </span>
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex w-full flex-col gap-y-2">
          <div className="flex items-center justify-between ">
            <div className="flex flex-col">
              <div className="flex items-center gap-x-1">
                <h4 className="font-bold">
                  {comment.profiles.display_name
                    ? comment.profiles.display_name
                    : `user_${comment.profiles.user_id.slice(-5)}`}
                </h4>
                <span className="ml-2 text-sm text-muted-foreground">
                  <Link href={""} className="hover:underline">
                    @
                    {comment.profiles.display_name
                      ? comment.profiles.display_name
                      : `user_${comment.profiles.user_id.slice(-5)}`}
                  </Link>
                </span>
                <span className="h-[2px] w-[2px] rounded-full bg-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {moment(comment.created_at).fromNow()}
                </span>
              </div>
              <div className="prose text-primary">
                {comment.comment} :\\\ this comment_id: {comment.comment_id}{" "}
                parent_id:{comment.parent_id}
              </div>
            </div>
            <div>
              <AlertDialog>
                <AlertDialogContent className="glass-card-background rounded-lg border-none shadow-outline backdrop-blur-xl max-sm:max-w-sm ">
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your comment.
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
                        comment.profiles?.user_id === profile?.user_id
                          ? ""
                          : "hidden"
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
                        comment.profiles?.user_id === profile?.user_id
                          ? "hidden"
                          : ""
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
          </div>
          <CommentActions
            comment={comment}
            isEditing={isEditing}
            isReplied={isReplied}
            isShowReplies={isShowReplies}
            repliesCount={repliesCount}
            setIsEditing={() => setIsEditing(!isEditing)}
            setisShowReplies={setisShowReplies}
          />
        </div>
      </div>
      {isReplied && isShowReplies && (
        <div>
          {data.replies.map((reply) => (
            <Comment
              key={reply.comment_id}
              comment={reply}
              depth={Math.min(depth + 1, 2)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Comment
