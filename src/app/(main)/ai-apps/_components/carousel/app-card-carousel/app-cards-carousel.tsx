"use client"

import React, { useMemo } from "react"
import { useRouter } from "next/navigation"
import { User } from "@supabase/supabase-js"
import { EmblaOptionsType, EmblaPluginType } from "embla-carousel"
import Autoplay from "embla-carousel-autoplay"
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures"
import { Loader2 } from "lucide-react"

import { AppDetails } from "@/types/db_tables"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Separator } from "@/components/ui/separator"

import AppCarouselCard from "../../cards/app-carousel-card"
import { AppFeaturedCard } from "../../cards/app-featured-card"

type AppCardsCarouselProps = {
  title: string
  maxItems?: number
  data: AppDetails[]
  user?: User | null
  chunkSize?: number
  className?: string
  isAutpPlay?: boolean
  error?: string | null
  appCardVariant?: string
  isMarginRight?: boolean
  isWheelGestures?: boolean
  options?: EmblaOptionsType
  hiddenOnCanNotScroll?: boolean
}

const PLUGIN_AUTOPLAY = Autoplay({ playOnInit: true, delay: 4500 })
const PLUGIN_WHEELGESTURES = WheelGesturesPlugin({})

// Utility function to chunk the data into groups of three
const chunkDataIntoGroups = (
  data: AppDetails[],
  maxItems?: number,
  chunkSize: number = 3
) => {
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
  for (let i = 0; i < items.length; i += chunkSize) {
    groups.push(items.slice(i, i + chunkSize))
  }
  return groups
}

const AppCardsCarousel: React.FC<AppCardsCarouselProps> = ({
  data,
  user,
  title,
  options,
  className,
  chunkSize,
  maxItems = 15,
  appCardVariant,
  error: fetchError,
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
    () => chunkDataIntoGroups(data, maxItems, chunkSize),
    [chunkSize, data, maxItems]
  )

  const router = useRouter()

  if (!dataGroups.length || fetchError)
    return (
      <div className="mb-4 flex flex-col gap-y-4">
        <span className="flex flex-col gap-y-2">
          <h2 className="page-title-font text-2xl">{title}</h2>
          <Separator className="bg-input" />
        </span>
        <div className="flex flex-col justify-center gap-y-2">
          <div className="mx-auto w-fit rounded-2xl p-4 text-center text-xs text-muted-foreground">
            Sorry, we currently got nothing to show for
            <h2 className="page-title-font text-base">{title}</h2> It should be
            fixed shortly, please come back later
          </div>
          <Button
            size={"label"}
            className="mx-auto w-fit active:scale-[.98]"
            onClick={() => router.refresh()}
          >
            Reload
          </Button>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          {fetchError && `Error: ${fetchError}`}
        </p>
      </div>
    )

  return (
    // mx-auto w-full max-w-full
    <div className="relative flex h-full flex-col gap-y-6">
      {/* Carousel Title */}
      <div className="flex flex-col gap-y-4">
        {/* <Separator /> */}
        <span className="flex flex-col gap-y-2">
          <h2 className="page-title-font text-2xl">{title}</h2>
          <Separator className="bg-input" />
        </span>
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
              {group.map((app, appIndex) =>
                appCardVariant === "featured" ? (
                  <AppFeaturedCard key={app.app_id} app={app} user={user} />
                ) : (
                  <AppCarouselCard
                    key={app.app_id}
                    user={user}
                    index={appIndex}
                    {...app}
                  />
                )
              )}
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
