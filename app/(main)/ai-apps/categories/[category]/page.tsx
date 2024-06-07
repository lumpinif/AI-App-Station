import Link from "next/link"
import {
  getAllCategories,
  getCategoryBySlug,
} from "@/server/data/supabase-actions"
import { getAppsByConfig } from "@/server/queries/supabase/apps"
import supabase from "@/utils/supabase/supabase"

import { Categories } from "@/types/db_tables"

import AiAppsPagesTitle from "../../_components/ai-apps-page-title"

// export const dynamicParams = false

// Return a list of `params` to populate the [category] dynamic segment
// export async function generateStaticParams() {
//   let { data: allCategories, error } = await supabase
//     .from("categories")
//     .select("*")
//     .returns<Categories[]>()

//   if (error) {
//     throw new Error(error.message)
//   }

//   if (!allCategories) {
//     return []
//   }

//   if (allCategories) {
//     const categoryParams = allCategories.map((cat) => ({
//       category: cat.category_slug,
//     }))
//     return categoryParams
//   }
//   return []
// }

async function fetchAppsByCategory(
  category_slug?: Categories["category_slug"]
) {
  if (!category_slug) {
    return {
      appsByCategory: null,
      getAppsByCategoryError: "No category slug provided",
    }
  }

  const { apps: appsByCategory, getAppsByCategoryError } =
    await getAppsByConfig({
      config: {
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
      byField: {
        table: "categories",
        column: "category_slug",
        value: category_slug,
      },
    })

  return { appsByCategory, getAppsByCategoryError }
}

export default async function CategoryPage({
  params,
}: {
  params: { category: string }
}) {
  const { category: category_slug } = params

  // TODO: REMOVE THIS BEFORE PRODUCTION
  const { categories: allCategories } = await getAllCategories()

  const { category: categoryBySlug, error: getCategoryBySlugError } =
    await getCategoryBySlug(category_slug)

  if (getCategoryBySlugError) {
    console.error("Failed to fetch category by slug:", getCategoryBySlugError)
    return (
      <section className="flex flex-col gap-y-4">
        <p>Sorry, there was an error loading this category.</p>
      </section>
    )
  }

  const { appsByCategory, getAppsByCategoryError } =
    await fetchAppsByCategory(category_slug)

  if (getAppsByCategoryError) {
    return (
      <section className="flex flex-col gap-y-4 text-muted-foreground">
        <p>Sorry, there was an error loading apps by category.</p>
        <p>Error: {getAppsByCategoryError}</p>
      </section>
    )
  }

  const pageTitle =
    (categoryBySlug && categoryBySlug[0]?.category_name) || "Category"

  return (
    <section className="flex flex-col gap-y-4">
      <AiAppsPagesTitle
        title={pageTitle}
        href={`/ai-apps/categories/${category_slug}`}
      />

      {appsByCategory?.length === 0 && <p>No apps found in this category.</p>}

      <div className="flex flex-col gap-y-2">
        {appsByCategory?.map((app, index) => (
          <div key={index}>
            <h2>
              {index + 1} - {app.app_title}
            </h2>
          </div>
        ))}
      </div>

      {/* Temporary */}
      <div className="border-t">
        ALL CATEGORIES:{" "}
        {allCategories?.map((cat, index) => (
          <ul className="divide-y-2" key={index}>
            <Link href={`/ai-apps/categories/${cat.category_slug}`}>
              {index}-{cat.category_name}
            </Link>
          </ul>
        ))}
      </div>
    </section>
  )
}
