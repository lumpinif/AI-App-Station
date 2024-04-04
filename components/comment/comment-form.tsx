"use client"

import React from "react"

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
          // variant={"secondary"}
          onClick={() => setisReplying(!isReplying)}
          disabled={isReplying}
        >
          Leave a comment
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
