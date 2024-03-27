"use client"

import React, { Suspense, useMemo } from "react"
import { EmblaOptionsType, EmblaPluginType } from "embla-carousel"
import Autoplay from "embla-carousel-autoplay"
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures"

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

type PostsCarouselProps = {
  data: Post[]
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
const PLUGIN_WHEELGESTURES = WheelGesturesPlugin({})

const PostsCarousel: React.FC<PostsCarouselProps> = ({
  data,
  className,
  options,
  isAutpPlay = false,
  isMarginRight = false,
  isWheelGestures = true,
}) => {
  const [isHovered, setIsHovered] = React.useState(false)

  const plugins = useMemo(() => {
    const activePlugins: EmblaPluginType[] = []
    if (isAutpPlay) activePlugins.push(PLUGIN_AUTOPLAY)
    if (isWheelGestures) activePlugins.push(PLUGIN_WHEELGESTURES)
    return activePlugins
  }, [isAutpPlay, isWheelGestures])

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
            {data.map((post, index) => (
              <CarouselItem key={index} className={cn("", className)}>
                <PostCard key={post.id} {...post} />
              </CarouselItem>
            ))}
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

export default PostsCarousel
