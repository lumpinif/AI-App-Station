"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { CarouselItem } from "@/components/ui/carousel"

import HeroCard from "../cards/hero-card"
import ContentCarouselWrapper from "./content-carousel-wrapper"

type HeroCarouselProps = {
  data: any[]
  className?: string
  isMarginRight?: boolean
  isLoop?: boolean
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  data,
  className,
  isMarginRight,
  isLoop,
}) => {
  return (
    <ContentCarouselWrapper
      isMarginRight={isMarginRight}
      isLoop={isLoop}
      isAutoPlay={true}
      isDotButtons={true}
    >
      {data?.map((post, index) => (
        <CarouselItem key={index} className={cn("", className)}>
          <HeroCard
            label={post.label}
            title={post.title}
            description={post.description}
            image={post.image}
          />
        </CarouselItem>
      ))}
    </ContentCarouselWrapper>
  )
}
