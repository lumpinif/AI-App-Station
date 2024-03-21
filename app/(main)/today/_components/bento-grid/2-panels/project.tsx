import Link from "next/link"
import { Star } from "lucide-react"

import { GridItemInterface } from "@/config/dummy-config"

const Project = ({ item }: { item: GridItemInterface }) => {
  return (
    <Link
      href={item.buttonLink ?? ""}
      className="flex items-center justify-between gap-4"
    >
      {/* {item.icon && (
        <Icons.apple width={10} height={10} className="text-primary" />
      )} */}
      <div className="@lg:text-lg w-full  font-semibold">{item.title}</div>
      <div className="flex items-center gap-1">
        <div className="mt-px">{item.stars}</div>
        <Star fill="currentColor" size={16} />
      </div>
    </Link>
  )
}

export default Project
