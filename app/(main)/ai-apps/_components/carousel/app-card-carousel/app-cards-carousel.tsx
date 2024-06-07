"use client"

import React, { useMemo } from "react"
import { User } from "@supabase/supabase-js"
import { EmblaOptionsType, EmblaPluginType } from "embla-carousel"
import Autoplay from "embla-carousel-autoplay"
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures"

import { AppDetails, AppWithCategories } from "@/types/db_tables"
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

type AppCardsCarouselProps = {
  title: string
  maxItems?: number
  data: AppDetails[]
  user?: User | null
  className?: string
  isAutpPlay?: boolean
  isMarginRight?: boolean
  isWheelGestures?: boolean
  options?: EmblaOptionsType
  hiddenOnCanNotScroll?: boolean
}

const PLUGIN_AUTOPLAY = Autoplay({ playOnInit: true, delay: 4500 })
const PLUGIN_WHEELGESTURES = WheelGesturesPlugin({})

// Utility function to chunk the data into groups of three
const chunkDataIntoGroups = (data: AppDetails[], maxItems?: number) => {
  if (!Array.isArray(data)) {
    // throw new Error("Data should be an array")
    return []
  }

  data.forEach((item, index) => {
    if (typeof item !== "object" || item === null) {
      throw new Error(`Item at index ${index} should be an object`)
    }
    // Add more checks here for the properties of AppDetails if necessary
  })

  const items = maxItems ? data.slice(0, maxItems) : data

  const groups = []
  for (let i = 0; i < items.length; i += 3) {
    groups.push(items.slice(i, i + 3))
  }
  return groups
}

const AppCardsCarousel: React.FC<AppCardsCarouselProps> = ({
  data,
  user,
  title,
  options,
  className,
  maxItems = 15,
  isAutpPlay = false,
  isMarginRight = false,
  isWheelGestures = true,
  hiddenOnCanNotScroll = false,
}) => {
  const [isHovered, setIsHovered] = React.useState(false)

  const plugins = useMemo(() => {
    const activePlugins: EmblaPluginType[] = []
    if (isAutpPlay) activePlugins.push(PLUGIN_AUTOPLAY)
    if (isWheelGestures) activePlugins.push(PLUGIN_WHEELGESTURES)
    return activePlugins
  }, [isAutpPlay, isWheelGestures])

  const dataGroups = useMemo(
    () => chunkDataIntoGroups(data, maxItems),
    [data, maxItems]
  )

  if (!dataGroups.length)
    return (
      <div className="mb-4 flex flex-col gap-y-4">
        {/* <Separator /> */}
        <h2 className="page-title-font text-2xl">{title}</h2>
        <div className="text-center text-muted-foreground">
          Sorry, we currently got nothing to show for{" "}
          <h2 className="page-title-font text-2xl">{title}</h2> It should be
          fixed shortly, please come back later
        </div>
      </div>
    )

  return (
    <div className="relative mx-auto h-full w-full max-w-full">
      {/* Carousel Title */}
      <div className="mb-4 flex flex-col gap-y-4">
        {/* <Separator /> */}
        <h2 className="page-title-font text-2xl">{title}</h2>
      </div>
      <Carousel
        opts={{ align: "start", duration: 25, skipSnaps: true, ...options }}
        plugins={plugins}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CarouselContent className={cn("py-2", isMarginRight ? "mr-6" : "")}>
          {dataGroups.map((group, index) => (
            <CarouselItem
              key={index}
              className={cn("flex flex-col gap-y-5", className)}
            >
              {group.map((app, appIndex) => (
                <AppCard
                  key={app.app_id}
                  user={user}
                  index={appIndex}
                  {...app}
                />
              ))}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          hiddenOnCanNotScroll={hiddenOnCanNotScroll}
          variant={"tag"}
          className={cn(
            "left-0 size-10 h-full rounded-none from-background/80 to-transparent transition-colors duration-150 ease-out hover:bg-gradient-to-r",
            isHovered ? "max-sm:hidden" : "hidden"
          )}
        />
        <CarouselNext
          hiddenOnCanNotScroll={hiddenOnCanNotScroll}
          variant={"tag"}
          className={cn(
            "right-0 size-10 h-full rounded-none from-background/80 to-transparent transition-colors duration-150 ease-out hover:bg-gradient-to-l",
            isHovered ? "max-sm:hidden" : "hidden"
          )}
        />
      </Carousel>
    </div>
  )
}

export default AppCardsCarousel
