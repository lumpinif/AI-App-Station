import { getUserData } from "@/server/auth"
import { getAppsByConfig } from "@/server/queries/supabase/apps/apps-fetch-by-config"
import createSupabaseServerClient from "@/utils/supabase/server-client"
import { BoxSelect } from "lucide-react"

import { AppDetails } from "@/types/db_tables"
import { AppFetchConfig } from "@/types/fetch-configs/types-app-fetch-config"
import { SIDENAVROUTES } from "@/config/routes/main-routes"

import AiAppsPagesTitle from "../../_components/ai-apps-page-title"
import { AppCarouselLgCard } from "../../_components/cards/app-carousel-lg-card"

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

async function fetchAppsByCollectionConfig(config?: AppFetchConfig) {
  if (!config) {
    return {
      appsByCollectionConfig: null,
      getAppsError: "No config provided",
    }
  }

  const { apps: appsByCollectionConfig, getAppsByConfigError: getAppsError } =
    await getAppsByConfig({
      config,
    })

  return { appsByCollectionConfig, getAppsError }
}

export default async function CollectionPage({
  params,
}: {
  params: { collection: string }
}) {
  // Get user
  const {
    data: { user },
  } = await getUserData()

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

  const { appsByCollectionConfig, getAppsError } =
    await fetchAppsByCollectionConfig(collectionItem?.fetchConfig)

  if (getAppsError) {
    return (
      <section className="flex flex-col gap-y-4 text-muted-foreground">
        <p>Sorry, there was an error loading apps by this collection.</p>
        <p>Error: {getAppsError}</p>
      </section>
    )
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
      {appsByCollectionConfig?.length === 0 && (
        <p>No apps found in this collection.</p>
      )}

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        {appsByCollectionConfig?.map((app, index) => (
          <AppCarouselLgCard key={index} app={app} user={user} />
        ))}
      </div>
    </section>
  )
}
