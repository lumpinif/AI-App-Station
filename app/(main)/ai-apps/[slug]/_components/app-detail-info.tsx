import { Fragment } from "react"
import Link from "next/link"
import { Rating } from "@mui/material"
import { Star } from "lucide-react"

import { AppDetails, Categories as CategoriesProps } from "@/types/db_tables"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

import { AppCommentsBadge } from "../../_components/cards/_components/app-comments-badge"

type AppDetailInfoProps = {
  data: AppDetails
  className?: string
  rating_score: number
  rating_count: number
}

export const AppDetailInfo: React.FC<AppDetailInfoProps> = ({
  data: app,
  className,
  rating_score,
  rating_count,
}) => {
  return (
    <div
      className={cn(
        "no-scrollbar w-full max-w-full snap-x overflow-x-auto",
        className
      )}
    >
      <div className="flex h-20 w-full min-w-max shrink-0 flex-row items-center max-sm:justify-between">
        <div className="flex h-full w-28 shrink-0 items-center justify-center overflow-hidden sm:w-32 md:w-40 lg:w-44">
          <RatingsAndReviews
            rating_count={rating_count}
            rating_score={rating_score}
          />
        </div>
        <Separator
          orientation="vertical"
          className="h-2/3 dark:border-muted/60"
        />
        <Categories data={app} />
        <div className="flex h-full w-28 shrink-0 items-center justify-center sm:w-32 md:w-40 lg:w-44">
          <AppCommentsBadge
            app_slug={app.app_slug}
            comments_count={app.comments_count}
            className="underline-offset-4 hover:font-medium"
          />
        </div>
        <Separator
          orientation="vertical"
          className="h-2/3 dark:border-muted/60"
        />
        <div className="lg:w-44shrink-0 flex h-full w-28 items-center justify-center sm:w-32 md:w-40">
          <Pricing data={app} className="w-full text-center" />
        </div>
      </div>
    </div>
  )
}

const Pricing = ({
  data: app,
  className,
}: {
  data: AppDetails
  className?: string
}) => {
  return <span className={cn("text-xs", className)}>{app.pricing}</span>
}

const RatingsAndReviews = ({
  rating_score,
  rating_count,
  className,
}: {
  rating_score: number
  rating_count: number
  className?: string
}) => {
  return (
    <div className={cn("flex flex-col justify-center", className)}>
      <div className="text-nowrap text-xs ">
        {rating_score} • {rating_count} Ratings
      </div>
      <Rating
        readOnly
        name="read-only"
        size="small"
        value={4.5}
        precision={0.5}
        emptyIcon={<Star className="fill-muted stroke-0" size={18} />}
      />
    </div>
  )
}

const Category = ({
  category_title,
  category_slug,
  className,
}: {
  category_title: CategoriesProps["category_title"]
  category_slug: CategoriesProps["slug"]
  className?: string
}) => {
  return (
    <Link
      href={`/ai-apps/categories/${category_slug}`}
      className={cn(className)}
    >
      <span className="text-xs">{category_title}</span>
    </Link>
  )
}

const Categories = ({ data: app }: { data: AppDetails }) => {
  return (
    <Fragment>
      {app.categories && app.categories.length > 0 ? (
        app.categories?.map((category, index) => (
          <Fragment key={index}>
            <div
              key={category.category_id}
              className="flex h-full w-28 shrink-0 items-center justify-center sm:w-32 md:w-40 lg:w-44"
            >
              <Category
                category_slug={category.slug}
                category_title={category.category_title}
                className="underline-offset-4 hover:font-medium hover:underline"
              />
            </div>
            <Separator
              orientation="vertical"
              className="h-2/3 dark:border-muted/60"
            />
          </Fragment>
        ))
      ) : (
        <Fragment>
          <div className="flex h-full w-28 shrink-0 items-center justify-center sm:w-32 md:w-40 lg:w-44">
            <span className="text-xs">No Category</span>
          </div>
          <Separator
            orientation="vertical"
            className="h-2/3 dark:border-muted/60"
          />
        </Fragment>
      )}
    </Fragment>
  )
}
