"use client"

import React, { useEffect } from "react"
import { createSupabaseBrowserClient } from "@/utils/supabase/browser-client"
import { createBrowserClient } from "@supabase/ssr"
import { toast } from "sonner"

import { App, CommentWithProfileWithChildren } from "@/types/db_tables"
import useCommentsQuery from "@/hooks/react-hooks/use-comments-query"
import useUser from "@/hooks/react-hooks/use-user"
import CommentList from "@/components/comment/comment-list"

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
  } = useCommentsQuery(app_id) as {
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
      <pre>{JSON.stringify(comments, null, 2)}</pre>
    </div>
  )
}

export default AppDetailCommentSection
