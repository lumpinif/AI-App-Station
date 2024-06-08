import { SIDENAVROUTES } from "@/config/routes/main-routes"

import AiAppsPagesTitle from "../_components/ai-apps-page-title"
import { CollectionsGrid } from "../_components/collections-grid"

export default function CollectionsPage() {
  const collectionRoutes = SIDENAVROUTES.find(
    (route) => route.title === "Collections"
  )
  const allCollectionItems = collectionRoutes?.items

  if (!allCollectionItems)
    return (
      <section className="flex flex-col gap-y-4">
        <AiAppsPagesTitle
          title={"No Collections found"}
          href={`/ai-apps/collections`}
        />
        <span className="text-muted-foreground">
          It should be fixed shortly
        </span>
      </section>
    )

  return (
    <section className="flex flex-col gap-y-4">
      <AiAppsPagesTitle
        title={"All Collections"}
        href={`/ai-apps/collections`}
      />

      <CollectionsGrid collectionItems={allCollectionItems} />
    </section>
  )
}
