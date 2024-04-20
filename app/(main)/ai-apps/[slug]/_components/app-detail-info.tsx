import { Fragment } from "react"
import Link from "next/link"
import { Rating } from "@mui/material"
import { Star } from "lucide-react"
import numeral from "numeral"

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
  const formattedRatingCount = numeral(rating_count).format("0.[0]a")

  return (
    <div
      className={cn(
        "no-scrollbar w-full max-w-full snap-x overflow-x-auto py-2 md:py-4",
        className
      )}
    >
      <div className="flex h-20 w-full min-w-max shrink-0 flex-row items-center max-sm:justify-between">
        <InfoBox>
          <InfoBoxTitle>{formattedRatingCount} Ratings</InfoBoxTitle>
          <RatingsAndReviews
            rating_count={rating_count}
            rating_score={rating_score}
          />
        </InfoBox>
        <InfoBoxSeperator />

        <InfoBox>
          <InfoBoxTitle>
            {app.developers && app.developers.length > 1 ? (
              <span>Developers</span>
            ) : (
              <span>Developer</span>
            )}
          </InfoBoxTitle>
          <Developers developers={app.developers} />
        </InfoBox>
        <InfoBoxSeperator />

        {app.categories && app.categories.length > 0 ? (
          app.categories?.map((category, index) => (
            <Fragment key={category.category_id + index}>
              <InfoBox>
                <InfoBoxTitle>Category</InfoBoxTitle>
                <Category
                  category_slug={category.slug}
                  category_title={category.category_title}
                />
              </InfoBox>
              <InfoBoxSeperator />
            </Fragment>
          ))
        ) : (
          <>
            <InfoBox>
              <InfoBoxTitle>Category</InfoBoxTitle>
              <span className="text-xs">No Category</span>
            </InfoBox>
            <InfoBoxSeperator />
          </>
        )}

        <InfoBox>
          <InfoBoxTitle>Comments</InfoBoxTitle>
          <AppCommentsBadge
            app_slug={app.app_slug}
            comments_count={app.comments_count}
            className="flex h-full flex-col items-center justify-center overflow-hidden text-center text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
          />
        </InfoBox>
        <InfoBoxSeperator />
        <InfoBox>
          <InfoBoxTitle>Pricing</InfoBoxTitle>
          <Pricing
            data={app}
            className="flex h-full cursor-default flex-col items-center justify-center overflow-hidden text-center text-muted-foreground"
          />
        </InfoBox>
      </div>
    </div>
  )
}

const InfoBoxSeperator = ({ className }: { className?: string }) => {
  return (
    <Separator
      orientation="vertical"
      className={cn("h-2/3 dark:border-muted/60", className)}
    />
  )
}

type InfoBoxProps = {
  children: React.ReactNode | string
  className?: string
}

const InfoBox = ({ children, className }: InfoBoxProps) => {
  return (
    <div
      className={cn(
        "flex h-full w-28 shrink-0 flex-col items-center justify-start overflow-hidden text-center sm:w-32 md:w-40 lg:w-44",
        className
      )}
    >
      {children}
    </div>
  )
}

const InfoBoxTitle = ({ children, className }: InfoBoxProps) => {
  return (
    <span
      className={cn(
        "text-nowrap text-xs uppercase text-muted-foreground ",
        className
      )}
    >
      {children}
    </span>
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
    <div
      className={cn(
        "flex h-full flex-col items-center justify-center space-y-1 text-muted-foreground",
        className
      )}
    >
      <div className="text-lg font-medium tracking-wider">{rating_score}</div>
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
      className={cn(
        "flex h-full flex-col items-center justify-center overflow-hidden text-center text-muted-foreground underline-offset-4 hover:text-primary hover:underline",
        className
      )}
    >
      <span className="text-xs">{category_title}</span>
    </Link>
  )
}

const Developers = ({
  developers,
  className,
}: {
  developers: AppDetails["developers"]
  className?: string
}) => {
  return (
    <div
      className={cn(
        "no-scrollbar relative flex h-full w-full snap-mandatory flex-col items-center justify-center overflow-y-scroll text-ellipsis pt-1 text-muted-foreground",
        className
      )}
    >
      <span className="flex h-full flex-col items-center justify-center">
        {developers && developers.length > 0 ? (
          developers.map((dev) => (
            <span key={dev.developer_name} className="w-full pt-1 text-xs">
              {dev.developer_slug ? (
                <Link
                  href={dev.developer_slug}
                  className="h-full font-medium underline-offset-4 hover:cursor-pointer hover:text-primary hover:underline"
                >
                  {dev.developer_name}
                </Link>
              ) : (
                <span className="font-medium">{dev.developer_name}</span>
              )}
            </span>
          ))
        ) : (
          <span className="text-xs">Unknow</span>
        )}
      </span>
    </div>
  )
}
