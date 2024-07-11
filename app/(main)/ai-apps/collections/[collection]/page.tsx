import { Metadata } from "next"
import { getUser } from "@/server/auth"
import { getAppsByConfig } from "@/server/queries/supabase/apps/apps-fetch-by-config"
import { BoxSelect } from "lucide-react"

import { AppFetchConfig } from "@/types/fetch-configs/types-app-fetch-config"
import { SIDENAVROUTES } from "@/config/routes/main-routes"
import { siteConfig } from "@/config/site"
import { getSiteUrl } from "@/lib/utils"
import { AppSubmitButton } from "@/components/submit/app-submit-button"

import AiAppsPagesTitle from "../../_components/ai-apps-page-title"
import { AppCarouselLgCard } from "../../_components/cards/app-carousel-lg-card"

interface CollectionPageProps {
  params: { collection: string }
}

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

function getCollectionItem(collection: string) {
  const collectionRoutes = SIDENAVROUTES.find(
    (route) => route.title === "Collections"
  )

  const collectionItems = collectionRoutes?.items
  const collectionTitle =
    collectionItems?.find((item) => item.href.includes(collection))?.title ??
    collection.charAt(0).toUpperCase() + collection.slice(1)

  const collectionItem = collectionItems?.find((item) =>
    item.href.includes(collection)
  )

  return { collectionItem, collectionTitle }
}

export async function generateMetadata({
  params,
}: CollectionPageProps): Promise<Metadata> {
  const { collectionItem, collectionTitle } = getCollectionItem(
    params.collection
  )

  if (!collectionItem || !collectionTitle) {
    return {}
  }

  const ogImage = siteConfig.ogImage

  return {
    title: `Collection - ${collectionTitle}`,
    description: `AI Apps by collection - ${collectionTitle}`,
    openGraph: {
      title: `Collection - ${collectionTitle}`,
      description: `AI Apps by collection - ${collectionTitle}`,
      type: "article",
      url: getSiteUrl() + `/ai-apps/collections/${params.collection}`,
      images: [
        {
          url: ogImage,
          width: 1400,
          height: 800,
          alt: `${siteConfig.name} | Collection - ${collectionTitle}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Collection - ${collectionTitle}`,
      description: `AI Apps by collection - ${collectionTitle}`,
      images: [ogImage],
    },
  }
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  // Get user
  const { user } = await getUser()

  const { collection } = params

  const { collectionItem, collectionTitle } = getCollectionItem(collection)

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

  const description = (
    <div className="flex items-center justify-between gap-x-2">
      <span className="max-w-2xl select-none text-balance text-muted-foreground sm:line-clamp-2">
        {collectionItem.discription}
      </span>
      <AppSubmitButton className="hidden sm:flex" />
    </div>
  )

  return (
    <section className="flex flex-col gap-y-4">
      <AiAppsPagesTitle
        icon={icon}
        title={collectionTitle}
        href={`/ai-apps/collections/${collection}`}
      />

      {description}

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
