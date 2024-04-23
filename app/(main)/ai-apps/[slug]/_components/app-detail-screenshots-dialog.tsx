"use client"

import Image from "next/image"

import { cn } from "@/lib/utils"
import useMediaQuery from "@/hooks/use-media-query"
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

import { ImageElement } from "../../_components/cards/new-post-card"

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
      <ResponsiveModalTrigger className="hover:cursor-grab active:cursor-grabbing">
        <Image
          src={screenshot_url ? screenshot_url : `/images/image-not-found.png`}
          fill
          alt=""
          objectFit="cover"
          style={{ objectFit: "cover" }}
        />
      </ResponsiveModalTrigger>
      <ResponsiveModalContent
        className={cn(
          "flex h-[95%] flex-col justify-start rounded-t-3xl p-4 outline-none focus:!ring-0 focus:!ring-transparent lg:h-fit lg:max-w-[85%]",
          isDesktop && "p-8 shadow-outline"
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
            <h1>More Screenshots</h1>
          </ResponsiveModalTitle>
          <ResponsiveModalDescription>
            <p>Checking more screenshots of this app</p>
          </ResponsiveModalDescription>
        </ResponsiveModalHeader>
        {/* Carousel */}
        <div className="h-fit w-full flex-1 overflow-hidden">
          <Carousel
            orientation="horizontal"
            carouselOptions={{ startIndex: index }}
          >
            <CarouselPrevious className="left-1 size-8 border-0 outline-none hover:bg-background/70 md:left-2 md:size-12" />
            <CarouselNext className="right-1 size-8 border-0 outline-none hover:bg-background/70 md:right-2 md:size-12" />
            <CarouselMainContainer
              className={cn(
                "h-[calc(70svh)]",
                isDesktop && "lg:h-[calc(60svh)] xl:h-[calc(75svh)]"
              )}
            >
              {screenshotsPublicUrls &&
                screenshotsPublicUrls.length > 0 &&
                screenshotsPublicUrls.map((screenshot_url, index) => (
                  <SliderMainItem
                    key={index}
                    className={cn(
                      "h-[calc(77svh)] bg-transparent",
                      isDesktop && "h-[calc(60svh)] xl:h-[calc(75svh)]"
                    )}
                  >
                    <div className="relative flex size-full items-center justify-center overflow-hidden rounded-xl bg-background">
                      <Image
                        src={
                          screenshot_url
                            ? screenshot_url
                            : `/images/image-not-found.png`
                        }
                        fill
                        alt=""
                        objectFit="cover"
                        style={{ objectFit: "cover" }}
                        data-vaul-no-drag
                      />
                    </div>
                  </SliderMainItem>
                ))}
            </CarouselMainContainer>

            <CarouselThumbsContainer>
              {screenshotsPublicUrls &&
                screenshotsPublicUrls.length > 0 &&
                screenshotsPublicUrls.map((screenshot_url, index) => (
                  <SliderThumbItem
                    key={index}
                    index={index}
                    className="bg-transparent"
                  >
                    <div className="relative flex size-full items-center justify-center overflow-hidden rounded-xl bg-background">
                      <Image
                        src={
                          screenshot_url
                            ? screenshot_url
                            : `/images/image-not-found.png`
                        }
                        fill
                        alt=""
                        objectFit="cover"
                        style={{ objectFit: "cover" }}
                        data-vaul-no-drag
                      />
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
