"use server"

import { revalidatePath, unstable_noStore } from "next/cache"
import createSupabaseServerClient from "@/utils/supabase/server-client"

import { Developers } from "@/types/db_tables"
import { capitalizeFirstLetter, nameToSlug, normalizeString } from "@/lib/utils"

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
