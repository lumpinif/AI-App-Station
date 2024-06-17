import { getDailyApp } from "@/server/queries/supabase/apps/fetch-daily-app"

import { IosStyleDailyAppCard } from "./ios-style-daily-app"

type DailyAppProps = {}

export const DailyApp: React.FC<DailyAppProps> = async ({}) => {
  const { app: dailyApp, error: getDailyAppError } = await getDailyApp()

  if (getDailyAppError) {
    return <div>Error fetching daily post, please try again.</div>
  }

  if (!dailyApp) {
    return (
      <div>No daily post found at this time. It should be fixed shortly.</div>
    )
  }

  return (
    <>
      <div className="flex flex-col gap-y-1">
        <IosStyleDailyAppCard dailyApp={dailyApp} />
      </div>
    </>
  )
}
