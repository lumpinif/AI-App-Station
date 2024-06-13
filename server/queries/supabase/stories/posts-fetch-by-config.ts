/* Comprehensive fetch */

"use server"

import createSupabaseServerClient from "@/utils/supabase/server-client"

import {
  PostDetails,
  PostRefrencedFields,
  PostRefrencedTables,
  PostWithTopicsAndCategories,
  TableColumns,
} from "@/types/db_tables"
import { PostFetchConfig } from "@/types/fetch-configs/types-post-fetch-config"
import { Tables } from "@/types/supabase"

// stay here
export type PostDetailsSelectFields =
  | keyof (PostWithTopicsAndCategories & PostRefrencedFields)
  | PostRefrencedTables

// stay here
// TODO: CHECK THIS TYPE
type getPostsByConfigProps<T extends PostRefrencedTables> = {
  config: PostFetchConfig
  byField?: {
    table: T
    column: keyof TableColumns<T> & string
    value: NonNullable<Tables<T>[keyof TableColumns<T>]>
  }
}

export async function getPostsByConfig<T extends PostRefrencedTables>({
  config,
  byField,
}: getPostsByConfigProps<T>) {
  const { filters, innerJoinTables, order, orFilters, limit } = config
  // const { limit, options: limitOptions } = config.limit

  const supabase = await createSupabaseServerClient()

  // TODO: CONSIDER REFACTOR THIS, SEPERATE THE BASE FROM THE JOINS AND REFERENCED TABLES
  const baseFields: PostDetailsSelectFields[] = [
    "topics",
    "profiles",
    "categories",
    "post_likes",
    "post_bookmarks",
  ]

  let innerT: T
  if (byField?.table) {
    innerT = byField.table
  }

  // '*, categories(*), profiles(*), topics(*), post_likes(*), post_bookmarks(*)'
  const selectFields = ["*"]
    .concat(
      baseFields.map((field) =>
        innerJoinTables?.includes(field) || field === innerT
          ? `${field}!inner(*)`
          : `${field}(*)`
      )
    )
    .join(", ")

  let query = supabase
    .from("posts")
    .select(selectFields, { count: "exact" })
    .eq("post_publish_status", "published")

  // get referenced tables
  // byField such as .eq(categories.category_slug, category_slug)
  if (byField && byField.table && byField.column && byField.value) {
    // .eq("categories.category_slug", "llm")
    query.eq(
      `${byField.table as string}.${byField.column as string}`,
      byField.value
    )
  }

  // Order

  order.forEach((orderOptions) => {
    query.order(orderOptions.column, orderOptions.options)
  })

  // Filters
  filters?.forEach((filter) => {
    query.filter(filter.column, filter.operator, filter.value)
  })

  // Or Filters
  orFilters?.forEach((orFilter) => {
    query.or(orFilter.filters, orFilter.options)
  })

  // Limit
  if (limit) {
    query.limit(limit.limit, limit.options)
  }

  const { data: posts, error: getPostsByConfigError } =
    await query.returns<PostDetails[]>()

  if (getPostsByConfigError) {
    console.error(
      "Error fetching posts by config",
      getPostsByConfigError.message
    )
    return { getPostsByConfigError: getPostsByConfigError.message }
  }

  return { posts }
}
