"use server"

import { unstable_noStore as noStore, revalidatePath } from "next/cache"
import createSupabaseServerClient from "@/utils/supabase/server-client"
import { Row } from "@tanstack/react-table"
import * as z from "zod"

import {
  App_bookmarks,
  App_likes,
  AppDetails,
  AppRefrencedFields,
  AppRefrencedTables,
  Apps,
  AppWithCategoriesAndDevelopers,
  Categories,
  Posts,
  PostWithProfile,
  Profiles,
  Table,
  TableColumns,
} from "@/types/db_tables"
import { Tables } from "@/types/supabase"
import { nameToSlug, normalizeString } from "@/lib/utils"
import { postsSearchParamsSchema } from "@/lib/validations"

/*
  // Filters
  .eq('column', 'Equal to')
  .gt('column', 'Greater than')
  .lt('column', 'Less than')
  .gte('column', 'Greater than or equal to')
  .lte('column', 'Less than or equal to')
  .like('column', '%CaseSensitive%')
  .ilike('column', '%CaseInsensitive%')
  .is('column', null)
  .in('column', ['Array', 'Values'])
  .neq('column', 'Not equal to')

  // Arrays
  .contains('array_column', ['array', 'contains'])
  .containedBy('array_column', ['contained', 'by'])
*/

// TODO: CONSIDER EXPLAINING ON THESE @params
type Supabase_Operators =
  | "eq"
  | "gt"
  | "lt"
  | "gte"
  | "lte"
  | "like"
  | "ilike"
  | "is"
  | "in"
  | "neq"
  | "contains"
  | "containedBy"

// TODO: CONSIDER TYPE SAFETY FOR column it can be for example "likes_count" or "apps.app_id"
type FilterType = {
  column: keyof Apps | string
  operator: Supabase_Operators
  value: any
}

type Filters = FilterType[]

type Order = {
  column: keyof Apps
  options: { referencedTable?: string; ascending: boolean }
}

// stay here
type AppDetailsSelectFields =
  | keyof (AppWithCategoriesAndDevelopers & AppRefrencedFields)
  | "*"
//

type Limit = {
  limit: number
  options?: { referencedTable?: string }
}

export type AppFetchConfig = {
  title: string
  order: Order
  limit: Limit
  filters: Filters
  innerJoinTables?: AppDetailsSelectFields[]
}

const appFetchConfig: AppFetchConfig[] = [
  {
    title: "Trending",
    order: {
      column: "likes_count",
      options: { ascending: false },
    },
    limit: {
      limit: 15,
    },
    filters: [],
    innerJoinTables: [],
  },
  {
    title: "Most Popular",
    order: {
      column: "views_count",
      options: { ascending: false },
    },
    limit: {
      limit: 15,
    },
    filters: [],
    innerJoinTables: [],
  },
  {
    title: "Newest Added",
    // column: "created_at",
    // order: "desc",
    order: {
      column: "created_at",
      options: { ascending: false },
    },

    limit: {
      limit: 15,
    },
    filters: [],
    innerJoinTables: [],
  },
  {
    title: "Most Liked",
    // column: "likes_count",
    // order: "desc",
    order: {
      column: "likes_count",
      options: { ascending: false },
    },
    limit: {
      limit: 15,
    },
    filters: [],
    innerJoinTables: [],
  },
  {
    title: "Top Free",
    order: {
      column: "likes_count",
      options: { ascending: false },
    },
    limit: {
      limit: 15,
    },
    filters: [{ operator: "eq", column: "pricing", value: "Free" }],
    innerJoinTables: [],
  },
  {
    title: "Top Paid",
    order: {
      column: "likes_count",
      options: { ascending: false },
    },
    limit: {
      limit: 15,
    },
    filters: [{ operator: "eq", column: "pricing", value: "%paid%" }],
    innerJoinTables: [],
  },
  // {
  //   title: "Top Rated",
  // TODO: IMPLEMENT THIS LATER WE NEED TO DEFINE A RATING COLUMN IN THE DB
  //   column: "",
  //   order: "desc",
  //   limit: 10,
  //   filters: [],
  // },
  // Add more configurations as needed
]

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
  const { filters, innerJoinTables } = config
  const { column, options: orderOptions } = config.order
  const { limit, options: limitOptions } = config.limit

  const supabase = await createSupabaseServerClient()

  // TODO: REFACTOR THIS, SEPERATE THE BASE FROM THE JOINS AND REFERENCED TABLES
  const baseFields: AppDetailsSelectFields[] = [
    "*",
    "categories",
    "profiles",
    "developers",
    "app_likes",
    "app_bookmarks",
  ]
  // '*, categories(*), profiles(*), developers(*), app_likes(*), app_bookmarks(*)'

  let innerT: T

  if (byField?.table) {
    innerT = byField.table
  }

  const selectFields = baseFields
    .map((field) =>
      field === "*"
        ? "*"
        : innerJoinTables?.includes(field) || field === innerT
          ? `${field}!inner(*)`
          : `${field}(*)`
    )
    .join(", ")

  let query = supabase
    .from("apps")
    .select(selectFields, { count: "exact" })
    // .eq("categories.category_slug", "llm")
    .eq("app_publish_status", "published")

  // byField such as .eq(categories.category_slug, category_slug)
  if (byField && byField.table && byField.column && byField.value) {
    query.eq(
      `${byField.table as string}.${byField.column as string}`,
      byField.value
    )
  }

  // Order
  query.order(column, orderOptions)

  // Filters
  filters.forEach((filter) => {
    query.filter(filter.column, filter.operator, filter.value)
  })

  // Limit
  query.limit(limit, limitOptions)

  const { data: apps, error: getAppsByCategoryError } =
    await query.returns<AppDetails[]>()

  if (getAppsByCategoryError) {
    console.error(
      "Error fetching apps by category",
      getAppsByCategoryError.message
    )
    return { getAppsByCategoryError: getAppsByCategoryError.message }
  }

  return { apps }
}
