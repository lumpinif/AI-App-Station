import { getAppsByConfig } from "@/server/queries/supabase/apps"
import { User } from "@supabase/supabase-js"

import appFetchConfig from "@/config/apps-fetch/apps-fetch-config"
import { OPTIONS_APPSCARDSCAROUSEL } from "@/config/carousels"

import AppCardsCarousel from "../carousel/app-card-carousel/app-cards-carousel"

// Dynamically import the components with 'ssr: false' to prevent them from rendering on the server
// TODO: CHECK IF DYNAMIC IMPORT IS GOOD FOR PERFORMANCE BEFORE PRODUCTION
// const AppCardsCarousel = dynamic(
//   () => import("./_components/carousel/app-card-carousel/app-cards-carousel"),
//   { ssr: true }
// )

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
            className={"md:basis-1/2 lg:basis-1/3"}
            chunkSize={title === "Featured Apps" ? 1 : 3}
            appCardVariant={title === "Featured Apps" ? "featured" : ""}
            // lg:basis-1/3
          />
        </div>
      ))}
    </>
  )
}
