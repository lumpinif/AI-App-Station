import Link from "next/link"
import { getAllCategories } from "@/server/data/supabase-actions"
import { sampleSize } from "lodash"

import { Separator } from "@/components/ui/separator"

import { CategoriesGrid } from "../categories-grid"
import { SeeAllButton } from "../see-all-button"

type CategoriesNavProps = {}

export const MainPageCategoriesNav: React.FC<
  CategoriesNavProps
> = async ({}) => {
  const { categories: allCategories, error: getAllCategoiresError } =
    await getAllCategories()

  if (getAllCategoiresError) {
    console.error(getAllCategoiresError)
    return (
      <section className="flex flex-col gap-y-4">
        <span className="text-muted-foreground">
          It should be fixed shortly
        </span>
        <p>Error: {getAllCategoiresError}</p>
      </section>
    )
  }

  if (!allCategories)
    return (
      <section className="flex flex-col gap-y-4">
        <span className="text-muted-foreground">
          It should be fixed shortly
        </span>
      </section>
    )

  const categoriesItems = sampleSize(allCategories, 6)

  return (
    <section className="hidden flex-col gap-y-4 sm:flex">
      <span className="flex flex-col gap-y-2">
        <span className="flex items-center justify-between">
          <Link
            href={"/ai-apps/categories"}
            className="page-title-font w-fit text-2xl"
          >
            Categories
          </Link>
          <SeeAllButton href="/ai-apps/categories" />
        </span>
        <Separator className="bg-input" />
      </span>

      <CategoriesGrid categoryItems={categoriesItems} />
    </section>
  )
}
