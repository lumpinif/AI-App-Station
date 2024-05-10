"use client"

import Image from "next/image"

import { cn } from "@/lib/utils"
import useMediaQuery from "@/hooks/use-media-query"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import {
  Carousel,
  CarouselMainContainer,
  CarouselNext,
  CarouselPrevious,
  CarouselThumbsContainer,
  SliderMainItem,
  SliderThumbItem,
} from "@/components/ui/extended-carousel"
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
  ResponsiveModalTrigger,
} from "@/components/ui/responsive-modal"
import { EnhancedDrawerClose } from "@/components/shared/enhanced-drawer"

type AppDetailScreenshotsDialogProps = {
  screenshot_url?: string
  screenshotsPublicUrls?: string[]
  index?: number
}

export const AppDetailScreenshotsDialog: React.FC<
  AppDetailScreenshotsDialogProps
> = ({ screenshotsPublicUrls, screenshot_url, index }) => {
  const { isDesktop } = useMediaQuery()

  return (
    <ResponsiveModal>
      <ResponsiveModalTrigger
        className="hover:cursor-grab active:cursor-grabbing"
        asChild
      >
        <AspectRatio ratio={16 / 9}>
          <Image
            src={
              screenshot_url ? screenshot_url : `/images/image-not-found.png`
            }
            fill
            alt=""
            className="rounded-md object-cover"
            style={{ objectFit: "cover" }}
          />
        </AspectRatio>
      </ResponsiveModalTrigger>
      <ResponsiveModalContent
        className={cn(
          "flex flex-col justify-start rounded-t-3xl p-4 outline-none focus:!ring-0 focus:!ring-transparent lg:max-w-4xl xl:max-w-6xl 2xl:max-w-[90rem]",
          isDesktop && "shadow-outline p-8"
        )}
      >
        <EnhancedDrawerClose
          title="More Screenshots"
          className={cn(isDesktop && "hidden")}
        />
        <ResponsiveModalHeader
          className={cn("hidden h-fit", isDesktop && "block")}
        >
          <ResponsiveModalTitle>
            <span>More Screenshots</span>
          </ResponsiveModalTitle>
          <ResponsiveModalDescription>
            <p>Checking more screenshots of this app</p>
          </ResponsiveModalDescription>
        </ResponsiveModalHeader>
        {/* Carousel */}
        <div className="my-4 w-full flex-1">
          <Carousel
            orientation="horizontal"
            carouselOptions={{
              startIndex: index,
              dragThreshold: 5,
              duration: 25,
            }}
            className="h-full"
          >
            <CarouselPrevious className="bg-background/30 left-2  top-1/3 size-8 border-0 outline-none md:left-2 md:top-1/2 md:size-12" />
            <CarouselNext className="bg-background/30 right-2 top-1/3 size-8 border-0 outline-none md:right-2 md:top-1/2 md:size-12" />

            <CarouselMainContainer className={cn("relative")}>
              {screenshotsPublicUrls &&
                screenshotsPublicUrls.length > 0 &&
                screenshotsPublicUrls.map((screenshot_url, index) => (
                  <SliderMainItem key={index} className={cn("py-auto h-fit")}>
                    <AspectRatio ratio={16 / 9}>
                      <Image
                        src={
                          screenshot_url
                            ? screenshot_url
                            : `/images/image-not-found.png`
                        }
                        fill
                        alt={screenshot_url}
                        style={{ objectFit: "cover" }}
                        className="rounded-md object-cover"
                        data-vaul-no-drag
                      />
                    </AspectRatio>
                  </SliderMainItem>
                ))}
            </CarouselMainContainer>

            <CarouselThumbsContainer className={cn("relative")}>
              {screenshotsPublicUrls &&
                screenshotsPublicUrls.length > 0 &&
                screenshotsPublicUrls.map((screenshot_url, index) => (
                  <SliderThumbItem
                    key={index}
                    index={index}
                    className="py-auto h-fit"
                  >
                    <div className="bg-background relative flex size-full items-center justify-center overflow-hidden rounded-xl">
                      <AspectRatio ratio={16 / 9}>
                        <Image
                          src={
                            screenshot_url
                              ? screenshot_url
                              : `/images/image-not-found.png`
                          }
                          fill
                          alt={screenshot_url}
                          className="rounded-md object-cover"
                          style={{ objectFit: "cover" }}
                          data-vaul-no-drag
                        />
                      </AspectRatio>
                    </div>
                  </SliderThumbItem>
                ))}
            </CarouselThumbsContainer>
          </Carousel>
        </div>
      </ResponsiveModalContent>
    </ResponsiveModal>
  )
}
