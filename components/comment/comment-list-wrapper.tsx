"use client"

import { useEffect, useState } from "react"

import { TCommentWithProfile } from "@/types/db_tables"
import { cn, scrollToSection } from "@/lib/utils"
import { useHash } from "@/hooks/use-hash"

type CommentListWrapperProps = {
  comment: TCommentWithProfile
  children?: React.ReactNode
}

export const CommentListWrapper: React.FC<CommentListWrapperProps> = ({
  comment,
  children,
}) => {
  const [isHighlighted, setIsHighlighted] = useState(false)
  const hash = useHash()

  useEffect(() => {
    setIsHighlighted(hash.includes(comment?.comment_id as string))

    if (isHighlighted) {
      scrollToSection(`comment-${String(comment.comment_id)}`)
    }
  }, [comment.comment_id, hash, isHighlighted])

  return (
    <div
      className={cn(
        "sm:hover:bg-muted sm:dark:hover:bg-muted/20 relative flex space-x-4 rounded-lg p-4 transition-all duration-100 ease-out ",
        isHighlighted && "bg-blue-200/30 dark:bg-blue-200/20"
      )}
      id={`comment-${String(comment.comment_id)}`}
    >
      {children}
    </div>
  )
}
