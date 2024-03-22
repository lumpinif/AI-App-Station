"use client"

import * as React from "react"

import { Posts } from "@/types/db_tables"
import { cn } from "@/lib/utils"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"

import HeroCard from "../cards/hero-card"

type ContentCarousel = {
  data?: Posts[]
  children?: React.ReactNode
  className?: string
  isLoop?: boolean
  noMarginRight?: boolean
}

const ContentCarousel = ({
  data,
  children,
  className,
  isLoop,
  noMarginRight = false,
}: ContentCarousel) => {
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
    <div className="mx-auto h-full w-full max-w-full">
      <Carousel
        setApi={setApi}
        opts={{
          loop: isLoop ? true : false,
          align: "start",
          startIndex: 0,
          containScroll: "trimSnaps",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CarouselContent className={noMarginRight ? "" : "mr-6"}>
          {data?.map((post, index) => (
            <CarouselItem key={index} className={cn("", className)}>
              <HeroCard cardData={post as Posts} />
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
      <div className="py-2 pr-2 text-right text-sm text-muted-foreground">
        Slide {current} of {count}
      </div>
    </div>
  )
}

export default ContentCarousel
