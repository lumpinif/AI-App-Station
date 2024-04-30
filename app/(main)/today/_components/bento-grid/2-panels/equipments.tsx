import Image from "next/image"
import Link from "next/link"

import { GridItemInterface } from "@/config/dummy-config"

import styles from "./styles.module.css"

const Equipments = ({ item }: { item: GridItemInterface }) => {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden">
      {/* Image */}
      <Image
        className="z-0 h-full w-full object-cover object-center"
        src={"/images/Scuba Diver Coral Reef.jpg"}
        alt="equipments"
        fill
      />

      <div className="absolute inset-x-0 bottom-0 w-full">
        {/* Content */}
        <div className="relative z-20 w-full">
          <div className="space-y-3 p-4 md:p-8">
            <div className="text-sm font-medium">{item.title}</div>
            <div className="flex flex-wrap items-center gap-3">
              {item.equipments?.map((equipment, index) => (
                <Link
                  className="bg-card rounded-lg px-2 py-1 text-sm font-medium"
                  key={equipment.link + index}
                  href={equipment.link}
                >
                  {equipment.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
        {/* Overlay */}
        <span className="from-card absolute inset-x-0 bottom-0 z-10 h-full w-full bg-gradient-to-t from-25% to-transparent"></span>

        {/* Gradient Blur Overlay */}
        {/* <div className={styles.gradientBlur}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div> */}
      </div>
    </div>
  )
}

export default Equipments
