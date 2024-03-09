"use client"

import React from "react"
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
  const [scrollNext, setScrollNext] = React.useState(true)

  const isActive = React.useCallback(
    (href: string) => currentPath === href,
    [currentPath]
  )

  // Attempt to find the relevant route, with fallback handling for unexpected paths
  const filteredRoutes = React.useMemo(() => {
    const route = SIDENAVROUTES.find((route) =>
      currentPath.startsWith(route.href)
    )
    if (!route) {
      // Log the issue or handle the error as appropriate for your application
      console.error(
        "No matching route found for the current path:",
        currentPath
      )
    }
    return route
  }, [currentPath])

  // Use `filteredRoutes.href` for the "All" link's href
  const allHref = filteredRoutes ? filteredRoutes.href : "/"

  React.useEffect(() => {
    if (!api) {
      return
    }

    const checkScroll = () => {
      setScrollPrev(api.canScrollPrev())
      setScrollNext(api.canScrollNext())
    }

    // Immediately check scroll availability on component mount
    checkScroll()

    api.on("select", () => {
      setTimeout(checkScroll, 500) // Adjust based on your animation duration
    })

    return () => {
      api.off("select", checkScroll)
    }
  }, [api])

  // Fallback content if no filteredRoutes are found
  if (!filteredRoutes) {
    return notFound()
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
