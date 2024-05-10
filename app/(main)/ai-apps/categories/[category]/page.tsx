import Link from "next/link"
import { getAllCategories } from "@/server/data/supabase-actions"
import supabase from "@/utils/supabase/supabase"

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
  const { categories: allCategories, error } = await getAllCategories()
  return (
    <div>
      Category Page: {category}
      <div className="">
        SideNavRoutes:{" "}
        {allCategories?.map((cat, index) => (
          <ul>
            <Link href={`/ai-apps/categories/${cat.category_slug}`}>
              {index}-{cat.category_name}
            </Link>
          </ul>
        ))}
      </div>
    </div>
  )
}
