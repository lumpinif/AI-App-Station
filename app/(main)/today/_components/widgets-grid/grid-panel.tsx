"use client"

import { Suspense, useEffect } from "react"
import { stagger, useAnimate } from "framer-motion"

import { siteConfig } from "@/config/dummy-config"
import { cardVariants } from "@/lib/constants"
import { cn } from "@/lib/utils"
import LoadingFallback from "@/components/shared/loading-fallback"

import Equipments from "../bento-grid/2-panels/equipments"
import WidgetItem from "./widget-item"

const GridPanel = () => {
  const [scope, animate] = useAnimate()
  const staggerGridItems = stagger(0.02, {
    startDelay: 0.5,
  })

  // ANIMATION
  // useEffect(() => {
  //   if (scope.current) {
  //     animate(
  //       "div",
  //       {
  //         scale: 1,
  //         y: 0,
  //         opacity: 1,
  //       },
  //       {
  //         type: "spring",
  //         stiffness: 330,
  //         damping: 35,
  //         delay: staggerGridItems,
  //       }
  //     )
  //   }
  // }, [animate, scope, staggerGridItems])

  return (
    <div
      ref={scope}
      className="grid w-full auto-rows-[192px] grid-cols-3 gap-6 bg-blue-200/20 py-6"
    >
      <WidgetItem>
        <Suspense fallback={<LoadingFallback />}>
          {/* <UserCard className="hover:bg-card-hover" /> */}
        </Suspense>
      </WidgetItem>

      <WidgetItem>
        <div className={cn("h-[calc(60svh)] rounded-lg", cardVariants())}>
          FEATURED CARD
        </div>
      </WidgetItem>

      {/*
      <div className="sm:block md:col-span-2 lg:col-span-6">
        <UserCard className="h-full w-full  sm:h-full sm:w-full sm:px-6 sm:py-4" />
      </div>

      <div className="sm:block md:col-span-4 lg:col-span-3">
        <UserCard className="h-full w-full  sm:h-full sm:w-full sm:px-6 sm:py-4" />
      </div>

      <div className="sm:block sm:aspect-square md:col-span-2 lg:col-span-3">
        <UserCard className="h-full w-full  sm:h-full sm:w-full sm:px-6 sm:py-4" />
      </div> */}
    </div>
  )
}

export default GridPanel
