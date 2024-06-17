"use server"

import { unstable_noStore as noStore } from "next/cache"
import createSupabaseServerClient from "@/utils/supabase/server-client"

import { Daily_app, DailyApp } from "@/types/db_tables"

export async function getDailyApp(created_on?: Daily_app["created_on"]) {
  noStore()
  const supabase = await createSupabaseServerClient()

  const currentDate = new Date().toISOString().split("T")[0]
  // console.log("🚀 ~ currentDate:", currentDate)
  // 🚀 example ~ currentDate: 2024-06-15

  const { data: app, error } = await supabase
    .from("daily_app")
    .select(
      "*,apps(*,categories(*),profiles(*),developers(*),app_likes(*),app_bookmarks(*))"
    )
    .eq("created_on", created_on ? created_on : currentDate)
    .limit(1)
    .maybeSingle<DailyApp>()

  // If no app is found for the current date, fetch the most recent app
  if (!app && !error) {
    const { data: app, error: getRecentAppEror } = await supabase
      .from("daily_app")
      .select(
        "*,apps(*,categories(*),profiles(*),developers(*),app_likes(*),app_bookmarks(*))"
      )
      .order("created_on", { ascending: false })
      .limit(1)
      .single<DailyApp>()

    return { app, error: getRecentAppEror }
  }

  return { app, error }
}
