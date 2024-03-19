import Link from "next/link"

import { GridItemInterface } from "@/config/dummy-config"

import Button from "./button"

const Social = ({ item }: { item: GridItemInterface }) => {
  return (
    <Link href={item.buttonLink ?? ""}>
      {/* Header */}
      <div className="flex items-center justify-between">
        {/* {item.icon && <Icons.apple />} */}
        {item.layout === "2x2" && (
          <Button
            text={item.buttonTitle ?? ""}
            secondaryText={item.buttonSecondaryText}
            color={item.color}
          />
        )}
      </div>
      {/* Content */}
      <div className="mt-2">
        <div className="@lg:text-lg line-clamp-1 font-semibold">
          {item.title}
        </div>
        <div className="text-sm text-neutral-500">{item.username}</div>
        {item.description && (
          <div className="mt-1 line-clamp-2 text-sm text-neutral-500">
            {item.description}
          </div>
        )}

        {item.layout === "1x2" && (
          <div className="mt-2">
            <Button
              text={item.buttonTitle ?? ""}
              secondaryText={item.buttonSecondaryText}
              color={item.color}
            />
          </div>
        )}
      </div>
    </Link>
  )
}

export default Social
