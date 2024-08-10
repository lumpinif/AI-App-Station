import Link from "next/link"
import { BoxSelect } from "lucide-react"

import { Categories } from "@/types/db_tables"
import LucideIcon, {
  dynamicLucidIconProps,
} from "@/components/icons/lucide-icon"

type CategoriesGridProps = {
  categoryItems?: Categories[]
}

export const CategoriesGrid: React.FC<CategoriesGridProps> = ({
  categoryItems,
}) => {
  return (
    <>
      <div className="grid gap-4 p-2 sm:grid-cols-2 md:pr-4 lg:grid-cols-3 lg:gap-6 lg:pr-6">
        {categoryItems?.map((cat, index) => (
          <Link
            key={index}
            href={`/ai-apps/categories/${cat.category_slug}`}
            className="w-fit transition-all duration-300 ease-out active:scale-[.98]"
          >
            <div className="flex items-center text-primary/90 transition-all duration-300 ease-out hover:text-primary">
              <span className="flex size-14 flex-none items-center justify-center rounded-xl border p-4 shadow-md transition-all duration-300 ease-out hover:shadow-lg dark:border-border/50 dark:hover:shadow-outline">
                {cat.category_icon_name ? (
                  <LucideIcon
                    name={cat.category_icon_name as dynamicLucidIconProps}
                    className="size-8"
                  />
                ) : (
                  <BoxSelect className="size-8 text-muted-foreground" />
                )}
              </span>

              <div className="ml-2 text-lg font-medium tracking-tight transition-all duration-300 ease-out lg:ml-4 lg:text-xl">
                {cat.category_name}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
