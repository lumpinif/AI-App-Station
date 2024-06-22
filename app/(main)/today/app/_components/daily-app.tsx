import {
  getScreenshotsFileNames,
  getScreenshotsPublicUrls,
} from "@/server/data/supabase-actions"
import { getDailyApp } from "@/server/queries/supabase/apps/fetch-daily-app"

import { DEFAULT_POST_IMAGE } from "@/lib/constants/site-constants"
import { getAverageColorOnServer } from "@/lib/get-average-color-on-server"

import { IosStyleDailyAppCard } from "./ios-style-daily-app"

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
    apps: { app_id, submitted_by_user_id },
  } = dailyApp

  const screenshotsFileNames = await getScreenshotsFileNames(
    app_id,
    submitted_by_user_id
  )

  const screenshotsPublicUrls = await getScreenshotsPublicUrls(
    app_id,
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
        <IosStyleDailyAppCard
          dailyApp={dailyApp}
          averageColor={averageColor}
          screenshotsPublicUrls={screenshotsPublicUrls}
        />
      </div>
    </>
  )
}

function ErrorMessage({ message }: { message: string }) {
  return <div>Error fetching daily app, please try again. Error: {message}</div>
}

function NoAppMessage() {
  return <div>No daily app found at this time. It should be fixed shortly.</div>
}
