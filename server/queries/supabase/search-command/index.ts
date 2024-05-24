import { unstable_noStore as noStore } from "next/cache"
import createSupabaseServerClient from "@/utils/supabase/server-client"

import { Database } from "@/types/supabase"

type Table = keyof Database["public"]["Tables"]

type SearchCommandProps<T extends Table> = {
  searchTable: T
  searchTerm: string
  searchColumn: keyof Database["public"]["Tables"][T]["Row"]
  matchType?: "and" | "or"
  orderBy?: keyof Database["public"]["Tables"][T]["Row"]
  ascending?: boolean
}

export async function searchCommand<T extends Table>({
  searchTable,
  searchTerm,
  searchColumn,
  matchType = "or",
  orderBy,
  ascending = false,
}: SearchCommandProps<T>) {
  noStore()
  const supabase = await createSupabaseServerClient()

  // Prepare the search term based on the matchType
  const searchQuery =
    matchType === "and"
      ? searchTerm.split(" ").join(" & ")
      : searchTerm.split(" ").join(" | ")

  // Form the query
  let query = supabase
    .from(searchTable)
    .select("*")
    .textSearch(searchColumn as string, searchQuery)
    .match({ app_publish_status: "published" })

  // Apply ordering if specified
  if (orderBy) {
    query = query.order(orderBy as string, { ascending })
  }

  // Execute the query and handle the response
  const { data: apps, error } = await query

  // Error handling
  if (error) {
    return { apps: null, error: error.message }
  }

  return { apps, error: null }
}
