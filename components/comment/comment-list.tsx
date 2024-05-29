import { AppCommentWithProfile } from "@/types/db_tables"
import { cn } from "@/lib/utils"

import { CommentCard } from "./comment-card"
import { CommentCardActions } from "./comment-card-actions"
import { CommentChildReplies } from "./comment-child-replies"
import { CommentListWrapper } from "./comment-list-wrapper"

export type CommentListProps = {
  commentsList: AppCommentWithProfile[]
  idsToRender?: string[]
  indentLevel?: number
  setOptimisitcComment: (newComment: AppCommentWithProfile) => void
}

export function CommentList({
  commentsList: optimisticComments,
  idsToRender = [],
  indentLevel = 0,
  setOptimisitcComment,
}: CommentListProps) {
  if (!idsToRender.length) {
    idsToRender = optimisticComments
      .filter((i) => !i.parent_id)
      .map((i) => i.comment_id)
  }

  const getIsReplied = (
    optimisticComments: AppCommentWithProfile[],
    parent_id: string
  ) => {
    const childItems = optimisticComments.filter(
      (i) => i.parent_id === parent_id
    )

    const repliesCount = childItems.length
    const isReplied = repliesCount > 0
    return isReplied
  }

  return (
    <div
      className={cn(
        "relative flex flex-col gap-2",
        indentLevel > 0 && indentLevel <= 4 ? "ml-9 pl-2" : ""
      )}
      suppressHydrationWarning
    >
      {idsToRender.map((comment_id) => {
        const comment = optimisticComments.find(
          (i) => i.comment_id === comment_id
        )

        //TODO: HANDLE NO COMMENTS
        if (!comment) return null
        return (
          <div className="flex flex-col" key={comment.comment_id}>
            <CommentListWrapper comment={comment}>
              <div className="flex w-full flex-col space-y-4">
                <div className="flex justify-between gap-1">
                  <div className="w-full flex-1">
                    <CommentCard comment={comment!}>
                      <CommentCardActions
                        comment={comment}
                        parent_id={comment!.comment_id}
                        isReplied={getIsReplied(
                          optimisticComments,
                          comment.comment_id
                        )}
                        commentsList={optimisticComments}
                        setOptimisitcComment={setOptimisitcComment}
                      />
                    </CommentCard>
                  </div>
                </div>
              </div>
            </CommentListWrapper>
            <CommentChildReplies
              commentsList={optimisticComments}
              parent_id={comment!.comment_id}
              indentLevel={indentLevel + 1}
              setOptimisitcComment={setOptimisitcComment}
            />
          </div>
        )
      })}
    </div>
  )
}
