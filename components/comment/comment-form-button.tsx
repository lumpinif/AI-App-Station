"use client"

import React from "react"
import { addAppComment } from "@/server/queries/supabase/comments/app_comments"
import { MessageCircleMore } from "lucide-react"

import { App_Comments, Post_Comments } from "@/types/db_tables"
import { cn } from "@/lib/utils"

import { Button } from "../ui/button"
import CommentReplyForm from "./comment-reply-form"

type CommentFormProps = {
  db_row_id: App_Comments["app_id"] | Post_Comments["post_id"]
}

export const CommentFormButton: React.FC<CommentFormProps> = ({
  db_row_id,
}) => {
  const [isReplying, setIsReplying] = React.useState<boolean>(false)

  return (
    <>
      {!isReplying ? (
        <Button
          onClick={() => setIsReplying(true)}
          variant={"ghost"}
          className={cn(
            "dark:shadow-outline animate-in flex w-full items-center space-x-2 border dark:border-none"
          )}
          size="default"
        >
          <MessageCircleMore className="text-muted-foreground size-3" />
          <span className="text-muted-foreground select-none text-xs">
            Leave a Comment
          </span>
        </Button>
      ) : (
        <CommentReplyForm
          CommentReplyService={addAppComment}
          withRating={true}
          db_row_id={db_row_id}
          toggleReplying={() => setIsReplying(false)}
        />
      )}
    </>
  )
}
