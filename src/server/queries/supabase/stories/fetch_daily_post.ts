"use server"

import { unstable_noStore as noStore } from "next/cache"
import createSupabaseServerClient from "@/utils/supabase/server-client"

import { Daily_post, DailyPost } from "@/types/db_tables"

export async function getDailyPost(created_on?: Daily_post["created_on"]) {
  noStore()
  const supabase = await createSupabaseServerClient()

  const currentDate = new Date().toISOString().split("T")[0]
  // console.log("🚀 ~ currentDate:", currentDate)
  // 🚀 example ~ currentDate: 2024-06-15

  const { data: post, error } = await supabase
    .from("daily_post")
    .select(
      "*,posts!inner(*,topics(*),profiles(*,profile_role(*)),categories(*),post_likes(*),post_bookmarks(*))"
    )
    .match({
      created_on: created_on ? created_on : currentDate,
      is_archived: false,
      "posts.post_publish_status": "published",
    })
    .limit(1)
    .maybeSingle<DailyPost>()

  // If no post is found for the current date, fetch the most recent post
  if (!post && !error) {
    const { data: post, error: getRecentPostEror } = await supabase
      .from("daily_post")
      .select(
        "*,posts!inner(*,topics(*),profiles(*),categories(*),post_likes(*),post_bookmarks(*))"
      )
      .order("created_on", { ascending: false })
      .match({ is_archived: false, "posts.post_publish_status": "published" })
      .limit(1)
      .maybeSingle<DailyPost>()

    return { post, error: getRecentPostEror }
  }

  return { post, error }
}
