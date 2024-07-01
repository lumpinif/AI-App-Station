"use server"

import { revalidatePath } from "next/cache"
import createSupabaseServerClient from "@/utils/supabase/server-client"

import { Apps, Categories, Developers } from "@/types/db_tables"
import { getErrorMessage } from "@/lib/handle-error"
import { nameToSlug } from "@/lib/utils"

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

export async function UpdateAppByTitle(
  app_id: Apps["app_id"],
  newTitle: Apps["app_title"]
) {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { updatedApp: null, error: "Unauthorized!" }
  }
  if (!newTitle) {
    return { updatedApp: null, error: "Title is required." }
  }

  // Check if title already exists with exactly matching case-sensitive comparison
  const { data: existingApp, error: existingAppError } = await supabase
    .from("apps")
    .select("app_title")
    .eq("app_title", newTitle)

  if (existingAppError) {
    return { updatedApp: null, error: existingAppError }
  }

  if (existingApp && existingApp.length > 0) {
    return {
      updatedApp: null,
      error: "There exists an app with this name. Please try again.",
    }
  }

  const { data: updatedApp, error } = await supabase
    .from("apps")
    .update({ app_title: newTitle, app_slug: nameToSlug(newTitle) })
    .eq("app_id", app_id)
    .select()

  if (updatedApp) revalidatePath(`/user/apps/${app_id}`)

  if (error) return { updatedApp: null, error: getErrorMessage(error) }

  return { updatedApp, error }
}

export async function UpdateAppByDescription(
  app_id: Apps["app_id"],
  description: Apps["description"]
) {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { updatedApp: null, error: "Unauthorized!" }
  }
  if (!description) {
    return { updatedApp: null, error: "Description is required." }
  }

  const { data: updatedApp, error } = await supabase
    .from("apps")
    .update({ description: description })
    .eq("app_id", app_id)
    .select()

  if (updatedApp) revalidatePath(`/user/apps/${app_id}`)

  if (error) return { updatedApp: null, error: getErrorMessage(error) }

  return { updatedApp, error }
}

export async function UpdateAppByUrl(
  app_id: Apps["app_id"],
  app_url: Apps["app_url"]
) {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { updatedApp: null, error: "Unauthorized!" }
  }
  if (!app_url) {
    return { updatedApp: null, error: "App url is required." }
  }

  const { data: updatedApp, error } = await supabase
    .from("apps")
    .update({ app_url: app_url })
    .eq("app_id", app_id)
    .select()

  if (updatedApp) revalidatePath(`/user/apps/${app_id}`)

  if (error) return { updatedApp: null, error: getErrorMessage(error) }

  return { updatedApp, error }
}

export async function UpdateAppByPricing(
  app_id: Apps["app_id"],
  pricing: Apps["pricing"]
) {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { updatedApp: null, error: "Unauthorized!" }
  }

  const { data: updatedApp, error } = await supabase
    .from("apps")
    .update({ pricing: pricing })
    .eq("app_id", app_id)
    .select()

  if (updatedApp) revalidatePath(`/user/apps/${app_id}`)

  if (error) return { updatedApp: null, error: getErrorMessage(error) }

  return { updatedApp, error }
}

export async function UpdateAppByCopyRight(
  app_id: Apps["app_id"],
  copy_right: Apps["copy_right"]
) {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { updatedApp: null, error: "Unauthorized!" }
  }

  const { data: updatedApp, error } = await supabase
    .from("apps")
    .update({ copy_right: copy_right })
    .eq("app_id", app_id)
    .select()

  if (updatedApp) revalidatePath(`/user/apps/${app_id}`)

  if (error) return { updatedApp: null, error: getErrorMessage(error) }

  return { updatedApp, error }
}

export async function insertAppsDevelopers(
  app_id: Apps["app_id"],
  developer_ids: Developers["developer_id"][]
) {
  try {
    const supabase = await createSupabaseServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user?.id) {
      throw new Error("User session not found")
    }

    // Check if the app_id is associated with the current user_id
    const { count, error: countError } = await supabase
      .from("apps")
      .select("*", { count: "exact", head: true })
      .eq("app_id", app_id)
      .eq("submitted_by_user_id", user.id)

    if (countError) {
      console.error(
        "Error checking app_id and user_id association:",
        countError
      )
      throw new Error("Failed to check app_id and user_id association")
    }

    if (count === 0) {
      throw new Error(
        "Unauthorized: app_id is not associated with the current user"
      )
    }

    const { data, error } = await supabase.from("apps_developers").insert(
      developer_ids.map((developer_id) => ({
        app_id: app_id,
        developer_id: developer_id,
        submitted_by_user_id: user.id,
      }))
    )

    revalidatePath(`/user/apps/${app_id}`)

    if (error) {
      console.error("Error inserting app-developer associations:", error)
      throw new Error("Failed to insert app-developer associations")
    }

    return data
  } catch (error) {
    console.error("Error in insertAppsDevelopers:", error)
    throw new Error(
      "An error occurred while inserting app-developer associations"
    )
  }
}

export async function insertAppsCategories(
  app_id: Apps["app_id"],
  category_ids: Categories["category_id"][]
) {
  try {
    const supabase = await createSupabaseServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user?.id) {
      throw new Error("User not found")
    }

    // Check if the app_id is associated with the current user_id
    const { count, error: countError } = await supabase
      .from("apps")
      .select("*", { count: "exact", head: true })
      .eq("app_id", app_id)
      .eq("submitted_by_user_id", user.id)

    if (countError) {
      console.error(
        "Error checking app_id and user_id association:",
        countError
      )
      throw new Error("Failed to check app_id and user_id association")
    }

    if (count === 0) {
      throw new Error(
        "Unauthorized: app_id is not associated with the current user"
      )
    }

    const { data, error } = await supabase.from("apps_categories").insert(
      category_ids.map((category_id) => ({
        app_id: app_id,
        category_id: category_id,
        submitted_by_user_id: user.id,
      }))
    )

    revalidatePath(`/user/apps/${app_id}`)

    if (error) {
      console.error("Error inserting app-categories associations:", error)
      throw new Error("Failed to insert app-categories associations")
    }

    return data
  } catch (error) {
    console.error("Error in insertAppsCategories:", error)
    throw new Error(
      "An error occurred while inserting app-categories associations"
    )
  }
}

export async function removeAppsDevelopers(
  app_id: Apps["app_id"],
  developer_ids: Developers["developer_id"][]
) {
  try {
    const supabase = await createSupabaseServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user?.id) {
      throw new Error("User session not found")
    }

    // Check if the app_id is associated with the current user_id
    const { count, error: countError } = await supabase
      .from("apps")
      .select("*", { count: "exact", head: true })
      .eq("app_id", app_id)
      .eq("submitted_by_user_id", user.id)

    if (countError) {
      console.error(
        "Error checking app_id and user_id association:",
        countError
      )
      throw new Error("Failed to check app_id and user_id association")
    }

    if (count === 0) {
      throw new Error(
        "Unauthorized: app_id is not associated with the current user"
      )
    }

    const { error } = await supabase
      .from("apps_developers")
      .delete()
      .match({ app_id: app_id })
      .in("developer_id", developer_ids)

    revalidatePath(`/user/apps/${app_id}`)

    if (error) {
      console.error("Error removing app-developer associations:", error)
      throw error
    }
  } catch (error) {
    console.error("Error in removeAppsDevelopers:", error)
    throw error
  }
}

export async function removeAppsCategories(
  app_id: Apps["app_id"],
  category_ids: Categories["category_id"][]
) {
  try {
    const supabase = await createSupabaseServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user?.id) {
      throw new Error("User not found")
    }

    // Check if the app_id is associated with the current user_id
    const { count, error: countError } = await supabase
      .from("apps")
      .select("*", { count: "exact", head: true })
      .eq("app_id", app_id)
      .eq("submitted_by_user_id", user.id)

    if (countError) {
      console.error(
        "Error checking app_id and user_id association:",
        countError
      )
      throw new Error("Failed to check app_id and user_id association")
    }

    if (count === 0) {
      throw new Error(
        "Unauthorized: app_id is not associated with the current user"
      )
    }

    const { error } = await supabase
      .from("apps_categories")
      .delete()
      .match({ app_id: app_id })
      .in("category_id", category_ids)

    revalidatePath(`/user/apps/${app_id}`)

    if (error) {
      console.error("Error removing app-developer associations:", error)
      throw error
    }
  } catch (error) {
    console.error("Error in removeAppsCategories:", error)
    throw error
  }
}

export async function deleteAppIcon(
  app_id: Apps["app_id"],
  app_slug: Apps["app_slug"],
  appIconFileName: string,
  app_submitted_by_user_id: Apps["submitted_by_user_id"]
) {
  const supabase = await createSupabaseServerClient()

  // Check if the app_submitted_by_user_id is associated with the current user_id
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user?.id || user.id !== app_submitted_by_user_id) {
    return
  }

  try {
    const bucketName = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_APP!
    const { data, error } = await supabase.storage
      .from(bucketName)
      .remove([
        `${app_slug}/${app_id}/${app_submitted_by_user_id}/icon/${appIconFileName}`,
      ])
    // TODO: ERROR HANDLING
    if (error) {
      console.log(error)
    }
    if (data?.length && data?.length > 0) {
      // remove the record from app_icon_src
      const { error } = await supabase
        .from("apps")
        .update({ app_icon_src: null })
        .eq("app_slug", app_slug)
        .eq("submitted_by_user_id", user?.id)

      // TODO: ERROR HANDLING
      if (error) {
        console.log(error)
      }
      return true
    } else {
      return false
    }
  } catch (error) {
    if (error) {
      console.log(error)
      return false
    }
    return false
  }
}

export async function deleteScreenshot(
  app_id: Apps["app_id"],
  app_slug: Apps["app_slug"],
  screenshotFileName: string,
  app_submitted_by_user_id: Apps["submitted_by_user_id"]
) {
  const supabase = await createSupabaseServerClient()

  // Check if the app_submitted_by_user_id is associated with the current user_id
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user?.id || user.id !== app_submitted_by_user_id) {
    return
  }

  try {
    const bucketName = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_APP!
    const { data, error } = await supabase.storage
      .from(bucketName)
      .remove([
        `${app_slug}/${app_id}/${app_submitted_by_user_id}/screenshots/${screenshotFileName}`,
      ])
    // TODO: ERROR HANDLING
    if (error) {
      console.log(error)
    }
    if (data?.length && data?.length > 0) {
      return true
    } else {
      return false
    }
  } catch (error) {
    if (error) {
      console.log(error)
      return false
    }
    return false
  }
}
