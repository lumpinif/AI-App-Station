"use client"

import { useMemo, useState } from "react"
import { EmblaPluginType } from "embla-carousel"
import Autoplay from "embla-carousel-autoplay"
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures"

import { PostDetails } from "@/types/db_tables"
import { cn } from "@/lib/utils"
import useMediaQuery from "@/hooks/use-media-query"
import {
  Carousel,
  CarouselIndicator,
  CarouselMainContainer,
  CarouselNext,
  CarouselPrevious,
  CarouselThumbsContainer,
  SliderMainItem,
} from "@/components/ui/extended-carousel"
import { IosStylePostCard } from "@/app/(main)/stories/_components/post-carousel/ios-style-post-card"
import { PostCarouselCard } from "@/app/(main)/stories/_components/post-carousel/post-carousel-card"

import { PostCard } from "../../cards/post-card"

type PostsCarouselProps = {
  title?: string
  isLoop?: boolean
  className?: string
  posts: PostDetails[]
  isAutpPlay?: boolean
  containerCN?: string
  error?: string | null
  isIndicator?: boolean
  postCardVariant?: string
  isWheelGestures?: boolean
}

const PostsCarousel: React.FC<PostsCarouselProps> = ({
  title,
  posts,
  className,
  isAutpPlay,
  isIndicator,
  containerCN,
  isLoop = true,
  isWheelGestures,
  postCardVariant,
  error: fetchError,
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const { isMobile } = useMediaQuery()

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

  if (!posts.length)
    return (
      <div className="mb-4 flex flex-col gap-y-4">
        <div className="mx-auto w-fit rounded-2xl border p-4 text-center text-xs text-muted-foreground">
          Sorry, we currently got nothing to show for
          <h2 className="page-title-font text-base">{title}</h2> It should be
          fixed shortly, please come back later
        </div>
        <p className="text-center text-xs text-muted-foreground">
          {fetchError && `Error: ${fetchError}`}
        </p>
      </div>
    )

  return (
    <Carousel
      carouselOptions={{
        loop: isLoop,
        align: "start",
        duration: 25,
        dragThreshold: 5,
      }}
      plugins={plugins}
      onMouseEnter={() => {
        if (!isMobile) setIsHovered(true)
      }}
      onMouseLeave={() => {
        if (!isMobile) setIsHovered(false)
      }}
    >
      <div className="relative">
        <CarouselMainContainer className={cn("h-fit space-x-4", containerCN)}>
          {posts.map((post, index) => (
            <SliderMainItem
              key={index}
              className={cn("bg-transparent", className)}
            >
              <div className="relative flex size-full items-center justify-center overflow-hidden rounded-2xl bg-card">
                {/* {postCardVariant === "hero" ? (
                  <PostCard post={post} />
                ) : (
                 <PostCarouselCard post={post} /> */}

                <IosStylePostCard
                  post={post}
                  postCardVariant={postCardVariant}
                />

                {/* )} */}
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
            "right-0 z-20 size-10 h-full rounded-none from-background/80 to-transparent transition-colors duration-150 ease-out hover:bg-gradient-to-l",
            isHovered ? "" : "hidden"
          )}
        />
        <CarouselPrevious
          variant={"tag"}
          className={cn(
            "left-0 z-20 size-10 h-full rounded-none from-background/80 to-transparent transition-colors duration-150 ease-out hover:bg-gradient-to-r",
            isHovered ? "" : "hidden"
          )}
        />
      </div>
    </Carousel>
  )
}

export default PostsCarousel
