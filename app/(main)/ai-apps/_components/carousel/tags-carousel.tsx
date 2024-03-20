"use client"

import React, { useCallback, useEffect } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { motion } from "framer-motion"

import { NavItemProps, SIDENAVROUTES } from "@/config/routes"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"

const MemoizedCarouselItem = React.memo(CarouselItem)

type TagsCarouselProps = {
  currentPath: string
}

export function TagsCarousel({ currentPath }: TagsCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [scrollPrev, setScrollPrev] = React.useState(false)
  const [scrollNext, setScrollNext] = React.useState(false)

  const isActive = useCallback(
    (href: string) => currentPath === href,
    [currentPath]
  )

  // Optimization: useMemo to avoid unnecessary recalculations
  const filteredRoutes = React.useMemo(
    () => SIDENAVROUTES.find((route) => currentPath.startsWith(route.href)),
    [currentPath]
  )

  const allHref = filteredRoutes?.href || "/"

  // Use useCallback to ensure these functions don't trigger unnecessary re-renders
  const updateScrollStates = useCallback(() => {
    if (api) {
      setScrollPrev(api.canScrollPrev())
      setScrollNext(api.canScrollNext())
    }
  }, [api])

  useEffect(() => {
    if (!api) return

    // Update immediately without waiting for events
    updateScrollStates()

    // Event listeners for real-time updates
    api.on("select", updateScrollStates)
    api.on("reInit", updateScrollStates)

    // Cleanup
    return () => {
      api.off("select", updateScrollStates)
      api.off("reInit", updateScrollStates)
    }
  }, [api, updateScrollStates])

  // Conditional rendering moved to the end.
  // Early return if no filteredRoutes are found
  if (!filteredRoutes) {
    return (
      <div>No matching route found for the current path: {currentPath}</div>
    )
  }

  const renderLink = (item: NavItemProps | "All") => {
    const isAllActive = item === "All"
    const href = isAllActive ? allHref : item.href
    const title = isAllActive ? "All" : item.title
    const active = isActive(href)
    return (
      <MemoizedCarouselItem
        key={href}
        className="basis-auto pl-2 first:pl-5 last:pr-1"
      >
        {active ? (
          <motion.div
            className={cn(
              buttonVariants({
                variant: "tag",
                size: "sm",
                className:
                  "relative rounded-full transition-colors duration-300 select-none",
              })
            )}
            initial={{ color: "hsl(var(--muted-foreground))" }}
            animate={{ color: "hsl(var(--primary-foreground))" }}
          >
            <motion.span
              layoutId="bubble"
              className={cn(
                buttonVariants({
                  variant: "default",
                  size: "sm",
                  className: "rounded-full absolute inset-0 -z-10",
                })
              )}
              transition={{
                type: "spring",
                bounce: 0.2,
                duration: 0.35,
                ease: [0.32, 0.72, 0, 1],
              }}
            />
            {title}
          </motion.div>
        ) : (
          <Link
            key={href}
            href={href}
            className={cn(
              buttonVariants({
                variant: "ghost",
                size: "sm",
                className: "rounded-full text-muted-foreground",
              })
            )}
          >
            {title}
          </Link>
        )}
      </MemoizedCarouselItem>
    )
  }

  return (
    <div className="flex items-center gap-4">
      <div className="-ml-1 grow overflow-hidden transition-all duration-300 ease-linear sm:hidden">
        <Carousel
          opts={{
            duration: 20,
            containScroll: "trimSnaps",
            align: "start",
            slidesToScroll: "auto",
          }}
          setApi={setApi}
          className="py-3 transition-all duration-300 ease-in-out"
        >
          <CarouselContent className="relative">
            {renderLink("All")}
            {filteredRoutes?.items.map((item) => renderLink(item))}
          </CarouselContent>

          <CarouselPrevious
            variant="ghost"
            className={cn(
              "ml-12 size-8 bg-background/20 backdrop-blur-[1px]",
              scrollPrev ? "" : "hidden"
            )}
          />
          <CarouselNext
            variant="ghost"
            className={cn(
              "mr-12 size-8 bg-background/20 backdrop-blur-[1px]",
              scrollNext ? "" : "hidden"
            )}
          />
        </Carousel>
      </div>
    </div>
  )
}
