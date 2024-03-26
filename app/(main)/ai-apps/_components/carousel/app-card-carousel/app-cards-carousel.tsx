"use client"

import React, { Suspense } from "react"
import { EmblaOptionsType, EmblaPluginType } from "embla-carousel"
import Autoplay from "embla-carousel-autoplay"

import { App } from "@/types/db_tables"
import { cn } from "@/lib/utils"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import AppCard from "../../cards/app-card"

const MemoizedCarouselItem = React.memo(CarouselItem)

type AppCardsCarouselProps = {
  data: App[]
  className?: string
  isMarginRight?: boolean
  options?: EmblaOptionsType
  isAutpPlay?: boolean
  isWheelGestures?: boolean
}

const PLUGIN_AUTOPLAY: EmblaPluginType = Autoplay({
  playOnInit: true,
  delay: 4500,
})

const AppCardsCarousel: React.FC<AppCardsCarouselProps> = ({
  data,
  className,
  options,
  isAutpPlay = false,
  isMarginRight = false,
}) => {
  const [isHovered, setIsHovered] = React.useState(false)

  let plugins: EmblaPluginType[] = []

  if (isAutpPlay) {
    plugins.push(PLUGIN_AUTOPLAY)
  }

  const renderSlide = (app: App, index: number, className?: string) => {
    return (
      <MemoizedCarouselItem key={index} className={cn("", className)}>
        <AppCard title={app.title} categories={app.categories} />
      </MemoizedCarouselItem>
    )
  }

  return (
    <div className="relative mx-auto h-full w-full max-w-full">
      <Carousel
        opts={{ align: "start", duration: 25, dragThreshold: 5, ...options }}
        plugins={plugins}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CarouselContent className={isMarginRight ? "mr-6" : ""}>
          <Suspense fallback={"Loading..."}>
            {data.map((app, index) => renderSlide(app, index, className))}
          </Suspense>
        </CarouselContent>
        <CarouselPrevious
          variant={"tag"}
          className={cn(
            "left-0 size-10 h-full rounded-none from-background/80 to-transparent transition-colors duration-150 ease-out hover:bg-gradient-to-r",
            isHovered ? "" : "hidden"
          )}
        />
        <CarouselNext
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
