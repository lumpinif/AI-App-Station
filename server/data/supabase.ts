"use server"

import createSupabaseServerClient from "@/utils/supabase/server-client"

import { Database } from "@/types/supabase"

type Apps = Database["public"]["Tables"]["apps"]["Row"]

export async function SubmitApp(title: Apps["title"]) {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { newApp: null, error: "Unauthorized" }
  }

  if (title === null) {
    return { newApp: null, error: "Title is null" }
  }

  // Check if title already exists
  const { data: existingApp, error: existingAppError } = await supabase
    .from("apps")
    .select("title")
    .ilike("title", title)

  if (existingAppError) {
    return { newApp: null, error: existingAppError }
  }

  if (existingApp && existingApp.length > 0) {
    // NO NEED FOR THIS, AS WE ARE USING .ilike("title", title) NOT .ilike("title", `%${title}%`)
    // Perform an exact case-insensitive comparison of the titles
    // const titleExists = existingApp.some(
    //   (app) => app.title?.toLowerCase() === title.toLowerCase()
    // )
    // if (titleExists){}
    return { newApp: null, error: "The App already exists. Please try again." }
  }

  const { data: newApp, error } = await supabase
    .from("apps")
    .insert([
      { title: title, submitted_by_user_id: user.id, submitted_by: user.email },
    ])
    .select("*")

  // TODO: REMOVE THIE BEFORE PRODUCTION

  if (error) {
    console.log("🚀 ~ Error: Submiting App ~ error:", error)
  }

  return { newApp, error }
}
