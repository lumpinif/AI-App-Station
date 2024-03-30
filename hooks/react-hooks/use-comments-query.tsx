"use clietn"

import { createSupabaseBrowserClient } from "@/utils/supabase/browser-client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { App, CommentWithProfileWithChildren } from "@/types/db_tables"

const supabase = createSupabaseBrowserClient()

function useCommentsQuery(app_id: App["app_id"]) {
  const queryKey = ["comments", app_id]

  return useQuery({
    queryKey,
    queryFn: () => fetchCommentByAppId(app_id),
  })
}

export default useCommentsQuery

async function fetchCommentByAppId(app_id: App["app_id"]) {
  let { data, error } = await supabase.rpc("app_threaded_comments", {
    app_uuid: app_id,
  })

  if (error) {
    console.log("🚀 ~ fetchCommentByAppId ~ error:", error)
    toast.error(`Error loading Comments! Please try again later.`)
    return null
  }

  return data
}
