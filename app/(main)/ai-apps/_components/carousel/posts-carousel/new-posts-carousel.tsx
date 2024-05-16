"use client"

import { useMemo, useState } from "react"
import { EmblaPluginType } from "embla-carousel"
import Autoplay from "embla-carousel-autoplay"
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures"

import { PostWithProfile } from "@/types/db_tables"
import { cn } from "@/lib/utils"
import {
  Carousel,
  CarouselIndicator,
  CarouselMainContainer,
  CarouselNext,
  CarouselPrevious,
  CarouselThumbsContainer,
  SliderMainItem,
} from "@/components/ui/extended-carousel"

import { PostCard } from "../../cards/new-post-card"

type PostsCarouselProps = {
  posts: PostWithProfile[]
  className?: string
  isAutpPlay?: boolean
  isWheelGestures?: boolean
  isIndicator?: boolean
}

const NewPostsCarousel: React.FC<PostsCarouselProps> = ({
  posts,
  className,
  isWheelGestures,
  isAutpPlay,
  isIndicator,
}) => {
  const [isHovered, setIsHovered] = useState(false)

  const PLUGIN_AUTOPLAY: EmblaPluginType = Autoplay({
    playOnInit: true,
    delay: 5000,
  })
  const PLUGIN_WHEELGESTURES = WheelGesturesPlugin({})

  const plugins = useMemo(() => {
    const activePlugins: EmblaPluginType[] = []
    if (isAutpPlay) activePlugins.push(PLUGIN_AUTOPLAY)
    if (isWheelGestures) activePlugins.push(PLUGIN_WHEELGESTURES)
    return activePlugins
  }, [PLUGIN_AUTOPLAY, PLUGIN_WHEELGESTURES, isAutpPlay, isWheelGestures])

  return (
    <Carousel
      carouselOptions={{
        loop: true,
        align: "start",
        duration: 25,
        dragThreshold: 5,
      }}
      plugins={plugins}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <CarouselMainContainer className="h-96 space-x-4">
          {posts.map((post, index) => (
            <SliderMainItem
              key={index}
              className={cn("bg-transparent", className)}
            >
              <div className="bg-card relative flex size-full items-center justify-center rounded-2xl">
                <PostCard
                  post={post}
                  // post_image_src={`https://picsum.photos/600/350?v=${index}`}
                />
              </div>
            </SliderMainItem>
          ))}
        </CarouselMainContainer>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
          <CarouselThumbsContainer className="gap-x-2">
            {isIndicator &&
              Array.from({ length: posts.length }).map((_, index) => (
                <CarouselIndicator key={index} index={index} />
              ))}
          </CarouselThumbsContainer>
        </div>
        <CarouselNext
          variant={"tag"}
          className={cn(
            "from-background/80 right-0 z-20 size-10 h-full rounded-none to-transparent transition-colors duration-150 ease-out hover:bg-gradient-to-l",
            isHovered ? "" : "hidden"
          )}
        />
        <CarouselPrevious
          variant={"tag"}
          className={cn(
            "from-background/80 left-0 z-20 size-10 h-full rounded-none to-transparent transition-colors duration-150 ease-out hover:bg-gradient-to-r",
            isHovered ? "" : "hidden"
          )}
        />
      </div>
    </Carousel>
  )
}

export default NewPostsCarousel
