"use client"

import { cn } from "@/lib/utils"
import BackButton from "@/components/shared/back-button"

import { ImageElement } from "../../_components/cards/new-post-card"

type AppDetailHeroImageProps = { className?: string }

export const AppDetailHeroImage: React.FC<AppDetailHeroImageProps> = ({
  className,
}) => {
  return (
    <header
      className={cn(
        "absolute top-0 -ml-4 h-48 w-full bg-card sm:-ml-8 md:hidden",
        className
      )}
    >
      <BackButton className="absolute left-4 top-2 z-50 bg-muted/50" />
      <div className="flex h-full items-center justify-center">
        <ImageElement
          image_src={"/images/Feature-thumbnail.png"}
          className="select-none rounded-none"
        />
      </div>
      <div className="absolute bottom-0 w-fit rounded-tr-lg  bg-background p-1 px-2">
        <span className="select-none text-xs font-medium tracking-wide text-muted-foreground">
          Featured
        </span>
      </div>
    </header>
  )
}
