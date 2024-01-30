"use server"

import createSupabaseServerClient from "@/utils/supabase/server-client"

import { Database } from "@/types/supabase"

type title = Database["public"]["Tables"]["app"]["Row"]["title"]

export async function SubmitApp(title: title) {
  const supabase = await createSupabaseServerClient()

  if (title === null) {
    // console.log("Title is null")
    return { newApp: null, error: "Title is null" }
  }

  // Check if title already exists
  const { data: existingApp, error: existingAppError } = await supabase
    .from("app")
    .select("title")
    .ilike("title", title)

  if (existingAppError) {
    // console.log("🚀 ~ SubmitApp ~ existingAppError:", existingAppError)
    return { newApp: null, error: existingAppError }
  }

  if (existingApp && existingApp.length > 0) {
    // NO NEED FOR THIS, AS WE ARE USING .ilike("title", title) NOT .ilike("title", `%${title}%`)
    // Perform an exact case-insensitive comparison of the titles
    // const titleExists = existingApp.some(
    //   (app) => app.title?.toLowerCase() === title.toLowerCase()
    // )
    // if (titleExists){}
    // console.log("🚀 ~ Error: Submiting App ~ error: The App already exists")
    return { newApp: null, error: "The App already exists. Please try again." }
  }

  const { data: newApp, error } = await supabase
    .from("app")
    .insert([{ title: title }])
    .select()

  // TODO: REMOVE THIE BEFORE PRODUCTION

  if (error) {
    console.log("🚀 ~ Error: Submiting App ~ error:", error)
  }

  if (newApp) {
    console.log("🚀 ~ New App Submited ~ newApp:", newApp)
  }

  return { newApp, error }
}
