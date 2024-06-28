import Image from "next/image"
import Link from "next/link"

import { GridItemInterface } from "@/config/_dummy-config"
import { cn } from "@/lib/utils"

import styles from "./styles.module.css"

const Equipments = ({ item }: { item: GridItemInterface }) => {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden">
      {/* Image */}
      <Image
        className="z-0 h-full w-full object-cover object-center"
        src={"/images/Scuba Diver Coral Reef.jpg"}
        // src={item.image ?? ""}
        alt="equipments"
        fill
      />

      <div className="absolute inset-x-0 bottom-0 w-full" id="wrapper">
        {/* Content */}
        <div className="relative z-20 w-full">
          <div className="space-y-3 p-4 md:p-8">
            <div className="text-sm font-medium">{item.title}</div>
            <div className="flex flex-wrap items-center gap-3">
              {item.equipments?.map((equipment, index) => {
                return (
                  <Link
                    className="rounded-lg bg-card px-2 py-1 text-sm font-medium"
                    key={equipment.link + index}
                    href={equipment.link}
                  >
                    {equipment.title}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
        {/* Overlay */}
        <span className="absolute inset-x-0 bottom-0 z-10 h-full w-full bg-gradient-to-t from-card to-transparent"></span>
        {/* Blur Layers */}
        {/* <span className="absolute inset-x-0 bottom-0 z-[9] h-[30%] w-full backdrop-blur-[1.4px]"></span>
        <span className="absolute inset-x-0 bottom-0 z-[8] h-[40%] w-full backdrop-blur-[1.2px]"></span>
        <span className="absolute inset-x-0 bottom-0 z-[7] h-[50%] w-full backdrop-blur-[1px]"></span>
        <span className="absolute inset-x-0 bottom-0 z-[6] h-[60%] w-full backdrop-blur-[0.8px]"></span>
        <span className="absolute inset-x-0 bottom-0 z-[6] h-[70%] w-full backdrop-blur-[0.6px]"></span>
        <span className="absolute inset-x-0 bottom-0 z-[5] h-[80%] w-full backdrop-blur-[0.4px]"></span>
        <span className="absolute inset-x-0 bottom-0 z-[4] h-[90%] w-full backdrop-blur-[0.2px]"></span> */}
        {/* Blur Layers */}
        {/* {Array.from({ length: 10 }).map((_, index) => {
          const blurAmount = 2 - index * 0.2 // Decrease blur amount with each layer
          const heightPercentage = 30 + index * 7 // Increase height with each layer
          const zIndex = 11 + index // Ensure proper stacking order
          return (
            <span
              key={index}
              className={`mix-blend-mode background-blend-mode absolute inset-x-0 bottom-0 z-[${zIndex}] h-[${heightPercentage}%] w-full`}
              style={{ backdropFilter: `blur(${blurAmount}px)` }}
            ></span>
          )
        })} */}
      </div>
    </div>
  )
}

export default Equipments
