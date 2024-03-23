"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures"
import { Pause, Play } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"

type ContentCarouselWrapperProps = {
  children?: React.ReactNode
  isLoop?: boolean
  isMarginRight?: boolean
  isAutoPlay?: boolean
}

const ContentCarouselWrapper: React.FC<ContentCarouselWrapperProps> = ({
  children,
  isLoop = false,
  isMarginRight = true,
  isAutoPlay = false,
}) => {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)
  const [isHovered, setIsHovered] = React.useState(false)
  const [isPlaying, setIsPlaying] = React.useState(false)

  // TODO: remove this before ship
  // this is to check if the carousel can scroll
  // const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  // const [canScrollNext, setCanScrollNext] = React.useState(false)

  // const updateScrollButtons = React.useCallback(() => {
  //   if (!api) return

  //   setCanScrollPrev(api.canScrollPrev())
  //   setCanScrollNext(api.canScrollNext())
  // }, [api])

  // Toggle auto play
  const toggleAutoplay = React.useCallback(() => {
    const autoplay = api?.plugins()?.autoplay
    if (!autoplay) return

    const playOrStop = autoplay.isPlaying() ? autoplay.stop : autoplay.play
    playOrStop()
  }, [api])

  React.useEffect(() => {
    if (!api) {
      return
    }
    // Initialize Carousel state and bindings
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)
    // updateScrollButtons() // Call it here to set initial state

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap() + 1)
      // updateScrollButtons() // Update button states on each select event
    }

    api.on("select", onSelect)

    // Autoplay feature handling
    const autoplay = api?.plugins()?.autoplay

    if (!autoplay) return

    setIsPlaying(autoplay.isPlaying())
    api
      .on("autoplay:play", () => setIsPlaying(true))
      .on("autoplay:stop", () => setIsPlaying(false))
      .on("reInit", () => setIsPlaying(false))

    // Cleanup function
    return () => {
      api.off("select", onSelect)
    }
  }, [api])

  React.useEffect(() => {
    const autoplay = api?.plugins()?.autoplay
    if (!autoplay) return

    setIsPlaying(autoplay.isPlaying())
    api
      .on("autoplay:play", () => setIsPlaying(true))
      .on("autoplay:stop", () => setIsPlaying(false))
      .on("reInit", () => setIsPlaying(false))
  }, [api])

  return (
    <div className="relative mx-auto h-full w-full max-w-full">
      <Carousel
        setApi={setApi}
        opts={{
          loop: isLoop ? true : false,
          align: "start",
          startIndex: 0,
          containScroll: "trimSnaps",
          duration: 25,
        }}
        plugins={
          isAutoPlay
            ? [
                Autoplay({
                  playOnInit: true,
                  stopOnInteraction: true,
                  delay: 3500,
                }),
                WheelGesturesPlugin({
                  forceWheelAxis: "x",
                }),
              ]
            : [WheelGesturesPlugin()]
        }
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CarouselContent className={isMarginRight ? "mr-6" : ""}>
          {children}
        </CarouselContent>
        <CarouselPrevious
          variant={"tag"}
          className={cn(
            "left-0 size-10 h-full rounded-none from-black/30 to-transparent transition-colors duration-150 ease-out hover:bg-gradient-to-r",
            isHovered ? "" : "hidden"
          )}
        />
        <CarouselNext
          variant={"tag"}
          className={cn(
            "right-0 size-10 h-full rounded-none from-black/30 to-transparent transition-colors duration-150 ease-out hover:bg-gradient-to-l",
            isHovered ? "" : "hidden"
          )}
        />
      </Carousel>
      <div
        className={cn(
          "absolute bottom-2 right-2 z-30 flex  items-center justify-end rounded-full p-1 text-sm text-muted-foreground"
        )}
      >
        {isAutoPlay && (
          <Button
            size={"icon"}
            className="h-fit w-fit rounded-full p-2 shadow-outline hover:bg-card hover:text-primary"
            onClick={toggleAutoplay}
            variant={"tag"}
          >
            <span className="flex items-center justify-center rounded-full">
              {isPlaying ? (
                <Pause strokeWidth={1.5} size={14} />
              ) : (
                <Play strokeWidth={1.5} size={14} />
              )}
            </span>
          </Button>
        )}
      </div>
    </div>
  )
}

export default ContentCarouselWrapper
