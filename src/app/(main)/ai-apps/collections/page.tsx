import { Metadata } from "next"

import { AIAPPSPAGENAVROUTES } from "@/config/routes/site-routes"

import AiAppsPagesTitle from "../_components/ai-apps-page-title"
import { CollectionsGrid } from "../_components/collections-grid"

export const metadata: Metadata = {
  title: "All Collections",
  description:
    "Useful AI Apps submitted by talented authors and creators like you. Updated, prospective and active.",
}

export default function CollectionsPage() {
  const collectionRoutes = AIAPPSPAGENAVROUTES.find(
    (route) => route.title === "Collections"
  )
  const allCollectionItems = collectionRoutes?.items?.map((item) => ({
    ...item,
  })) // Ensure plain objects

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
