"use client"

import { Fragment, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Rating } from "@mui/material"
import { ArrowRight, Star } from "lucide-react"
import numeral from "numeral"

import { AppDetails, Category as CategoriesProps } from "@/types/db_tables"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

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
  const containerRef = useRef<HTMLDivElement>(null)
  const [hasOverflow, setHasOverflow] = useState(false)

  const checkOverflow = () => {
    if (containerRef.current) {
      const { scrollWidth, clientWidth } = containerRef.current
      setHasOverflow(scrollWidth > clientWidth)
    }
  }

  useEffect(() => {
    checkOverflow()
    window.addEventListener("resize", checkOverflow)
    return () => {
      window.removeEventListener("resize", checkOverflow)
    }
  }, [rating_count, rating_score])

  return (
    <div className="group relative w-full max-w-full">
      {hasOverflow && (
        <div className="absolute bottom-0 right-0">
          <span className="text-muted-foreground/50 flex items-center space-x-2  text-xs">
            <p className="opacity-100 transition-all duration-200 ease-out group-focus-within:opacity-100 group-hover:opacity-100 group-focus:opacity-100 group-active:opacity-100 sm:opacity-0">
              scroll for more
            </p>
            <ArrowRight className="size-3 opacity-100 transition-all duration-200 ease-out group-focus-within:opacity-100 group-hover:opacity-100 group-focus:opacity-100 group-active:opacity-100 sm:opacity-0" />
          </span>
        </div>
      )}
      <div
        ref={containerRef}
        className={cn(
          "no-scrollbar relative w-full max-w-full snap-x overflow-x-auto py-2 md:py-4",
          className
        )}
      >
        <div className="flex h-20 w-full min-w-max shrink-0 flex-row items-center max-sm:justify-between">
          <InfoBox>
            <InfoBoxTitle>{formattedRatingCount} Ratings</InfoBoxTitle>
            <RatingsAndReviews rating_score={rating_score} />
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
                    category_slug={category.category_slug}
                    category_name={category.category_name}
                  />
                </InfoBox>
                <InfoBoxSeperator />
              </Fragment>
            ))
          ) : (
            <>
              <InfoBox>
                <InfoBoxTitle>Category</InfoBoxTitle>
                <span className="text-muted-foreground flex h-full items-center justify-center text-center text-xs">
                  No Categories yet
                </span>
              </InfoBox>
              <InfoBoxSeperator />
            </>
          )}

          <InfoBox>
            <InfoBoxTitle>Pricing</InfoBoxTitle>
            <Pricing
              data={app}
              className="text-muted-foreground flex h-full cursor-default flex-col items-center justify-center overflow-hidden text-center"
            />
          </InfoBox>
        </div>
      </div>
    </div>
  )
}

const InfoBoxSeperator = ({ className }: { className?: string }) => {
  return (
    <Separator
      orientation="vertical"
      className={cn("dark:border-muted/60 h-2/3", className)}
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
        "text-muted-foreground text-nowrap text-xs uppercase ",
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
  className,
}: {
  rating_score: number
  className?: string
}) => {
  return (
    <div
      className={cn(
        "text-muted-foreground flex h-full flex-col items-center justify-center space-y-1",
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
  category_name,
  category_slug,
  className,
}: {
  category_name: CategoriesProps["category_name"]
  category_slug: CategoriesProps["category_slug"]
  className?: string
}) => {
  return (
    <Link
      href={`/ai-apps/categories/${category_slug}`}
      className={cn(
        "text-muted-foreground hover:text-primary flex h-full flex-col items-center justify-center overflow-hidden text-center underline-offset-4 hover:underline",
        className
      )}
    >
      <span className="text-xs">{category_name}</span>
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
        "text-muted-foreground group relative flex h-full w-full flex-col items-center justify-start",
        className
      )}
    >
      <div
        className={cn(
          "no-scrollbar relative h-full max-h-16 overflow-y-auto scroll-smooth first:pt-1",
          developers && developers.length < 4
            ? "flex flex-col items-center justify-center"
            : ""
        )}
      >
        {developers && developers.length > 0 ? (
          developers.map((dev) => (
            <span
              key={dev.developer_name}
              className="block w-20 overflow-hidden text-ellipsis pb-1 text-xs md:w-28"
            >
              {dev.developer_slug ? (
                <Link
                  href={dev.developer_slug}
                  className="hover:text-primary select-none font-medium underline-offset-4 hover:cursor-pointer hover:underline"
                >
                  {dev.developer_name}
                </Link>
              ) : (
                <span className="font-medium">{dev.developer_name}</span>
              )}
            </span>
          ))
        ) : (
          <span className="flex h-full w-full items-center justify-center text-xs">
            No developers yet
          </span>
        )}
      </div>
      {developers && developers.length > 4 && (
        <div className="absolute right-px top-[-22px] opacity-0 transition-all duration-200 ease-out group-hover:opacity-80 group-focus:opacity-80 group-active:opacity-80 md:right-4">
          <span className="text-muted-foreground select-none text-xs">▼</span>
        </div>
      )}
    </div>
  )
}
