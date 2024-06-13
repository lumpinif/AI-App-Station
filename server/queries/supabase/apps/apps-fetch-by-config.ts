"use server"

import createSupabaseServerClient from "@/utils/supabase/server-client"

import {
  AppDetails,
  AppRefrencedFields,
  AppRefrencedTables,
  AppWithCategoriesAndDevelopers,
  TableColumns,
} from "@/types/db_tables"
import { AppFetchConfig } from "@/types/fetch-configs/app-fetch-config"
import { Tables } from "@/types/supabase"

// stay here
export type AppDetailsSelectFields =
  | keyof (AppWithCategoriesAndDevelopers & AppRefrencedFields)
  | AppRefrencedTables

// stay here
// TODO: CHECK THIS TYPE
type getAppsByConfigProps<T extends AppRefrencedTables> = {
  config: AppFetchConfig
  byField?: {
    table: T
    column: keyof TableColumns<T> & string
    value: NonNullable<Tables<T>[keyof TableColumns<T>]>
  }
}

export async function getAppsByConfig<T extends AppRefrencedTables>({
  config,
  byField,
}: getAppsByConfigProps<T>) {
  const { filters, innerJoinTables, order, orFilters, limit } = config
  // const { limit, options: limitOptions } = config.limit

  const supabase = await createSupabaseServerClient()

  // TODO: CONSIDER REFACTOR THIS, SEPERATE THE BASE FROM THE JOINS AND REFERENCED TABLES
  const baseFields: AppDetailsSelectFields[] = [
    "categories",
    "profiles",
    "developers",
    "app_likes",
    "app_bookmarks",
  ]

  let innerT: T
  if (byField?.table) {
    innerT = byField.table
  }

  // '*, categories(*), profiles(*), developers(*), app_likes(*), app_bookmarks(*)'
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
    .from("apps")
    .select(selectFields, { count: "exact" })
    .eq("app_publish_status", "published")

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

  const { data: apps, error: getAppsByConfigError } =
    await query.returns<AppDetails[]>()

  if (getAppsByConfigError) {
    console.error("Error fetching apps by config", getAppsByConfigError.message)
    return { getAppsByConfigError: getAppsByConfigError.message }
  }

  return { apps }
}
