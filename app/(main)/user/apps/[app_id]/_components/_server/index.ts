"use server"

import { revalidatePath } from "next/cache"
import createSupabaseServerClient from "@/utils/supabase/server-client"

import { Apps } from "@/types/db_tables"

// Handle Introduction
export async function insertIntroduction(
  app_id: Apps["app_id"],
  introduction: Record<string, any>,
  app_slug?: Apps["app_slug"]
) {
  const supabase = await createSupabaseServerClient()

  if (!app_id || !introduction) {
    return { error: null }
  }

  try {
    const { error } = await supabase
      .from("apps")
      .update({ introduction: introduction })
      .match({ app_id })

    if (error) {
      console.error("Error inserting introduction:", error)
      return { error: error }
    }

    revalidatePath(`/ai-apps/${app_slug}`)
    revalidatePath(`/user/apps/${app_id}`)

    return { error }
  } catch (error) {
    if (error) {
      console.log(error)
    }
  }
}

export async function removeEmptyIntroduction(
  app_id: Apps["app_id"],
  app_slug: Apps["app_slug"]
) {
  const supabase = await createSupabaseServerClient()

  if (!app_id && !app_slug) {
    return { error: null }
  }

  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return { error: userError || new Error("User not found") }
    }

    const { error: updateError } = await supabase
      .from("apps")
      .update({ introduction: null })
      .match({ app_id: app_id, submitted_by_user_id: user.id })

    if (updateError) {
      console.error("Error deleting introduction:", updateError)
      return { error: updateError }
    }

    revalidatePath(`/ai-apps/${app_slug}`)
    revalidatePath(`/user/apps/${app_id}`)

    return { error: updateError }
  } catch (error) {
    console.error("Error in removeEmptyIntroduction:", error)
    return { error: error as Error }
  }
}
