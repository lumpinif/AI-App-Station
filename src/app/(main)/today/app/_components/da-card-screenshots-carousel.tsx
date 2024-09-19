"use client"

import React from "react"
import Image from "next/image"
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures"
import { ImageIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

type DAScreenshotsCarouselProps = {
  app_id: string
  screenshotsPublicUrls?: string[]
}

export const DAScreenshotsCarousel: React.FC<DAScreenshotsCarouselProps> = ({
  app_id,
  screenshotsPublicUrls,
}) => {
  const [isHovered, setIsHovered] = React.useState(false)

  return (
    // <motion.div
    //   className="relative h-full"
    //   layoutId={`da-card-image-${app_id}`}
    // >
    <Carousel
      opts={{
        align: "start",
        duration: 25,
        dragThreshold: 5,
      }}
      className="h-full"
      // plugins={[WheelGesturesPlugin({})]}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CarouselContent className="h-full" carouselContentCN="h-full">
        {screenshotsPublicUrls && screenshotsPublicUrls.length > 0
          ? screenshotsPublicUrls.map((item, index) => (
              <CarouselItem key={index} className="relative h-full">
                <Image
                  fill
                  alt="daily app thumbnail image"
                  src={item ? item : `/images/image-not-found.png`}
                  className="pointer-events-none z-50 h-full w-full bg-background object-cover brightness-[.85]"
                />
              </CarouselItem>
            ))
          : Array.from({ length: 6 }).map((_, index) => (
              <CarouselItem key={index} className="h-full">
                <div className="relative flex size-full items-center justify-center overflow-hidden rounded-2xl bg-card">
                  <ImageIcon className="size-3/4 stroke-muted stroke-[1.5px] opacity-50 transition-opacity duration-300 ease-out group-hover:opacity-100" />
                </div>
              </CarouselItem>
            ))}
      </CarouselContent>
      <CarouselPrevious
        hiddenOnCanNotScroll
        variant={"tag"}
        className={cn(
          "left-0 size-10 h-full rounded-none from-background/80 to-transparent transition-colors duration-150 ease-out hover:bg-gradient-to-r",
          isHovered ? "" : "hidden"
        )}
      />
      <CarouselNext
        hiddenOnCanNotScroll
        variant={"tag"}
        className={cn(
          "right-0 size-10 h-full rounded-none from-background/80 to-transparent transition-colors duration-150 ease-out hover:bg-gradient-to-l",
          isHovered ? "" : "hidden"
        )}
      />
    </Carousel>
    // </motion.div>
  )
}
