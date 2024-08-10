import Link from "next/link"

import { AIAPPSPAGENAVROUTES } from "@/config/routes/site-routes"
import { Separator } from "@/components/ui/separator"

import { CollectionsGrid } from "../collections-grid"
import { SeeAllButton } from "../see-all-button"

type CollectionsNavProps = {}

export const MainPageCollectionsNav: React.FC<CollectionsNavProps> = ({}) => {
  const collectionRoutes = AIAPPSPAGENAVROUTES.find(
    (route) => route.title === "Collections"
  )

  const collectionItems = collectionRoutes?.items.slice(0, 6)

  if (collectionItems)
    return (
      <section className="hidden flex-col gap-y-4 sm:flex">
        <span className="flex flex-col gap-y-2">
          <span className="flex items-center justify-between">
            <Link
              href={"/ai-apps/collections"}
              className="page-title-font w-fit text-2xl"
            >
              Collections
            </Link>
            <SeeAllButton href="/ai-apps/collections" />
          </span>
          <Separator className="bg-input" />
        </span>

        <CollectionsGrid collectionItems={collectionItems} />
      </section>
    )
}
