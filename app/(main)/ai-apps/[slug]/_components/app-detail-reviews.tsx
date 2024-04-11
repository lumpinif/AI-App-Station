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
  const formattedRatingCount = numeral(rating_count).format("0.[0]a")

  const rating_5_percentage = (rating_5_count / rating_count) * 100
  const rating_4_percentage = (rating_4_count / rating_count) * 100
  const rating_3_percentage = (rating_3_count / rating_count) * 100
  const rating_2_percentage = (rating_2_count / rating_count) * 100
  const rating_1_percentage = (rating_1_count / rating_count) * 100

  const ratings = [
    { stars: 5, percentage: rating_5_percentage },
    { stars: 4, percentage: rating_4_percentage },
    { stars: 3, percentage: rating_3_percentage },
    { stars: 2, percentage: rating_2_percentage },
    { stars: 1, percentage: rating_1_percentage },
  ]

  return (
    <>
      <h2 className="text-2xl font-medium" id="ratings-and-reviews">
        Ratings & Reviews
      </h2>
      <div className="grid w-full grid-cols-2 gap-x-4">
        <div className="flex w-full items-center gap-x-4">
          <div className="text-5xl font-bold dark:text-muted-foreground sm:text-6xl">
            {rating_score ? rating_score.toFixed(1) : 0}
          </div>
          <div className="flex flex-col items-center text-xs text-muted-foreground sm:text-sm">
            <span>out of 5</span>
            <Separator />
            <span>{formattedRatingCount} Ratings</span>
          </div>
        </div>
        <div className="flex flex-col text-xs">
          {ratings.map((rating, index) => (
            <div key={index} className="mt-1 flex items-center">
              {Array(rating.stars)
                .fill(null)
                .map((_, i) => (
                  <RatingStar key={i} />
                ))}
              <ProgreeBar value={rating.percentage} />
            </div>
          ))}
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
