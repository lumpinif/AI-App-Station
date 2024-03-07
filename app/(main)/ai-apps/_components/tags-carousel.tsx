"use client"

import React, { Suspense } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

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
  const isActive = (href: string) => pathname === href

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
            {/* All button */}
            <CarouselItem className="basis-auto pl-2 first:pl-5 last:pr-1">
              {filteredRoutes &&
                filteredRoutes.map((route) => (
                  <>
                    {isActive(`${route.href}`) ? (
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
                    ) : (
                      <Link
                        href={`${route.href}`}
                        className={cn(
                          buttonVariants({
                            variant: "ghost",
                            size: "sm",
                            className: "rounded-full text-muted-foreground",
                          })
                        )}
                      >
                        All
                      </Link>
                    )}
                  </>
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
                      {isActive(`${item.href}`) ? (
                        <motion.div
                          className={cn(
                            buttonVariants({
                              variant: "tag",
                              size: "sm",
                              className:
                                "relative rounded-full transition-colors duration-300",
                            })
                          )}
                          initial={{ color: "hsl(var(--muted-foreground))" }}
                          animate={{
                            color: [
                              "hsl(var(--muted-foreground))",
                              "hsl(var(--primary-foreground))",
                            ],
                          }}
                        >
                          {isActive(`${item.href}`) && (
                            <motion.span
                              layoutId="bubble"
                              className={cn(
                                buttonVariants({
                                  variant: "default",
                                  size: "sm",
                                  className:
                                    "rounded-full absolute inset-0 -z-10",
                                })
                              )}
                              transition={{
                                type: "spring",
                                bounce: 0.2,
                                duration: 0.35,
                                ease: [0.32, 0.72, 0, 1],
                              }}
                            />
                          )}
                          {item.title}
                        </motion.div>
                      ) : (
                        <Link
                          href={`${item.href}`}
                          className={cn(
                            buttonVariants({
                              variant: "ghost",
                              size: "sm",
                              className: "rounded-full text-muted-foreground",
                            })
                          )}
                        >
                          {item.title}
                        </Link>
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
      </div>
    </div>
  )
}
