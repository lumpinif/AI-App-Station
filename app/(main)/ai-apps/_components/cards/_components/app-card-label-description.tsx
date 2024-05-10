import Link from "next/link"

import { AppCardContentWithCategories } from "@/types/db_tables"

type AppCardCatLabelProps = {
  categories: AppCardContentWithCategories["categories"]
}

export const AppCardCatLabel: React.FC<AppCardCatLabelProps> = ({
  categories,
}) => {
  return (
    // TODO: REFACTOR THIS CONSIDER MAKING IT TO A POPOVER

    <div className="text-muted-foreground flex w-full justify-end  gap-x-1 text-nowrap text-[10px]">
      {/* Category */}
      {categories && categories.length > 0
        ? categories
            ?.slice(0, 1) // Take only the first category from the categories array
            .map((category, index) => (
              <span
                key={category.category_id}
                className="flex items-center gap-x-1"
              >
                <Link
                  href={`/ai-apps/categories/${category.category_slug}`}
                  className="underline-offset-2 hover:underline"
                  target="_blank"
                >
                  <span className="text-xs">{category.category_name}</span>
                </Link>
                {/* {index !== categories.slice(0, 2).length - 1 && (
                  <div className="bg-muted-foreground h-1 w-1 rounded-full" />
                )} */}
              </span>
            ))
        : null}
    </div>
  )
}
