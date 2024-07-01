"use server"

import createSupabaseServerClient from "@/utils/supabase/server-client"

import { Categories } from "@/types/db_tables"
import { getErrorMessage } from "@/lib/handle-error"
import { capitalizeFirstLetter, nameToSlug } from "@/lib/utils"

export async function getAllCategories() {
  const supabase = await createSupabaseServerClient()

  let { data: categories, error } = await supabase
    .from("categories")
    .select("*")

  // error handling
  if (error) return { error: getErrorMessage(error) }

  return { categories, error }
}

export async function getCategoryBySlug(
  category_slug: Categories["category_slug"]
) {
  const supabase = await createSupabaseServerClient()

  let { data: category, error } = await supabase
    .from("categories")
    .select("*")
    .eq("category_slug", category_slug)
    .maybeSingle()

  // error handling
  if (error) return { error: getErrorMessage(error) }

  return { category, error }
}

export async function insertCategories(
  categories: { label: string; value: string }[]
) {
  const supabase = await createSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user?.id) {
    throw new Error("User not found")
  }

  const { data, error } = await supabase
    .from("categories")
    .insert(
      categories.map((category) => ({
        category_name: capitalizeFirstLetter(category.label),
        category_slug: nameToSlug(category.value),
        submitted_by_user_id: user.id,
      }))
    )
    .select("category_id, category_name")

  if (error) {
    console.error("Error inserting categories:", error)
    throw error
  }

  return data
}

export async function checkExistingCategories(
  categories: { label: string; value: string }[]
) {
  const supabase = await createSupabaseServerClient()

  const { data, error } = await supabase
    .from("categories")
    .select("category_id, category_slug")
    .in(
      "category_slug",
      categories.map((d) => d.value)
    )

  if (error) {
    console.error("Error fetching existing categories:", error)
    throw error
  }

  return data
}
