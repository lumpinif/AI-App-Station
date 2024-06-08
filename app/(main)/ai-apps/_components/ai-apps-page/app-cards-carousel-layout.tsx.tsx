import { getAppsByConfig } from "@/server/queries/supabase/apps"
import { User } from "@supabase/supabase-js"

import appFetchConfig from "@/config/apps-fetch/apps-fetch-config"
import { OPTIONS_APPSCARDSCAROUSEL } from "@/config/carousels"

import AppCardsCarousel from "../carousel/app-card-carousel/app-cards-carousel"

const fetchApps = async () => {
  const results = await Promise.all(
    appFetchConfig.map((config) => getAppsByConfig({ config }))
  )
  return appFetchConfig.map((config, index) => ({
    title: config.title,
    apps: results[index].apps || [],
    error: results[index].getAppsByCategoryError || null,
  }))
}

type AppCardsCarouselLayoutProps = {
  user?: User | null
}

export const AppCardsCarouselLayout: React.FC<
  AppCardsCarouselLayoutProps
> = async ({ user }) => {
  // Fetch apps data
  const appsData = await fetchApps()

  return (
    <>
      {appsData.map(({ title, apps, error }, index) => (
        <div key={index} className="mt-4">
          <AppCardsCarousel
            data={apps}
            user={user}
            title={title}
            error={error}
            maxItems={15}
            hiddenOnCanNotScroll
            isMarginRight={true}
            options={OPTIONS_APPSCARDSCAROUSEL}
            className="md:basis-1/2 lg:basis-1/3"
          />
        </div>
      ))}
    </>
  )
}
