import { BoxSelect } from "lucide-react"

import { SIDENAVROUTES } from "@/config/routes/main-routes"

import AiAppsPagesTitle from "../../_components/ai-apps-page-title"

// export const dynamicParams = false // Set to false to generate static params

// Return a list of `params` to populate the [collection] dynamic segment
// export function generateStaticParams() {
//   const collectionRoutes = SIDENAVROUTES.find(
//     (route) => route.title === "Collections"
//   )
//   if (collectionRoutes) {
//     const collectionParams = collectionRoutes.items.map((item) => ({
//       collection: item.href.split("/").pop(), // Extract the collection from the href
//     }))
//     return collectionParams
//   }
//   return []
// }

export default function CollectionPage({
  params,
}: {
  params: { collection: string }
}) {
  const { collection } = params
  const collectionRoutes = SIDENAVROUTES.find(
    (route) => route.title === "Collections"
  )

  const collectionItems = collectionRoutes?.items
  const pathTitle =
    collectionItems?.find((item) => item.href.includes(collection))?.title ??
    collection.charAt(0).toUpperCase() + collection.slice(1)

  const collectionItem = collectionItems?.find((item) =>
    item.href.includes(collection)
  )

  if (!collectionItem) {
    return <div className="text-muted-foreground">No such collection ...</div>
  }

  const icon = (
    <span className="flex size-14 items-center justify-center rounded-xl border shadow-md transition-all duration-300 ease-out hover:shadow-lg dark:border-border/50 dark:hover:shadow-outline">
      {collectionItem.icon ? (
        collectionItem.title !== "GPTs" ? (
          <collectionItem.icon className="size-8 stroke-[1.5px]" />
        ) : (
          <collectionItem.icon size={28} className="size-8" />
        )
      ) : (
        <BoxSelect className="size-8" />
      )}
    </span>
  )

  return (
    <section className="flex flex-col gap-y-4">
      <AiAppsPagesTitle
        icon={icon}
        title={pathTitle}
        href={`/ai-apps/collections/${collection}`}
      />
    </section>
  )
}
