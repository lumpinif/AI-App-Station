"use server"

import createSupabaseServerClient from "@/utils/supabase/server-client"

import { DailyPost } from "@/types/db_tables"

export async function getDailyPost() {
  const supabase = await createSupabaseServerClient()

  const currentDate = new Date().toISOString().split("T")[0]
  // console.log("🚀 ~ currentDate:", currentDate)
  // 🚀 ~ currentDate: 2024-06-14

  const { data: post, error } = await supabase
    .from("daily_post")
    .select(
      "*,posts(*,topics(*),profiles(*),categories(*),post_likes(*),post_bookmarks(*))"
    )
    .eq("created_on", currentDate)
    .single<DailyPost>()

  return { post, error }
}
