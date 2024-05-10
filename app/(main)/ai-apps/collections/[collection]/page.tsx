import { SIDENAVROUTES } from "@/config/main-routes"

import AiAppsPagesTitle from "../../_components/ai-apps-page-title"

export const dynamicParams = false // Set to false to generate static params

// Return a list of `params` to populate the [collection] dynamic segment
export function generateStaticParams() {
  const collectionRoutes = SIDENAVROUTES.find(
    (route) => route.title === "Collections"
  )
  if (collectionRoutes) {
    const collectionParams = collectionRoutes.items.map((item) => ({
      collection: item.href.split("/").pop(), // Extract the collection from the href
    }))
    return collectionParams
  }
  return []
}

export default function CollectionPage({
  params,
}: {
  params: { collection: string }
}) {
  const { collection } = params
  const collectionRoutes = SIDENAVROUTES.find(
    (route) => route.title === "Collections"
  )

  const pathTitle =
    collectionRoutes?.items.find((item) => item.href.includes(collection))
      ?.title ?? collection.charAt(0).toUpperCase() + collection.slice(1)

  return (
    <section className="flex flex-col gap-y-4">
      <AiAppsPagesTitle
        title={pathTitle}
        href={`/ai-apps/collections/${collection}`}
      />
    </section>
  )
}
