"use server"

import { revalidatePath } from "next/cache"
import createSupabaseServerClient from "@/utils/supabase/server-client"

import { Apps, Developers } from "@/types/db_tables"
import { getErrorMessage } from "@/lib/handle-error"
import { capitalizeFirstLetter, nameToSlug } from "@/lib/utils"

export async function getDeveloper(
  developer_slug: Developers["developer_slug"]
) {
  const supabase = await createSupabaseServerClient()

  const { data: developer, error: getDeveloperError } = await supabase
    .from("developers")
    .select("*")
    .eq("developer_slug", developer_slug)
    .maybeSingle()

  if (getDeveloperError) {
    console.error("Error fetching developer", getDeveloperError)
  }

  return { developer, getDeveloperError }
}

export async function getAllDevelopers() {
  const supabase = await createSupabaseServerClient()

  let { data: developers, error } = await supabase
    .from("developers")
    .select("developer_name, developer_id,developer_slug")

  // error handling
  if (error) return { error: getErrorMessage(error) }

  return { developers, error }
}

export async function insertDevelopers(
  developers: { label: string; value: string }[]
) {
  const supabase = await createSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user?.id) {
    throw new Error("User not found")
  }

  const { data, error } = await supabase
    .from("developers")
    .insert(
      developers.map((developer) => ({
        developer_name: capitalizeFirstLetter(developer.label),
        developer_slug: nameToSlug(developer.value),
        submitted_by_user_id: user.id,
      }))
    )
    .select("developer_id, developer_name")

  if (error) {
    console.error("Error inserting developers:", error)
    throw error
  }

  return data
}

export async function checkExistingDevelopers(
  developers: { label: string; value: string }[]
) {
  const supabase = await createSupabaseServerClient()

  const { data, error } = await supabase
    .from("developers")
    .select("developer_id, developer_slug")
    .in(
      "developer_slug",
      developers.map((d) => d.value)
    )

  if (error) {
    console.error("Error fetching existing developers:", error)
    throw error
  }

  return data
}

export async function UpdateDevByUrlEmail(
  app_id: Apps["app_id"],
  developer_id: Developers["developer_id"],
  developer_url: Developers["developer_url"],
  developer_email: Developers["developer_email"]
) {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { updatedDev: null, error: "Unauthorized!" }
  }

  const { data: updatedDev, error } = await supabase
    .from("developers")
    .update({
      developer_url: developer_url,
      developer_email: developer_email || null,
    })
    .eq("developer_id", developer_id)
    .select()

  if (updatedDev) revalidatePath(`/user/apps/${app_id}`)

  if (error) return { updatedDev: null, error: getErrorMessage(error) }

  return { updatedDev, error }
}
