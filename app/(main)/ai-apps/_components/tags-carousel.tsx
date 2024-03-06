"use client"

import React, { Suspense } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { SIDENAVROUTES } from "@/config/routes"
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

export function TagsCarousel() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [scrollPrev, setScrollPrev] = React.useState(false)
  const [scrollNext, setScrollNext] = React.useState(true)
  const pathname = usePathname()

  const filteredRoutes = React.useMemo(
    () => SIDENAVROUTES.filter((route) => pathname.includes(`${route.href}`)),
    [pathname]
  )

  React.useEffect(() => {
    if (!api) {
      return
    }

    api.on("select", () => {
      // add duration for hiding arrows after carousel slide animation
      setTimeout(() => {
        setScrollPrev(api.canScrollPrev())
        setScrollNext(api.canScrollNext())
      }, 500)
    })
  }, [api])

  return (
    <Suspense fallback={<div>Loading...</div>}>
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
          {/* All button */}
          <CarouselItem className="basis-auto pl-2 first:pl-5 last:pr-1">
            {filteredRoutes &&
              filteredRoutes.map((route) => (
                <Suspense fallback={<div>Loading...</div>}>
                  <Link
                    href={`${route.href}`}
                    className={cn(
                      buttonVariants({
                        variant: "default",
                        size: "sm",
                        className: "rounded-full",
                      })
                    )}
                  >
                    All
                  </Link>
                </Suspense>
              ))}
          </CarouselItem>

          {/* Tags buttons */}
          {filteredRoutes &&
            filteredRoutes.map((route) => (
              <>
                {route.items?.map((item) => (
                  <MemoizedCarouselItem
                    key={item.href}
                    className="basis-auto pl-2 first:pl-5 last:pr-1"
                  >
                    {item.href === pathname ? (
                      <Suspense fallback={<div>Loading...</div>}>
                        <Link
                          href={`${item.href}`}
                          className={cn(
                            buttonVariants({
                              variant: "default",
                              size: "sm",
                              className: "rounded-full",
                            })
                          )}
                        >
                          {item.title}
                        </Link>
                      </Suspense>
                    ) : (
                      <Suspense fallback={<div>Loading...</div>}>
                        <Link
                          href={`${item.href}`}
                          className={cn(
                            buttonVariants({
                              variant: "outline",
                              size: "sm",
                              className: "rounded-full",
                            })
                          )}
                        >
                          {item.title}
                        </Link>
                      </Suspense>
                    )}
                  </MemoizedCarouselItem>
                ))}
              </>
            ))}
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
    </Suspense>
  )
}
