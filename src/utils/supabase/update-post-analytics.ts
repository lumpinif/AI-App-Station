import { Posts } from "@/types/db_tables"

import privateServiceClient from "./service-client"

export async function updatePostAnalytics(post_id: Posts["post_id"]) {
  if (!post_id) {
    console.error("Missing post_id")
    throw new Error("Missing post_id")
  }

  const supabase = privateServiceClient()

  try {
    let { data, error: incPostViewError } = await supabase.rpc(
      "increment_post_view_count",
      {
        p_post_id: post_id,
      }
    )
    if (incPostViewError) {
      // console.error("Error incrementing post view count", incPostViewError)
      throw incPostViewError
    }

    return {
      messsage: `Post View count incremented successfully for:  ${post_id}`,
    }
  } catch (error) {
    // console.error(
    //   `Error incrementing view count: ${post_id}`,
    //   error
    // )
    throw error
  }
}
