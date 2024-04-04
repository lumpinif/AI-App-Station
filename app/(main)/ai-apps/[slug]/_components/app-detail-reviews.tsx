"use client"

import { Star } from "lucide-react"

import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

type AppDetailReviewsProps = {}

export const AppDetailReviews: React.FC<AppDetailReviewsProps> = ({}) => {
  return (
    <>
      <h2 className="text-2xl font-medium">Ratings and Reviews</h2>
      <div className="grid w-full grid-cols-2 gap-x-4">
        <div className="flex items-end">
          <div className="flex w-full items-end gap-x-4">
            <div className="text-6xl font-bold dark:text-muted-foreground">
              4.7
            </div>
            <div className="flex flex-col text-sm text-muted-foreground">
              <span className="">out of 5</span>
              <Separator />
              <span className="">161 Ratings</span>
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
