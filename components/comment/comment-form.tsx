"use client"

import React from "react"
import { MessageCircleMore } from "lucide-react"

import { Comment } from "@/types/db_tables"

import { Button } from "../ui/button"
import CommentReplyForm from "./comment-reply-form"

type CommentFormProps = {
  app_id: Comment["app_id"]
}

export const CommentForm: React.FC<CommentFormProps> = ({ app_id }) => {
  const [isReplying, setisReplying] = React.useState<boolean>(false)

  return (
    <>
      {!isReplying && (
        <Button
          onClick={() => setisReplying(!isReplying)}
          disabled={isReplying}
          variant={"ghost"}
          className="flex items-center space-x-2 border dark:border-none dark:shadow-outline"
          size="default"
        >
          <MessageCircleMore className="size-3 text-muted-foreground" />
          <span className="select-none text-xs text-muted-foreground">
            Leave a Comment
          </span>
        </Button>
      )}
      {isReplying && (
        <CommentReplyForm
          withRating={true}
          app_id={app_id}
          toggleReplying={() => setisReplying(!isReplying)}
        />
      )}
    </>
  )
}
