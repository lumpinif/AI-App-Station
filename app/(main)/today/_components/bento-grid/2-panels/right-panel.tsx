"use client"

import { useEffect } from "react"
import { stagger, useAnimate } from "framer-motion"

import { siteConfig } from "@/config/dummy-config"

import Equipments from "./equipments"
import GridItem from "./grid-item"
import Mentor from "./mentor"
import Project from "./project"
import Social from "./social"

const RightPanel = () => {
  const [scope, animate] = useAnimate()
  const staggerGridItems = stagger(0.02, {
    startDelay: 0.5,
  })

  // ANIMATION
  useEffect(() => {
    if (scope.current) {
      animate(
        "div",
        {
          scale: 1,
          y: 0,
          opacity: 1,
        },
        {
          type: "spring",
          stiffness: 330,
          damping: 35,
          delay: staggerGridItems,
        }
      )
    }
  }, [animate, scope, staggerGridItems])

  return (
    <div
      ref={scope}
      className="grid h-full w-full auto-rows-[76px] grid-cols-4 gap-6 py-6 xl:gap-10 xl:overflow-y-auto xl:px-1 xl:py-10"
    >
      {siteConfig.items.map((item, index) => {
        return (
          <GridItem key={item.title + item.type + index} size={item.layout}>
            {item.type === "social" ? (
              <Social item={item} />
            ) : item.type === "mentor" ? (
              <Mentor item={item} />
            ) : item.type === "project" ? (
              <Project item={item} />
            ) : item.type === "equipment" ? (
              <Equipments item={item} />
            ) : (
              <div>Need to create new component type.</div>
            )}
          </GridItem>
        )
      })}
    </div>
  )
}

export default RightPanel
