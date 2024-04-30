import Link from "next/link"

import { AppCardContentWithCategories } from "@/types/db_tables"

type AppCardLabelDescriptionProps = {
  categories: AppCardContentWithCategories["categories"]
}

export const AppCardLabelDescription: React.FC<
  AppCardLabelDescriptionProps
> = ({ categories }) => {
  return (
    // TODO: REFACTOR THIS CONSIDER MAKING IT TO A POPOVER

    <div className="text-muted-foreground flex w-full justify-end  gap-x-1 text-nowrap text-[10px]">
      {/* Category */}
      {categories && categories.length > 0 ? (
        categories
          ?.slice(0, 2) // Take only the first two items from the categories array
          .map((category, index) => (
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
              {index !== categories.slice(0, 2).length - 1 && (
                <div className="bg-muted-foreground h-1 w-1 rounded-full" />
              )}
            </span>
          ))
      ) : (
        <span className="text-xs">Set Category</span>
      )}
    </div>
  )
}
