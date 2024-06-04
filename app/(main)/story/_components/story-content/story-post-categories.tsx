import { Categories } from "@/types/db_tables"
import { Separator } from "@/components/ui/separator"
import { Category } from "@/app/(main)/ai-apps/[slug]/_components/app-detail-carousel"

type StoryPostCategoriesProps = {
  postCategories?: Categories[]
}

export const StoryPostCategories: React.FC<StoryPostCategoriesProps> = ({
  postCategories,
}) => {
  return (
    <section className="flex h-20 w-full items-center justify-between gap-x-2 py-2">
      {postCategories && postCategories.length > 0
        ? postCategories?.map((category, index) => (
            <>
              <Category
                key={category.category_id + index}
                category_icon_cn="size-4 md:size-4"
                category_slug={category.category_slug}
                category_name={category.category_name}
                category_icon_name={category.category_icon_name}
                className="flex h-full flex-col items-center justify-center overflow-hidden text-center md:space-y-1"
              />
              <Separator
                orientation="vertical"
                className="w-px border-0 outline-none"
              />
            </>
          ))
        : null}
    </section>
  )
}
