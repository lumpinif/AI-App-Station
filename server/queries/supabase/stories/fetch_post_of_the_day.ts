"use server"

import createSupabaseServerClient from "@/utils/supabase/server-client"

import { PostOfTheDay } from "@/types/db_tables"

export async function getPostOfTheDay() {
  const supabase = await createSupabaseServerClient()

  const currentDate = new Date().toISOString().split("T")[0]
  // console.log("🚀 ~ currentDate:", currentDate)
  // 🚀 ~ currentDate: 2024-06-14

  const { data: post, error } = await supabase
    .from("post_of_the_day")
    .select(
      "*,posts(*,topics(*),profiles(*),categories(*),post_likes(*),post_bookmarks(*))"
    )
    .eq("created_on", currentDate)
    .single<PostOfTheDay>()

  return { post, error }
}
