import { getPostComments } from "@/server/queries/supabase/comments/post_comments"
import { createSupabaseBrowserClient } from "@/utils/supabase/browser-client"
import { useQuery } from "@tanstack/react-query"

import { PostCommentWithProfile, Posts } from "@/types/db_tables"

export default function useDailyPostComments(post_id: Posts["post_id"]) {
  return useQuery({
    queryKey: ["daily_post_comments"],
    queryFn: () => fetchPostComments(post_id),
  })
}

const fetchPostComments = async (post_id: Posts["post_id"]) => {
  let { comments: post_comments, error: getPostCommentsError } =
    await getPostComments(post_id)

  // Ensure all comments have post_comment_likes as an array
  post_comments =
    post_comments?.map((comment) => ({
      ...comment,
      post_comment_likes: comment.post_comment_likes ?? [],
    })) ?? []

  return { post_comments, getPostCommentsError }
}
