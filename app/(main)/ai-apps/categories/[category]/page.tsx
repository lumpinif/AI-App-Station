import Link from "next/link"
import {
  getAllCategories,
  getCategoryBySlug,
} from "@/server/data/supabase-actions"
import supabase from "@/utils/supabase/supabase"

import AiAppsPagesTitle from "../../_components/ai-apps-page-title"

export const dynamicParams = false

// Return a list of `params` to populate the [category] dynamic segment
export async function generateStaticParams() {
  let { data: allCategories, error } = await supabase
    .from("categories")
    .select("*")

  if (error) {
    throw new Error(error.message)
  }

  if (!allCategories) {
    return []
  }

  if (allCategories) {
    const categoryParams = allCategories.map((cat) => ({
      category: cat.category_slug,
    }))
    return categoryParams
  }
  return []
}

export default async function CategoryPage({
  params,
}: {
  params: { category: string }
}) {
  const { category } = params

  // TODO: REMOVE THIS BEFORE PRODUCTION
  const { categories: allCategories } = await getAllCategories()

  const { category: categoryBySlug, error: getCategoryBySlugError } =
    await getCategoryBySlug(category)

  if (getCategoryBySlugError) {
    // TODO: HANDLE ERROR BEFORE PRODUCTION
    console.error(getCategoryBySlugError)
  }

  const pageTitle =
    (categoryBySlug && categoryBySlug[0]?.category_name) || "Category"

  return (
    <section className="flex flex-col gap-y-4">
      <AiAppsPagesTitle
        title={pageTitle}
        href={`/ai-apps/categories/${category}`}
      />

      <div className="">
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
