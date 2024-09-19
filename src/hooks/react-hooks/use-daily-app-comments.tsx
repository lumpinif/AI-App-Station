import { getAppComments } from "@/server/queries/supabase/comments/app_comments"
import { useQuery } from "@tanstack/react-query"

import { Apps } from "@/types/db_tables"

export default function useDailyAppComments(app_id: Apps["app_id"]) {
  return useQuery({
    queryKey: ["daily_app_comments"],
    queryFn: () => fetchAppComments(app_id),
  })
}

const fetchAppComments = async (app_id: Apps["app_id"]) => {
  let { comments: app_comments, error: getAppCommentsError } =
    await getAppComments(app_id)

  // Ensure all comments have app_comment_likes as an array
  app_comments =
    app_comments?.map((comment) => ({
      ...comment,
      app_comment_likes: comment.app_comment_likes ?? [],
    })) ?? []

  return { app_comments, getAppCommentsError }
}
