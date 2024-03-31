"use client"

import React from "react"
import { getInitialComments } from "@/server/data"
import { toast } from "sonner"

import { App, CommentWithProfileWithChildren } from "@/types/db_tables"
import useAllCommentsQuery from "@/hooks/react-hooks/use-comments-query"
import useUser from "@/hooks/react-hooks/use-user"
import CommentList, { Comment } from "@/components/comment/comment-list"

export const dynamic = "force-dynamic"
export const revalidate = 0

type AppDetailCommentsProps = {
  app_id: App["app_id"]
}

const AppDetailCommentSection: React.FC<AppDetailCommentsProps> = ({
  app_id,
}) => {
  const {
    data: comments,
    error,
    isFetching,
  } = useAllCommentsQuery(app_id) as {
    data: CommentWithProfileWithChildren[] | null
    error: Error | null
    isFetching: boolean
  }

  if (Array.isArray(comments) && comments.length < 1) {
    return "No comments"
  }
  if (error || (comments && !Array.isArray(comments))) {
    toast.error(error?.message)
  }
  if (isFetching) {
    return "Loading..."
  }
  if (comments === null) {
    return null
  }

  // const { comments } = await getInitialComments(app_id)

  return (
    // {profile?  (
    //   <CommentForm app_id={app_id} userId={session?.user.id} />
    // ) : (
    //   <SignInToComment />
    // )}
    <div className="h-full py-5">
      <div className="">Comments</div>
      {comments && (
        <CommentList comments={comments as CommentWithProfileWithChildren[]} />
      )}
      {/* {comments?.map((comment) => (
        <Comment
          key={comment.comment_id}
          repliesCount={1}
          avatar_url={comment.profiles.avatar_url}
          display_name={comment.profiles.display_name}
          {...comment}
        />
      ))} */}
      <pre>{JSON.stringify(comments, null, 2)}</pre>
    </div>
  )
}

export default AppDetailCommentSection
