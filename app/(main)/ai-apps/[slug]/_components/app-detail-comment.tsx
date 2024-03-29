"use client"

import React from "react"

import { App, CommentWithProfile } from "@/types/db_tables"
import useUser from "@/hooks/react-hooks/use-user"
import CommentList from "@/components/comment/comment-list"

export const dynamic = "force-dynamic"
export const revalidate = 0

type AppDetailCommentsProps = {
  app_id: App["app_id"]
  comments: CommentWithProfile[] | null
}

const AppDetailComments: React.FC<AppDetailCommentsProps> = ({
  app_id = "",
  comments,
}) => {
  console.log(JSON.stringify(comments, null, 2))
  // TODO: CHECK IF IT NEEDS USEEFFECT
  const { isFetching, data: profile } = useUser()

  return (
    // <CommentWrapper>
    // {profile?  (
    //   <CommentForm app_id={app_id} userId={session?.user.id} />
    // ) : (
    //   <SignInToComment />
    // )}
    <div className="h-full py-5">
      <div className="">Comments</div>
      {comments && <CommentList comments={comments} />}
    </div>
    // </CommentWrapper>
  )
}

export default AppDetailComments
