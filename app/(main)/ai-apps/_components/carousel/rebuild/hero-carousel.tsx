"use client"

import React from "react"
import { EmblaOptionsType, EmblaPluginType } from "embla-carousel"
import Autoplay from "embla-carousel-autoplay"

import { Post } from "@/types/db_tables"
import { cn } from "@/lib/utils"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import PostCard from "../../cards/post-card"

type HeroCarouselProps = {
  data: Post[]
  className?: string
  isMarginRight?: boolean
  options: EmblaOptionsType
  isAutpPlay?: boolean
  isWheelGestures?: boolean
}

const PLUGIN_AUTOPLAY: EmblaPluginType = Autoplay({
  playOnInit: true,
  delay: 4500,
})

const HeroCarousel: React.FC<HeroCarouselProps> = ({
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

  return (
    <div className="relative mx-auto h-full w-full max-w-full">
      <Carousel
        opts={options}
        plugins={plugins}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CarouselContent className={isMarginRight ? "mr-6" : ""}>
          {data.map((post, index) => (
            <CarouselItem key={index} className={cn("", className)}>
              <div className="p-1">
                <PostCard
                  key={index}
                  image_src={post.image_src}
                  description={post.description}
                  label={post.label}
                  title={post.title}
                  slug={post.slug}
                />
              </div>
            </CarouselItem>
          ))}
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
    </div>
  )
}

export default HeroCarousel
