import Link from "next/link"
import { getAllCategories } from "@/server/data/supabase-actions"

import AiAppsPagesTitle from "../_components/ai-apps-page-title"

export default async function CategoriesPage() {
  const { categories: allCategories, error: getAllCategoiresError } =
    await getAllCategories()

  if (getAllCategoiresError) {
    // TODO: HANDLE ERROR BEFORE PRODUCTION
    console.error(getAllCategoiresError)
  }

  return (
    <section className="flex flex-col gap-y-4">
      <AiAppsPagesTitle title={"Categories"} href={`/ai-apps/categories`} />

      <div className="grid w-full sm:grid-cols-2 md:grid-cols-3">
        {allCategories?.map((cat, index) => (
          <div className="col-span-1">
            <Link href={`/ai-apps/categories/${cat.category_slug}`}>
              {index}-{cat.category_name}
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
