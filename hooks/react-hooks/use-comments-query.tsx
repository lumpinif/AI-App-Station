"use client"

import { createSupabaseBrowserClient } from "@/utils/supabase/browser-client"
import { useQuery } from "@tanstack/react-query"
import { toast } from "sonner"

import { App, Comment } from "@/types/db_tables"

const supabase = createSupabaseBrowserClient()

function useAllCommentsQuery(app_id: App["app_id"]) {
  const queryKey = ["comments", app_id]

  return useQuery({
    queryKey,
    queryFn: () => fetchCommentByAppId(app_id),
  })
}

export default useAllCommentsQuery

async function fetchCommentByAppId(app_id: App["app_id"]) {
  let { data, error } = await supabase.rpc("app_threaded_comments", {
    app_uuid: app_id,
  })

  if (error) {
    toast.error(`Error loading Comments! Please try again later.`)
    return null
  }

  return data
}

export function useReplies(
  parent_id: Comment["parent_id"],
  showReplies: boolean
) {
  const queryKey = ["replies", parent_id]

  return useQuery({
    queryKey,
    queryFn: () => fetchRepliesByParentId(parent_id),
    enabled: showReplies,
  })
}

async function fetchRepliesByParentId(parent_id: Comment["parent_id"]) {
  let { data, error } = await supabase.rpc("app_replies_tree", {
    parent_comment_id: parent_id as string,
  })

  if (error) {
    console.log("🚀 ~ fetchRepliesByParentId ~ error", error)
    toast.error(`Error loading Replies! Please try again later.`)
    return null
  }

  return data
}
