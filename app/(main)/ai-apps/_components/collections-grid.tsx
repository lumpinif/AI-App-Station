import Link from "next/link"
import { BoxSelect } from "lucide-react"

import { NavItemProps } from "@/config/routes/site-routes"

type CollectionsGridProps = {
  collectionItems?: NavItemProps[]
}

export const CollectionsGrid: React.FC<CollectionsGridProps> = ({
  collectionItems,
}) => {
  return (
    <>
      <div className="grid gap-4 p-2 py-4 sm:grid-cols-2 md:pr-4 lg:grid-cols-3 lg:gap-6 lg:pr-6">
        {collectionItems?.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="w-fit transition-all duration-300 ease-out active:scale-[.98]"
          >
            <div className="flex items-center text-primary/90 transition-all duration-300 ease-out hover:text-primary">
              <span className="flex size-14 items-center justify-center rounded-xl border shadow-md transition-all duration-300 ease-out hover:shadow-lg dark:border-border/50 dark:hover:shadow-outline">
                {item.icon ? (
                  item.title !== "GPTs" ? (
                    <item.icon className="size-8 stroke-[1.5px]" />
                  ) : (
                    <item.icon size={28} className="size-8" />
                  )
                ) : (
                  <BoxSelect className="size-8" />
                )}
              </span>

              <div className="ml-2 text-lg font-medium tracking-tight transition-all duration-300 ease-out lg:ml-4 lg:text-xl">
                {item.title}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
