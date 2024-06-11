import { Apps } from "@/types/db_tables"

import privateServiceClient from "./service-client"

export async function updateAppAnalytics(app_slug: Apps["app_slug"]) {
  if (!app_slug) {
    console.error("Missing app_slug")
    throw new Error("Missing app_slug")
  }

  const supabase = privateServiceClient()

  try {
    let { data, error: incAppViewError } = await supabase.rpc(
      "increment_app_view_count",
      {
        p_app_slug: app_slug,
      }
    )
    if (incAppViewError) {
      // console.error("Error incrementing app view count", incAppViewError)
      throw incAppViewError
    }

    return {
      messsage: `App View count incremented successfully for:  ${app_slug}`,
    }
  } catch (error) {
    // console.error(
    //   `Error incrementing view count: ${app_slug}`,
    //   error
    // )
    throw error
  }
}
