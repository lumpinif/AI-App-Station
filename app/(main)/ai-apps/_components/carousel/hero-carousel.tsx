"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"

const HeroCarousel = () => {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)
  // const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  // const [canScrollNext, setCanScrollNext] = React.useState(false)
  const [isHovered, setIsHovered] = React.useState(false)

  // const updateScrollButtons = React.useCallback(() => {
  //   if (!api) return

  //   setCanScrollPrev(api.canScrollPrev())
  //   setCanScrollNext(api.canScrollNext())
  // }, [api])

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)
    // updateScrollButtons() // Call it here to set initial state

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap() + 1)
      // updateScrollButtons() // Update button states on each select event
    }

    api.on("select", onSelect)

    return () => {
      api.off("select", onSelect)
    }
  }, [api])

  return (
    <div className="flex w-full flex-col items-center">
      <Carousel
        setApi={setApi}
        opts={{
          loop: true,
          align: "center",
          startIndex: 0,
          containScroll: "trimSnaps",
        }}
        className="w-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className="flex items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          variant={"ghost"}
          className={cn(
            "left-1  size-10 transition-all duration-200 ease-out",
            isHovered ? "" : "hidden"
          )}
        />
        <CarouselNext
          variant={"ghost"}
          className={cn(
            "right-1 size-10 transition-all duration-200 ease-out",
            isHovered ? "" : "hidden"
          )}
        />
      </Carousel>
      <div className="w-full py-2 pr-2 text-right text-sm text-muted-foreground">
        Slide {current} of {count}
      </div>
    </div>
  )
}

export default HeroCarousel
