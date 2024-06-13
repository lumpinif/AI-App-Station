"use server"

import { unstable_noStore as noStore } from "next/cache"
import createSupabaseServerClient from "@/utils/supabase/server-client"
import { PostgrestError } from "@supabase/supabase-js"

import {
  AppDetails,
  Apps,
  PostDetails,
  Posts,
  Profiles,
} from "@/types/db_tables"

interface AppErrorDetails {
  message: string
  details: any
}

interface AppError {
  app_id: string
  error: AppErrorDetails | PostgrestError
}

// APPS
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

// POSTS
export async function getPostsByPostId(post_id: Posts["post_id"]) {
  noStore()
  const supabase = await createSupabaseServerClient()

  try {
    const { data: posts, error: getPostsError } = await supabase
      .from("posts")
      .select(
        `*, categories(*), topics(*), profiles(*), post_likes(*), post_bookmarks(*)`
      )
      .match({ post_id })
      .returns<PostDetails[]>()

    if (getPostsError) {
      console.error("Error getting posts:", getPostsError)
      return {
        error: {
          message: "An error occurred while getting posts.",
          details: getPostsError,
        },
      }
    }

    return { posts, error: getPostsError }
  } catch (error) {
    console.error("Error in getting posts:", error)
    return {
      error: {
        message: "An unexpected error occurred.",
        details: "Please try again later.",
      },
    }
  }
}

export async function getFavoritePosts(
  user_id: Profiles["user_id"],
  collectionType?: "favorite" | "bookmark"
) {
  noStore()
  const supabase = await createSupabaseServerClient()
  const collection =
    collectionType === "bookmark" ? "post_bookmarks" : "post_likes"

  // TODO: CONSIDER FETCH ALL FAVORITES POSTS IN ONE QUERY
  try {
    const { data: favoritePostIds, error: getFavoritePostIdsError } =
      await supabase
        .from(collection)
        .select("post_id")
        .match({ user_id })
        .order("created_at", { ascending: false })

    if (getFavoritePostIdsError) {
      console.error("Error getting favorite post ids:", getFavoritePostIdsError)
      return {
        error: `An error occurred while getting favorite post ids: ${getFavoritePostIdsError.message}`,
      }
    }

    if (!favoritePostIds || favoritePostIds.length === 0) {
      return { favoritePosts: [], error: null }
    }

    // Initialize an array to store errors
    const errors: string[] = []

    // Fetch post details for each favorite post ID
    const favoritePosts = await Promise.all(
      favoritePostIds.map(async (favoritePostId, index) => {
        const { posts, error: getPostsError } = await getPostsByPostId(
          favoritePostId.post_id
        )
        if (getPostsError) {
          console.error(`Error getting post with post ID:`, getPostsError)
          errors.push(`Error-${index}: ${getPostsError.message}`)
          return null
        }
        return posts[0] // Assuming `getPostsByPostId` returns an array with one item
      })
    )

    // Filter out any null results due to errors in fetching individual posts
    const validFavoritePosts = favoritePosts.filter((post) => post !== null)
    return {
      favoritePosts: validFavoritePosts,
      error: errors.length > 0 ? errors.join(" --- ") : null,
    }
  } catch (error) {
    console.error("Error in getting favorite posts:", error)
    return {
      favoritePosts: [],
      error: `An unexpected error occurred: ${error}`,
    }
  }
}
