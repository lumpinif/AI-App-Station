import * as React from "react"

import { Post } from "@/types/db_tables"
import { cn } from "@/lib/utils"
import { CarouselItem } from "@/components/ui/carousel"

import PostCard from "../../cards/_post-card"
import ContentCarouselProvider, {
  ContentCarouselProviderProps,
} from "./content-carousel-provider"

interface HeroCarouselProps
  extends Omit<ContentCarouselProviderProps, "children"> {
  data: Post[]
  className?: string
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  data,
  className,
  isMarginRight,
  isLoop,
  isAutoPlay,
  isDotButtons,
}) => {
  return (
    <ContentCarouselProvider
      isMarginRight={isMarginRight}
      isLoop={isLoop}
      isAutoPlay={isAutoPlay}
      isDotButtons={isDotButtons}
    >
      {data?.map((post, index) => (
        <CarouselItem key={index} className={cn("", className)}>
          <PostCard
            key={index}
            label={post.label}
            title={post.title}
            description={post.description}
            image_src={post.image_src}
            slug={post.slug}
          />
        </CarouselItem>
      ))}
    </ContentCarouselProvider>
  )
}
