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

export type ContentCarouselProviderProps = {
  children: React.ReactNode
  isLoop?: boolean
  isMarginRight?: boolean
  isAutoPlay?: boolean
  isDotButtons?: boolean
}

const ContentCarouselProvider: React.FC<ContentCarouselProviderProps> = ({
  children,
  isLoop = false,
  isMarginRight = true,
  isAutoPlay = false,
  isDotButtons = false,
}) => {
  const [api, setApi] = React.useState<CarouselApi>()
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([])
  const [isHovered, setIsHovered] = React.useState(false)
  const [isPlaying, setIsPlaying] = React.useState(false)

  // Toggle auto play
  const toggleAutoplay = React.useCallback(() => {
    const autoplay = api?.plugins()?.autoplay
    if (!autoplay) return

    const playOrStop = autoplay.isPlaying() ? autoplay.stop : autoplay.play
    playOrStop()
  }, [api])

  // onDotButtonClick
  const onDotButtonClick = React.useCallback(
    (index: number) => {
      if (!api) return
      api.scrollTo(index)
    },
    [api]
  )

  const onInit = React.useCallback((api: CarouselApi) => {
    if (!api) {
      return
    }
    setScrollSnaps(api.scrollSnapList())
  }, [])

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) {
      return
    }
    setSelectedIndex(api.selectedScrollSnap())
  }, [])

  React.useEffect(() => {
    if (!api) {
      return
    }
    // Initialize Carousel state and bindings
    onInit(api)
    onSelect(api)

    // Consolidate event listeners for reInit.
    const handleReInit = () => {
      onInit(api)
      onSelect(api)
      setIsPlaying(false) // Reset autoplay state on reInit.
    }

    // Subscribe to carousel events
    api.on("select", onSelect)
    api.on("reInit", handleReInit)

    // Autoplay feature handling
    const autoplay = api?.plugins()?.autoplay

    if (!autoplay) return

    setIsPlaying(autoplay.isPlaying())
    api
      .on("autoplay:play", () => setIsPlaying(true))
      .on("autoplay:stop", () => setIsPlaying(false))

    // Cleanup function
    return () => {
      api.off("select", onSelect)
      api.off("reInit", handleReInit)
    }
  }, [api, onInit, onSelect])

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
          "absolute bottom-2 z-30 flex w-full items-center justify-end rounded-full p-1 px-4 text-sm text-muted-foreground sm:justify-between"
        )}
      >
        {/* Dot Buttons */}
        {isDotButtons && scrollSnaps.length > 1 && (
          <div className="hidden items-center gap-x-1 sm:flex ">
            {scrollSnaps.map((_, index) => (
              <Button
                variant={"tag"}
                size={"icon"}
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={cn(
                  "h-2 w-2 rounded-full shadow-outline backdrop-blur-lg",
                  index === selectedIndex ? " bg-white" : "hover:bg-white/30"
                )}
              />
            ))}
          </div>
        )}

        {/* AutoPlay Controller */}
        {isAutoPlay && (
          <Button
            size={"icon"}
            className="h-fit w-fit rounded-full p-2 shadow-outline backdrop-blur-lg hover:bg-white/30 hover:text-primary"
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

export default ContentCarouselProvider
