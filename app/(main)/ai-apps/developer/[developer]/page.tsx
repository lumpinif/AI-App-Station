import { Metadata } from "next"
import { getUserData } from "@/server/auth"
import { getAppsByConfig } from "@/server/queries/supabase/apps/apps-fetch-by-config"
import { getDeveloper } from "@/server/queries/supabase/developer"

import { Developers } from "@/types/db_tables"
import { siteConfig } from "@/config/site"
import { getSiteUrl } from "@/lib/utils"

import AiAppsPagesTitle from "../../_components/ai-apps-page-title"
import { AppCarouselLgCard } from "../../_components/cards/app-carousel-lg-card"

interface DeveloperPageProps {
  params: { developer: string }
}

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

async function fetchDeveloper(developer_slug: Developers["developer_slug"]) {
  const { developer, getDeveloperError } = await getDeveloper(developer_slug)

  return { developer, getDeveloperError }
}

export async function generateMetadata({
  params,
}: DeveloperPageProps): Promise<Metadata> {
  const { developer } = await fetchDeveloper(params.developer)

  if (!developer) {
    return {}
  }

  const developer_name = developer.developer_name

  const ogImage = siteConfig.ogImage

  return {
    title: `Developer - ${developer_name}`,
    description: `AI Apps by - ${developer_name}`,
    openGraph: {
      title: `Developer - ${developer_name}`,
      description: `AI Apps by - ${developer_name}`,
      type: "article",
      url: getSiteUrl() + `/ai-apps/developer/${params.developer}`,
      images: [
        {
          url: ogImage,
          width: 1400,
          height: 800,
          alt: `${siteConfig.name} | Developer - ${developer_name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Developer - ${developer_name}`,
      description: `AI Apps by - ${developer_name}`,
      images: [ogImage],
    },
  }
}

export default async function DeveloperPage({ params }: DeveloperPageProps) {
  const { developer: developer_slug } = params

  // Get user
  const {
    data: { user },
  } = await getUserData()

  const { developer, getDeveloperError } = await fetchDeveloper(developer_slug)

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
