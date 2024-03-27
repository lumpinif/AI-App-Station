"use client"

import React, { Suspense } from "react"
import { EmblaOptionsType, EmblaPluginType } from "embla-carousel"
import Autoplay from "embla-carousel-autoplay"
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures"

import { AppCardContentWithCategories } from "@/types/db_tables"
import { cn } from "@/lib/utils"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Separator } from "@/components/ui/separator"

import AppCard from "../../cards/app-card"

const MemoizedCarouselItem = React.memo(CarouselItem)

type AppCardsCarouselProps = {
  title: string
  data: AppCardContentWithCategories[]
  className?: string
  isMarginRight?: boolean
  options?: EmblaOptionsType
  isAutpPlay?: boolean
  isWheelGestures?: boolean
  hiddenOnCanNotScroll?: boolean
}

const PLUGIN_AUTOPLAY: EmblaPluginType = Autoplay({
  playOnInit: true,
  delay: 4500,
})

const PLUGIN_WHEELGESTURES: EmblaPluginType = WheelGesturesPlugin({})

// Utility function to chunk the data into groups of three
const chunkDataIntoGroups = (data: AppCardContentWithCategories[]) => {
  const groups = []
  for (let i = 0; i < data.length; i += 3) {
    groups.push(data.slice(i, i + 3))
  }
  return groups
}

const AppCardsCarousel: React.FC<AppCardsCarouselProps> = ({
  title,
  data,
  className,
  options,
  isAutpPlay = false,
  isMarginRight = false,
  hiddenOnCanNotScroll = false,
  isWheelGestures = true,
}) => {
  const [isHovered, setIsHovered] = React.useState(false)

  let plugins: EmblaPluginType[] = []

  if (isAutpPlay) {
    plugins.push(PLUGIN_AUTOPLAY)
  }

  if (isWheelGestures) {
    plugins.push(PLUGIN_WHEELGESTURES)
  }

  const dataGroups = chunkDataIntoGroups(data)

  const renderSlide = (
    group: AppCardContentWithCategories[],
    index: number,
    className?: string
  ) => {
    return (
      <MemoizedCarouselItem
        key={index}
        className={cn("flex flex-col gap-y-5", className)}
      >
        {group.map((app, i) => (
          <>
            <AppCard
              key={app.app_id}
              index={i}
              app_id={app.app_id}
              app_title={app.app_title}
              description={app.description}
              categories={app.categories}
              app_slug={app.app_slug}
            />
          </>
        ))}
      </MemoizedCarouselItem>
    )
  }

  return (
    <div className="relative mx-auto h-full w-full max-w-full">
      {/* Carousel Title */}
      <div className="mb-4 flex flex-col gap-y-4">
        <Separator />
        <h2 className="text-2xl font-semibold leading-tight tracking-tight">
          {title}
        </h2>
      </div>
      <Carousel
        opts={{ align: "start", duration: 25, skipSnaps: true, ...options }}
        plugins={plugins}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CarouselContent className={cn("py-2", isMarginRight ? "mr-6" : "")}>
          <Suspense fallback={"Loading..."}>
            {dataGroups.map((group, index) =>
              renderSlide(group, index, className)
            )}
          </Suspense>
        </CarouselContent>
        <CarouselPrevious
          hiddenOnCanNotScroll={hiddenOnCanNotScroll}
          variant={"tag"}
          className={cn(
            "left-0 size-10 h-full rounded-none from-background/80 to-transparent transition-colors duration-150 ease-out hover:bg-gradient-to-r",
            isHovered ? "" : "hidden"
          )}
        />
        <CarouselNext
          hiddenOnCanNotScroll={hiddenOnCanNotScroll}
          variant={"tag"}
          className={cn(
            "right-0 size-10 h-full rounded-none from-background/80 to-transparent transition-colors duration-150 ease-out hover:bg-gradient-to-l",
            isHovered ? "" : "hidden"
          )}
        />
      </Carousel>
    </div>
  )
}

export default AppCardsCarousel
