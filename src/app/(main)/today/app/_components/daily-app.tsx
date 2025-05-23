import { getDailyApp } from "@/server/queries/supabase/apps/fetch-daily-app"
import {
  getScreenshotsFileNames,
  getScreenshotsPublicUrls,
} from "@/server/queries/supabase/storage"

import { DEFAULT_POST_IMAGE } from "@/lib/constants/site-constants"
import { getAverageColorOnServer } from "@/lib/get-average-color-on-server"

import { DailyAppCard } from "./daily-app-cards-modal/daily-app-card"

type DailyAppProps = {}

export const DailyApp: React.FC<DailyAppProps> = async ({}) => {
  const { app: dailyApp, error: getDailyAppError } = await getDailyApp()

  if (getDailyAppError) {
    console.error("Error fetching daily app:", getDailyAppError)
    return <ErrorMessage message={getDailyAppError.message} />
  }

  if (!dailyApp) {
    return <NoAppMessage />
  }

  // Get screenshots file names and public URLs of the daily app
  const {
    apps: { app_id, submitted_by_user_id, app_slug },
  } = dailyApp

  const screenshotsFileNames = await getScreenshotsFileNames(
    app_id,
    app_slug,
    submitted_by_user_id
  )

  const screenshotsPublicUrls = await getScreenshotsPublicUrls(
    app_id,
    app_slug,
    submitted_by_user_id,
    screenshotsFileNames || []
  )

  const imageSrc = screenshotsPublicUrls
    ? screenshotsPublicUrls[0]
    : DEFAULT_POST_IMAGE

  const averageColor = await getAverageColorOnServer(imageSrc, false)

  return (
    <>
      <div
        style={{
          borderRadius: 20,
        }}
        className="flex flex-col gap-y-1"
      >
        {/* <IosStyleDailyAppCard
          dailyApp={dailyApp}
          averageColor={averageColor}
          screenshotsPublicUrls={screenshotsPublicUrls}
        /> */}
        <DailyAppCard
          dailyApp={dailyApp}
          averageColor={averageColor}
          screenshotsPublicUrls={screenshotsPublicUrls}
        />
      </div>
    </>
  )
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="flex h-[430px] items-center justify-center text-balance rounded-2xl border p-6 text-center text-muted-foreground dark:border-0 dark:shadow-top">
      Error fetching daily app, please try again. Error: {message}
    </div>
  )
}

function NoAppMessage() {
  return (
    <div className="flex h-[430px] items-center justify-center text-balance rounded-2xl border p-6 text-center text-muted-foreground dark:border-0 dark:shadow-top">
      Sorry. No daily app found at this time. It should be fixed shortly.
    </div>
  )
}
