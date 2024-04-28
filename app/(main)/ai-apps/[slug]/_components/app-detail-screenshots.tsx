"use client"

import React from "react"
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures"
import { ImageIcon } from "lucide-react"

import { AppDetailScreenShotsProps } from "@/types/db_tables"
import { cn } from "@/lib/utils"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { AppDetailScreenshotsDialog } from "./app-detail-screenshots-dialog"

export const AppDetailScreenshots: React.FC<AppDetailScreenShotsProps> = ({
  screenshotsPublicUrls,
}) => {
  const [isHovered, setIsHovered] = React.useState(false)

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-semibold tracking-wide">Screenshots</h2>
      <div className="relative mx-auto h-full w-full max-w-full">
        <Carousel
          opts={{
            align: "start",
            duration: 25,
            dragThreshold: 5,
          }}
          plugins={[WheelGesturesPlugin({})]}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <CarouselContent className="mr-6 h-fit">
            {screenshotsPublicUrls && screenshotsPublicUrls.length > 0
              ? screenshotsPublicUrls.map((item, index) => (
                  <CarouselItem
                    key={index}
                    className="bg-transparent md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="relative flex size-full items-center justify-center overflow-hidden rounded-2xl bg-card">
                      <AppDetailScreenshotsDialog
                        index={index}
                        screenshotsPublicUrls={screenshotsPublicUrls}
                        screenshot_url={
                          typeof item === "string" ? item : undefined
                        }
                      />
                    </div>
                  </CarouselItem>
                ))
              : Array.from({ length: 6 }).map((_, index) => (
                  <CarouselItem
                    key={index}
                    className="bg-transparent md:basis-1/2 lg:basis-1/3"
                  >
                    <AspectRatio ratio={16 / 9}>
                      <div className="relative flex size-full items-center justify-center overflow-hidden rounded-2xl bg-card">
                        <ImageIcon className="size-3/4 stroke-muted stroke-[1.5px] opacity-50 transition-opacity duration-300 ease-out group-hover:opacity-100 " />
                      </div>
                    </AspectRatio>
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
      </div>
    </div>
  )
}
