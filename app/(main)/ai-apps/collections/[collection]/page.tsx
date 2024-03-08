import { SIDENAVROUTES } from "@/config/routes"

export const dynamicParams = false // Set to false to generate static params

// Return a list of `params` to populate the [collection] dynamic segment
export function generateStaticParams() {
  const collectionRoutes = SIDENAVROUTES.find(
    (route) => route.title === "Collections"
  )
  if (collectionRoutes) {
    const collectionParams = collectionRoutes.items.map((item) => ({
      collection: item.href.split("/").pop() || "", // Extract the collection from the href
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
  return <div>Collection Page: {collection}</div>
}
