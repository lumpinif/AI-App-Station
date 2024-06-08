import Link from "next/link"
import { BoxSelect } from "lucide-react"

import { SIDENAVROUTES } from "@/config/routes/main-routes"
import { Separator } from "@/components/ui/separator"

type CollectionsNavProps = {}

export const CollectionsNav: React.FC<CollectionsNavProps> = ({}) => {
  return (
    <section className="hidden flex-col gap-y-4 sm:flex">
      <span className="flex flex-col gap-y-2">
        <h2 className="page-title-font text-2xl">Collections</h2>
        <Separator className="bg-input" />
      </span>
      {SIDENAVROUTES.filter((navItem) => navItem.title === "Collections").map(
        (navItem, index) => (
          <div
            key={index}
            className="grid grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-6"
          >
            {navItem.items?.map((item, index) => (
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
        )
      )}
    </section>
  )
}
