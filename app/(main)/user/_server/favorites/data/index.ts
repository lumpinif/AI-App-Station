"use server"

import { unstable_noStore as noStore, revalidatePath } from "next/cache"
import createSupabaseServerClient from "@/utils/supabase/server-client"
import { PostgrestError } from "@supabase/supabase-js"

import { AppDetails, Apps, Profiles } from "@/types/db_tables"

interface AppErrorDetails {
  message: string
  details: any
}

interface AppError {
  app_id: string
  error: AppErrorDetails | PostgrestError
}

export async function getAppsByAppId(app_id: Apps["app_id"]) {
  noStore()
  const supabase = await createSupabaseServerClient()

  try {
    const { data: apps, error: getAppsError } = await supabase
      .from("apps")
      .select(
        "*,categories(*),profiles(*),developers(*),app_likes(*),app_bookmarks(*)"
      )
      .match({ app_id })
      .returns<AppDetails[]>()

    if (getAppsError) {
      console.error("Error getting apps:", getAppsError)
      return {
        error: {
          message: "An error occurred while getting apps.",
          details: getAppsError,
        },
      }
    }

    return { apps, error: getAppsError }
  } catch (error) {
    console.error("Error in getting apps:", error)
    return {
      error: {
        message: "An unexpected error occurred.",
        details: "Please try again later.",
      },
    }
  }
}

export async function getFavoriteApps(
  user_id: Profiles["user_id"],
  collectionType?: "favorite" | "bookmark"
) {
  noStore()
  const supabase = await createSupabaseServerClient()
  const collection =
    collectionType === "bookmark" ? "app_bookmarks" : "app_likes"

  try {
    const { data: favoriteAppIds, error: getFavoriteAppIdsError } =
      await supabase
        .from(collection)
        .select("app_id")
        .match({ user_id })
        .order("created_at", { ascending: false })

    if (getFavoriteAppIdsError) {
      console.error("Error getting favorite app ids:", getFavoriteAppIdsError)
      return {
        error: `An error occurred while getting favorite app ids: ${getFavoriteAppIdsError.message}`,
      }
    }

    if (!favoriteAppIds || favoriteAppIds.length === 0) {
      return { favoriteApps: [], error: null }
    }

    // Initialize an array to store errors
    const errors: string[] = []

    // Fetch app details for each favorite app ID
    const favoriteApps = await Promise.all(
      favoriteAppIds.map(async (favoriteAppId, index) => {
        const { apps, error: getAppsError } = await getAppsByAppId(
          favoriteAppId.app_id
        )
        if (getAppsError) {
          console.error(`Error getting app with app ID:`, getAppsError)
          errors.push(`Error-${index}: ${getAppsError.message}`)
          return null
        }
        return apps[0] // Assuming `getAppsByAppId` returns an array with one item
      })
    )

    // Filter out any null results due to errors in fetching individual apps
    const validFavoriteApps = favoriteApps.filter((app) => app !== null)
    return {
      favoriteApps: validFavoriteApps,
      error: errors.length > 0 ? errors.join(" --- ") : null,
    }
  } catch (error) {
    console.error("Error in getting favorite apps:", error)
    return {
      favoriteApps: [],
      error: `An unexpected error occurred: ${error}`,
    }
  }
}
