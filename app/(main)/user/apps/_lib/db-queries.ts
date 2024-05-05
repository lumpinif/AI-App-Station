"use server"

// TODO: MOVE THIS INTO ALL DB_QUERIES FILE SECTIONS
import { unstable_noStore as noStore, revalidatePath } from "next/cache"
import { getSlugFromAppId } from "@/server/data/supabase-actions"
import createSupabaseServerClient from "@/utils/supabase/server-client"
import { Row } from "@tanstack/react-table"
import * as z from "zod"

import { App } from "@/types/db_tables"

import { searchParamsSchema } from "./validations"

export async function getSubmittedApps(
  searchParams: z.infer<typeof searchParamsSchema>
) {
  noStore()
  const {
    page,
    per_page,
    sort,
    app_title,
    app_publish_status,
    operator,
    from,
    to,
  } = searchParams

  const supabase = await createSupabaseServerClient()

  try {
    // Offset to paginate the results
    const offset = (page - 1) * per_page
    // Column and order to sort by
    // Spliting the sort string by "." to get the column and order
    // Example: "title.desc" => ["title", "desc"]
    const [column, order] = (sort?.split(".").filter(Boolean) ?? [
      "created_at",
      "desc",
    ]) as [keyof App, "asc" | "desc"]

    // Convert the date strings to Date objects
    const fromDate = from ? new Date(from) : undefined
    const toDate = to ? new Date(to) : undefined

    // Build the filter query based on the search parameters
    const query = supabase
      .from("apps")
      .select("*", { count: "exact" })
      .order(column, { ascending: order === "asc" })

    // Apply filters based on the search parameters
    if (!operator || operator === "and") {
      if (app_title) query.ilike("app_title", `%${app_title}%`)
      if (app_publish_status) query.eq("app_publish_status", app_publish_status)
      if (fromDate && toDate) {
        query.gte("created_at", fromDate.toISOString())
        query.lte("created_at", toDate.toISOString())
      }
    } else if (operator === "or") {
      const orFilters: string[] = []
      if (app_title && app_publish_status) {
        orFilters.push(
          `and(app_title.ilike.%${app_title}%,app_publish_status.eq.${app_publish_status})`
        )
      } else if (app_title) {
        orFilters.push(`app_title.ilike.%${app_title}%`)
      } else if (app_publish_status) {
        orFilters.push(`app_publish_status.eq.${app_publish_status}`)
      }
      if (fromDate && toDate) {
        orFilters.push(
          `created_at.gte.${fromDate.toISOString()},created_at.lte.${toDate.toISOString()}`
        )
      }
      if (orFilters.length > 0) {
        query.or(orFilters.join(","))
      }
    }

    // Apply pagination using the range method
    query.range(offset, offset + per_page - 1)

    // Execute the query and get the results
    const { data: apps, error, count } = await query

    if (error) {
      throw new Error(`Failed to fetch submitted apps: ${error.message}`)
    }

    // Calculate the total page count
    const totalCount = count ? count : 0
    const pageCount = Math.ceil(totalCount / per_page)

    return { apps: apps ?? [], pageCount }
  } catch (error) {
    console.error("Error fetching submitted apps:", error)
    return { apps: [], pageCount: 0 }
  }
}

export async function deleteApp(app_id: App["app_id"]) {
  try {
    const supabase = await createSupabaseServerClient()
    const slug = await getSlugFromAppId(app_id)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user?.id) return { error: "User not found" }

    const { error } = await supabase.from("apps").delete().match({
      app_id,
      submitted_by_user_id: user.id,
    })

    revalidatePath(`/ai-apps/${slug?.app_slug}`)
    revalidatePath(`/user/apps/${app_id}`)

    return { error: error ?? null } // Return { error: null } if no error occurs
  } catch (error) {
    if (error) {
      console.log(error)
    }
    return { error: "An error occurred while deleting the app." } // Return a generic error message
  }
}
export async function unpublishApp(app_id: App["app_id"]) {
  try {
    const supabase = await createSupabaseServerClient()
    const slug = await getSlugFromAppId(app_id)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user?.id) return { error: "User not found" }

    const { error } = await supabase
      .from("apps")
      .update({ app_publish_status: "unpublished" })
      .match({
        app_id,
        submitted_by_user_id: user.id,
      })

    revalidatePath(`/ai-apps/${slug?.app_slug}`)
    revalidatePath(`/user/apps/${app_id}`)

    return { error: error ?? null } // Return { error: null } if no error occurs
  } catch (error) {
    if (error) {
      console.log(error)
    }
    return { error: "An error occurred while unpublishing the app." } // Return a generic error message
  }
}

export async function publishApp(app_id: App["app_id"]) {
  try {
    const supabase = await createSupabaseServerClient()
    const slug = await getSlugFromAppId(app_id)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user?.id) return { error: "User not found" }

    const { error } = await supabase
      .from("apps")
      .update({ app_publish_status: "published" })
      .match({
        app_id,
        submitted_by_user_id: user.id,
      })

    revalidatePath(`/ai-apps/${slug?.app_slug}`)
    revalidatePath(`/user/apps/${app_id}`)

    return { error: error ?? null } // Return { error: null } if no error occurs
  } catch (error) {
    if (error) {
      console.log(error)
    }
    return { error: "An error occurred while publishing the app." } // Return a generic error message
  }
}
