import { getUserData } from "@/server/auth"
import { getAppsByConfig } from "@/server/queries/supabase/apps/apps-fetch-by-config"
import { getDeveloper } from "@/server/queries/supabase/developer"

import { Developers } from "@/types/db_tables"

import AiAppsPagesTitle from "../../_components/ai-apps-page-title"
import { AppCarouselLgCard } from "../../_components/cards/app-carousel-lg-card"

async function fetchAppsByDeveloper(
  developer_slug?: Developers["developer_slug"]
) {
  if (!developer_slug) {
    return {
      appsByDeveloper: null,
      getAppsByDeveloperError: "No developer slug provided",
    }
  }

  const { apps: appsByDeveloper, getAppsByConfigError } = await getAppsByConfig(
    {
      config: {
        title: "Newest Added",
        order: [
          {
            column: "created_at",
            options: { ascending: false },
          },
        ],
        limit: {
          limit: 15,
        },
        filters: [],
        innerJoinTables: [],
      },
      byField: {
        table: "developers",
        column: "developer_slug",
        value: developer_slug,
      },
    }
  )

  return { appsByDeveloper, getAppsByConfigError }
}

export default async function DeveloperPage({
  params,
}: {
  params: { developer: string }
}) {
  const { developer: developer_slug } = params

  // Get user
  const {
    data: { user },
  } = await getUserData()

  const { developer, getDeveloperError } = await getDeveloper(developer_slug)

  if (getDeveloperError) {
    console.error("Failed to fetch developer:", getDeveloperError)
    return (
      <section className="flex flex-col gap-y-4">
        <p>Sorry, there was an error loading this developer.</p>
      </section>
    )
  }

  const { appsByDeveloper, getAppsByConfigError } =
    await fetchAppsByDeveloper(developer_slug)

  if (getAppsByConfigError) {
    return (
      <section className="flex flex-col gap-y-4 text-muted-foreground">
        <p>Sorry, there was an error loading apps by developer.</p>
        <p>Error: {getAppsByConfigError}</p>
      </section>
    )
  }

  const pageTitle = (developer && developer.developer_name) || "Developer"

  return (
    <section className="flex flex-col gap-y-4">
      <AiAppsPagesTitle
        title={pageTitle}
        href={`/ai-apps/developers/${developer_slug}`}
      />

      {appsByDeveloper?.length === 0 && <p>No apps found in this developer.</p>}

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        {appsByDeveloper?.map((app, index) => (
          <AppCarouselLgCard key={index} app={app} user={user} />
        ))}
      </div>
    </section>
  )
}
