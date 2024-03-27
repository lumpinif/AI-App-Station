"use client"

import React, { useCallback } from "react"
import Link from "next/link"
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
} from "@/components/ui/carousel"

const MemoizedCarouselItem = React.memo(CarouselItem)

type TagsCarouselProps = {
  currentPath: string
}

export function TagsCarousel({ currentPath }: TagsCarouselProps) {
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

  // Early return if no filteredRoutes are found
  if (!filteredRoutes) {
    return null
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
              layout
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
                bounce: 0.1,
                duration: 0.15,
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
            align: "start",
            slidesToScroll: "auto",
          }}
          className="py-3 transition-all duration-300 ease-in-out"
        >
          <CarouselContent className="relative">
            {renderLink("All")}
            {filteredRoutes?.items.map((item) => renderLink(item))}
          </CarouselContent>

          <CarouselPrevious
            hiddenOnCanNotScroll
            variant="ghost"
            className={cn("ml-12 size-8 bg-background/20 backdrop-blur-[1px]")}
          />
          <CarouselNext
            hiddenOnCanNotScroll
            variant="ghost"
            className={cn("mr-12 size-8 bg-background/20 backdrop-blur-[1px]")}
          />
        </Carousel>
      </div>
    </div>
  )
}
