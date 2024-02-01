"use server"

import { revalidatePath } from "next/cache"
import createSupabaseServerClient from "@/utils/supabase/server-client"

import { Database } from "@/types/supabase"

type Apps = Database["public"]["Tables"]["apps"]["Row"]

export async function GetAppByUserId(
  app_id: Apps["app_id"],
  user_id: Apps["submitted_by_user_id"]
) {
  const supabase = await createSupabaseServerClient()

  if (!user_id) {
    return { app: null, error: "Unauthorized" }
  }

  const { data: app, error } = await supabase
    .from("apps")
    .select("*")
    .eq("app_id", app_id)
    .eq("submitted_by_user_id", user_id)
    .single()

  return { app, error }
}

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

export async function UpdateApp(
  app_id: Apps["app_id"],
  newTitle: Apps["title"]
) {
  const supabase = await createSupabaseServerClient()

  if (newTitle === null) {
    return { updatedApp: null, error: "Title is null" }
  }

  // Check if title already exists with exactly matching case-sensitive comparison
  const { data: existingApp, error: existingAppError } = await supabase
    .from("apps")
    .select("title")
    .eq("title", newTitle)

  if (existingAppError) {
    return { newApp: null, error: existingAppError }
  }

  if (existingApp && existingApp.length > 0) {
    return {
      newApp: null,
      error: "No need to change the title. Please try again.",
    }
  }

  const { data: updatedApp, error } = await supabase
    .from("apps")
    .update({ title: newTitle })
    .eq("app_id", app_id)
    .select()

  if (updatedApp) revalidatePath(`/user/apps/${app_id}`)

  // TODO: REMOVE THIE BEFORE PRODUCTION
  if (error) {
    console.log("🚀 ~ Error: Submiting App ~ error:", error)
  }

  return { updatedApp, error }
}
