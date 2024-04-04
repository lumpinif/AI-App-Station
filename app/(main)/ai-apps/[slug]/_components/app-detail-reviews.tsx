"use client"

import { Star } from "lucide-react"
import numeral from "numeral"

import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

type AppDetailReviewsProps = {
  rating_score: number
  rating_count: number
  rating_5_count: number
  rating_4_count: number
  rating_3_count: number
  rating_2_count: number
  rating_1_count: number
}

export const AppDetailReviews: React.FC<AppDetailReviewsProps> = ({
  rating_score,
  rating_count,
  rating_5_count,
  rating_4_count,
  rating_3_count,
  rating_2_count,
  rating_1_count,
}) => {
  const formattedRatingCount = numeral(rating_count).format("0a")

  const rating_5_percentage = (rating_5_count / rating_count) * 100
  const rating_4_percentage = (rating_4_count / rating_count) * 100
  const rating_3_percentage = (rating_3_count / rating_count) * 100
  const rating_2_percentage = (rating_2_count / rating_count) * 100
  const rating_1_percentage = (rating_1_count / rating_count) * 100

  return (
    <>
      <h2 className="text-2xl font-medium">Ratings & Reviews</h2>
      <div className="grid w-full grid-cols-2 gap-x-4">
        <div className="flex items-end">
          <div className="flex w-full items-end gap-x-4">
            <div className="text-6xl font-bold dark:text-muted-foreground">
              {rating_score.toFixed(1)}
            </div>
            <div className="flex flex-col text-sm text-muted-foreground">
              <span className="">out of 5</span>
              <Separator />
              <span className="">{formattedRatingCount} Ratings</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col text-xs">
          <div className="flex items-center">
            <RatingStar />
            <RatingStar />
            <RatingStar />
            <RatingStar />
            <RatingStar />
            <ProgreeBar value={rating_5_percentage} />
          </div>
          <div className="mt-1 flex items-center">
            <RatingStar />
            <RatingStar />
            <RatingStar />
            <RatingStar />
            <ProgreeBar value={rating_4_percentage} />
          </div>
          <div className="mt-1 flex items-center">
            <RatingStar />
            <RatingStar />
            <RatingStar />
            <ProgreeBar value={rating_3_percentage} />
          </div>
          <div className="mt-1 flex items-center">
            <RatingStar />
            <RatingStar />
            <ProgreeBar value={rating_2_percentage} />
          </div>
          <div className="mt-1 flex items-center">
            <RatingStar />
            <ProgreeBar value={rating_1_percentage} />
          </div>
        </div>
      </div>
    </>
  )
}

type RatingStarProps = {
  className?: string
  size?: number
}

export const RatingStar: React.FC<RatingStarProps> = ({
  className,
  size = 9,
}) => {
  return (
    <Star
      className={cn("fill-current text-muted-foreground", className)}
      size={size}
      strokeWidth={1}
    />
  )
}

type ProgreeBarProps = {
  className?: string
  value: number
}

export const ProgreeBar: React.FC<ProgreeBarProps> = ({ className, value }) => {
  return <Progress className={cn("ml-2 h-1 w-full", className)} value={value} />
}
