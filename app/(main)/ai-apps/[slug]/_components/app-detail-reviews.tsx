"use client"

import { Star } from "lucide-react"

import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"

type AppDetailReviewsProps = {}

export const AppDetailReviews: React.FC<AppDetailReviewsProps> = ({}) => {
  return (
    <>
      <h2 className="text-2xl font-medium">Ratings and Reviews</h2>
      <div className="grid w-full grid-cols-2 gap-x-4 border xl:grid-cols-3">
        <div className="flex w-full items-end border">
          <div className="flex items-end border ">
            <div className="text-6xl font-bold dark:text-muted-foreground">
              4.7
            </div>
            <div className="ml-2 text-sm text-muted-foreground">out of 5</div>
          </div>
          <div className="border text-sm text-gray-600">161 Ratings</div>
        </div>
        <div className="flex flex-col border text-xs">
          <div className="flex items-center">
            <RatingStar />
            <RatingStar />
            <RatingStar />
            <RatingStar />
            <RatingStar />
            <ProgreeBar value={80} />
          </div>
          <div className="mt-1 flex items-center">
            <RatingStar />
            <RatingStar />
            <RatingStar />
            <RatingStar />
            <ProgreeBar value={60} />
          </div>
          <div className="mt-1 flex items-center">
            <RatingStar />
            <RatingStar />
            <RatingStar />
            <ProgreeBar value={30} />
          </div>
          <div className="mt-1 flex items-center">
            <RatingStar />
            <RatingStar />
            <ProgreeBar value={20} />
          </div>
          <div className="mt-1 flex items-center">
            <RatingStar />
            <ProgreeBar value={10} />
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
