import Link from "next/link"

import { AppCardContentWithCategories } from "@/types/db_tables"

type AppCardLabelDescriptionProps = {
  categories: AppCardContentWithCategories["categories"]
}

export const AppCardLabelDescription: React.FC<
  AppCardLabelDescriptionProps
> = ({ categories }) => {
  return (
    <>
      <div className="flex w-full justify-end gap-x-1 text-nowrap text-[10px] text-muted-foreground">
        {/* Category */}
        {categories && categories.length > 0 ? (
          categories?.map((category, index) => (
            <span
              key={category.category_id}
              className="flex items-center gap-x-1"
            >
              <Link
                href={`/ai-apps/categories/${category.category_slug}`}
                className="hover:underline"
              >
                <span className="text-xs">{category.category_name}</span>
              </Link>
              {index !== categories.length - 1 && (
                <div className="h-1 w-1 rounded-full bg-muted-foreground" />
              )}
            </span>
          ))
        ) : (
          <span className="text-xs">Set Category</span>
        )}
      </div>
    </>
  )
}
