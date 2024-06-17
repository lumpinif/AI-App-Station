import {
  getScreenshotsFileNames,
  getScreenshotsPublicUrls,
} from "@/server/data/supabase-actions"
import { getDailyApp } from "@/server/queries/supabase/apps/fetch-daily-app"

import { IosStyleDailyAppCard } from "./ios-style-daily-app"

type DailyAppProps = {}

export const DailyApp: React.FC<DailyAppProps> = async ({}) => {
  const { app: dailyApp, error: getDailyAppError } = await getDailyApp()

  if (getDailyAppError) {
    return (
      <div>
        Error fetching daily app, please try again. error:
        {getDailyAppError.message}
      </div>
    )
  }

  if (!dailyApp) {
    return (
      <div>No daily post found at this time. It should be fixed shortly.</div>
    )
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
          screenshotsPublicUrls={screenshotsPublicUrls}
        />
      </div>
    </>
  )
}
