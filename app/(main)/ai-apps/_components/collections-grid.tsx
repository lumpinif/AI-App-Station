import Link from "next/link"
import { BoxSelect } from "lucide-react"

import { NavItemProps } from "@/config/routes/main-routes"

type CollectionsGridProps = {
  collectionItems?: NavItemProps[]
}

export const CollectionsGrid: React.FC<CollectionsGridProps> = ({
  collectionItems,
}) => {
  return (
    <>
      <div className="grid grid-cols-2 px-2 sm:gap-4 lg:grid-cols-3 lg:gap-6">
        {collectionItems?.map((item, index) => (
          <Link
            href={item.href}
            key={index}
            className="w-fit transition-all duration-300 ease-out active:scale-[.98]"
          >
            <div className="flex items-center text-primary/90 transition-all duration-300 ease-out hover:text-primary">
              {item.icon ? (
                item.title !== "GPTs" ? (
                  <item.icon className="size-8 stroke-[1.5px]" />
                ) : (
                  <item.icon size={28} className="size-8" />
                )
              ) : (
                <BoxSelect className="size-8" />
              )}

              <div className="ml-2 text-lg font-medium tracking-tight transition-all duration-300 ease-out lg:ml-4 lg:text-2xl">
                {item.title}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
