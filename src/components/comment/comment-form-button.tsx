"use client"

import React from "react"
import { MessageCircleMore } from "lucide-react"

import { CommentReplyServiceType, TCommentRowId } from "@/types/db_tables"
import { cn } from "@/lib/utils"

import { Button } from "../ui/button"
import CommentReplyForm from "./comment-reply-form"

type CommentFormProps<U extends (...args: any) => any> = {
  db_row_id: TCommentRowId
  commentReplyService: CommentReplyServiceType<U>
}

export const CommentFormButton = <U extends (...args: any) => any>({
  db_row_id,
  commentReplyService,
}: CommentFormProps<U>) => {
  const [isReplying, setIsReplying] = React.useState<boolean>(false)

  return (
    <>
      {!isReplying ? (
        <Button
          onClick={() => setIsReplying(true)}
          variant={"ghost"}
          className={cn(
            "flex w-full items-center space-x-2 border animate-in dark:border-none dark:shadow-outline"
          )}
          size="default"
        >
          <MessageCircleMore className="size-3 text-muted-foreground" />
          <span className="select-none text-xs text-muted-foreground">
            Leave a Comment
          </span>
        </Button>
      ) : (
        <CommentReplyForm
          withRating={true}
          db_row_id={db_row_id}
          commentReplyService={commentReplyService}
          toggleReplying={() => setIsReplying(false)}
        />
      )}
    </>
  )
}
