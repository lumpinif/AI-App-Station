import {
  CommentActionsProp,
  CommentDeleteServiceType,
  CommentEditServiceType,
  CommentReplyServiceType,
  CommentsOfTable,
  TCommentWithProfile,
  TSetOptimisticComment,
} from "@/types/db_tables"
import { cn, getIsReplied } from "@/lib/utils"

import { CommentCard } from "./comment-card"
import { CommentCardActions } from "./comment-card-actions"
import { CommentChildReplies } from "./comment-child-replies"
import { CommentListWrapper } from "./comment-list-wrapper"

export type CommentListProps<
  T extends TCommentWithProfile,
  U extends (...args: any) => any,
  R extends (...args: any) => any,
  V extends (...args: any) => any,
> = Pick<CommentActionsProp, "setIsShowReplies"> & {
  commentsList: T[]
  commentsOf: CommentsOfTable
  idsToRender?: string[]
  indentLevel?: number
  setOptimisitcComment: TSetOptimisticComment
  commentReplyService: CommentReplyServiceType<U>
  updateCommentService: CommentEditServiceType<R>
  deleteCommentService: CommentDeleteServiceType<V>
}

export function CommentList<
  T extends TCommentWithProfile,
  U extends (...args: any) => any,
  R extends (...args: any) => any,
  V extends (...args: any) => any,
>({
  idsToRender = [],
  indentLevel = 0,
  commentsList: optimisticComments,
  commentsOf = "apps",
  setIsShowReplies,
  setOptimisitcComment,
  commentReplyService,
  updateCommentService,
  deleteCommentService,
}: CommentListProps<T, U, R, V>) {
  // Default to rendering top-level comments if no specific IDs are provided
  if (!idsToRender || !idsToRender.length) {
    idsToRender = optimisticComments
      .filter((i) => !i.parent_id)
      .map((i) => i.comment_id)
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

        const { isReplied } = getIsReplied(
          optimisticComments,
          comment.comment_id
        )

        return (
          <div className="flex flex-col" key={comment.comment_id}>
            <CommentListWrapper comment={comment}>
              <div className="flex w-full flex-col space-y-4">
                <div className="flex justify-between gap-1">
                  <div className="w-full flex-1">
                    <CommentCard comment={comment!}>
                      <CommentCardActions<U, R, V>
                        comment={comment}
                        isReplied={isReplied}
                        commentsOf={commentsOf}
                        parent_id={comment!.comment_id}
                        commentsList={optimisticComments}
                        setIsShowReplies={setIsShowReplies}
                        setOptimisitcComment={setOptimisitcComment}
                        commentReplyService={commentReplyService}
                        updateCommentService={updateCommentService}
                        deleteCommentService={deleteCommentService}
                      />
                    </CommentCard>
                  </div>
                </div>
              </div>
            </CommentListWrapper>
            <CommentChildReplies<T, U, R, V>
              commentsOf={commentsOf}
              indentLevel={indentLevel + 1}
              parent_id={comment!.comment_id}
              commentsList={optimisticComments}
              setOptimisitcComment={setOptimisitcComment}
              commentReplyService={commentReplyService}
              updateCommentService={updateCommentService}
              deleteCommentService={deleteCommentService}
            />
          </div>
        )
      })}
    </div>
  )
}
