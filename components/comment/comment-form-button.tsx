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
          commentReplyService={commentReplyService}
          withRating={true}
          db_row_id={db_row_id}
          toggleReplying={() => setIsReplying(false)}
        />
      )}
    </>
  )
}
