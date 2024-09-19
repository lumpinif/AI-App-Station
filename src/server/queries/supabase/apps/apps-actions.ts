"use server"

import { unstable_noStore } from "next/cache"
import createSupabaseServerClient from "@/utils/supabase/server-client"

import { AppDetails, Apps } from "@/types/db_tables"
import { getErrorMessage } from "@/lib/handle-error"
import { nameToSlug, normalizeString } from "@/lib/utils"

export async function SubmitApp(title: Apps["app_title"]) {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return {
      newApp: null,
      error: new Error("You need to login to continue."),
    }
  }

  if (title === null) {
    return { newApp: null, error: new Error("Title is required.") }
  }

  // Check if title already exists
  const { data: existingApp, error: existingAppError } = await supabase
    .from("apps")
    .select("app_title")
    .ilike("app_title", normalizeString(title))

  if (existingAppError) {
    return { newApp: null, error: existingAppError }
  }

  if (existingApp && existingApp.length > 0) {
    return {
      newApp: null,
      error: new Error("The App already exists. Please try again."),
    }
  }

  const { data: newApp, error } = await supabase
    .from("apps")
    .insert([
      {
        app_title: title,
        app_slug: nameToSlug(title),
        submitted_by_user_id: user.id,
      },
    ])
    .select("*")
    .single()

  return { newApp, error }
}

export async function getAppByAppIdUserId(
  app_id: Apps["app_id"],
  user_id: Apps["submitted_by_user_id"]
) {
  const supabase = await createSupabaseServerClient()

  if (!user_id) {
    return { app: null, error: "Unauthorized!" }
  }

  let { data: app, error } = await supabase
    .from("apps")
    .select(
      "*,categories(*),profiles(*),developers(*),app_likes(*),app_bookmarks(*)"
    )
    .match({ app_id: app_id, submitted_by_user_id: user_id })
    .limit(1)
    .returns<AppDetails[]>()
  // .eq("app_id", app_id)
  // .eq("submitted_by_user_id", user_id)
  // .single()

  if (!app || app.length === 0) {
    // console.log("App not found for app_slug:", app_slug)
    return { app: null, error: "App not found" }
  }

  // error handling
  if (error) return { app: null, error: getErrorMessage(error) }

  return { app: app[0], error }
}

export async function getAppBySlug(app_slug: string) {
  const supabase = await createSupabaseServerClient()

  let { data: app, error } = await supabase
    .from("apps")
    .select(
      `*,categories(*),profiles(*,profile_role(*)),developers(*),app_likes(*),app_bookmarks(*)`
    )
    .match({ app_slug: app_slug, app_publish_status: "published" })
    // .order("created_at", { ascending: false })
    .limit(1)
    .returns<AppDetails[]>()

  // .single<AppDetails>()

  // error handling
  if (error) return { app: null, error: getErrorMessage(error) }

  if (!app || app.length === 0) {
    // console.log("App not found for app_slug:", app_slug)
    return { app: null, error: "App not found" }
  }

  const app_id = app[0].app_id

  // getting app icon url
  // const appIconFileName = await getAppIconFileName(
  //   app_slug,
  //   app[0].submitted_by_user_id
  // )
  // const appIconUrl = await getAppIconUrl(
  //   app_slug,
  //   app[0].submitted_by_user_id,
  //   appIconFileName as string
  // )

  let { data: ratingData, error: ratingError } = await supabase.rpc(
    "get_app_rating_data",
    { app_id_param: app_id }
  )

  if (ratingError) return { error: getErrorMessage(ratingError) }

  if (!ratingData || ratingData.length === 0)
    return { ratingData: null, error: "Rating data not found" }

  return { app: app[0], ratingData: ratingData[0], error }
}

export async function getAllApps(orderBy?: keyof Apps) {
  unstable_noStore()
  const supabase = await createSupabaseServerClient()

  let query = supabase
    .from("apps")
    .select(
      `*,categories(*),profiles(*),developers(*),app_likes(*),app_bookmarks(*)`
    )
    .match({
      app_publish_status: "published",
    })
    .returns<AppDetails[]>()

  if (orderBy) {
    query = query.order(orderBy, { ascending: false })
  }

  let { data: apps, error } = await query

  // error handling
  if (error) return { apps: null, error: getErrorMessage(error) }

  return { apps, error }
}

export async function getAppsWithOrderBy(orderBy?: keyof Apps) {
  const supabase = await createSupabaseServerClient()

  let query = supabase
    .from("apps")
    .select(
      "*,categories(*),profiles(*),developers(*),app_likes(*),app_bookmarks(*)"
    )
    .match({
      app_publish_status: "published",
    })

  if (orderBy) {
    query = query.order(orderBy, { ascending: false })
  }

  let { data: apps, error } = await query.returns<AppDetails[]>()

  // error handling
  if (error) return { apps: null, error: getErrorMessage(error) }

  return { apps, error }
}
