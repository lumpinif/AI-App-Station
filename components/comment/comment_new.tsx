"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { Delete, EllipsisVertical, Flag, Pencil, Share2 } from "lucide-react"
import moment from "moment"

import { CommentWithProfile } from "@/types/db_tables"
import { cn } from "@/lib/utils"
import { useReplies } from "@/hooks/react-hooks/use-replies-query"

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
import { CommentActions } from "./comment_actions"
import CommentDeleteButton from "./comment_delete_button"

type CommentProps = {
  comment: CommentWithProfile
}

const Comment = ({ comment }: CommentProps) => {
  const [isShowReplies, setisShowReplies] = React.useState<boolean>(false)
  const [isEditing, setIsEditing] = React.useState<boolean>(false)
  const { data, error, isFetching } = useReplies(comment.comment_id)

  if (!data?.replies) return "loading..."
  if (isFetching) return "this is loading..."

  // Handle reply submission
  // const handleReplySubmit = async (e: React.FormEvent, content: string) => {
  //   e.preventDefault()
  //   // Add reply to Supabase
  //   const { data } = await supabase
  //     .from('comments')
  //     .insert({ content, parent_id: comment.id })
  //   // Fetch updated replies
  //   fetchReplies()
  // }
  const isReplied = data.replies.length > 0
  const repliesCount = data.replies.length
  return (
    <div className="flex flex-col">
      <div
        className="flex gap-x-4 rounded-lg p-4 hover:bg-muted/10"
        id={comment.comment_id}
      >
        <div className="relative shrink-0 ">
          {isReplied && isShowReplies && (
            <span className="absolute left-1/2 right-1/2 top-11 h-[calc(100%-1rem)] w-0.5 translate-x-[0.5px] border-l" />
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
                {comment.comment} : this comment_id: {comment.comment_id}{" "}
                parent_id:{comment.parent_id}
              </div>
            </div>
            <div>
              <AlertDialog>
                <AlertDialogContent>
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
                        comment.profiles?.user_id === comment.profiles.user_id
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
                          comment.profiles?.user_id === comment.profiles.user_id
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
                        comment.profiles?.user_id === comment.profiles.user_id
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
            setisShowReplies={() => setisShowReplies(!isShowReplies)}
          />
        </div>
      </div>
      {isReplied && isShowReplies && (
        <div>
          {data.replies.map((reply) => (
            <Comment key={reply.comment_id} comment={reply} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Comment
