import Link from "next/link"

import { GridItemInterface } from "@/config/_dummy-config"

const Mentor = ({ item }: { item: GridItemInterface }) => {
  return (
    <Link
      href={item.buttonLink ?? ""}
      className="flex items-center justify-between gap-4"
    >
      {/* {item.icon && <Icons.apple />} */}
      <div className="@lg:text-lg w-full font-semibold">{item.title}</div>
      {/* Price & Promo Container */}
      <div className="">
        {/* Top Container */}
        <div className="flex items-center justify-between">
          <div className="text-xs text-neutral-500">PROMO</div>
          <div className="flex items-center gap-1">
            {/* Old Price */}
            <div className="text-xs text-neutral-500 line-through">
              {item.oldPrice}
            </div>
            <div>{item.price}</div>
          </div>
        </div>
        {/* Bottom Container */}
        <div className="@lg:text-base text-sm font-bold text-primary">
          {item.promotion}
        </div>
      </div>
    </Link>
  )
}

export default Mentor
