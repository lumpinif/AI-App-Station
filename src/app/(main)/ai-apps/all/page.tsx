import { Metadata } from "next"
import { getUser } from "@/server/auth"
import { getAllApps } from "@/server/queries/supabase/apps/apps-actions"

import AiAppsPagesTitle from "../_components/ai-apps-page-title"
import { AppCarouselLgCard } from "../_components/cards/app-carousel-lg-card"

export const metadata: Metadata = {
  title: "Discover All AI Apps",
  description:
    "Useful AI Apps submitted by talented authors and creators like you. Updated, prospective and active.",
}

export default async function AllAppsPagePage() {
  // Get user
  const { user } = await getUser()

  const { apps: allApps, error: getAllAppsError } = await getAllApps()

  if (getAllAppsError) {
    console.error("Failed to get all apps:", getAllAppsError)
    return (
      <section className="flex flex-col gap-y-4">
        <p>Sorry, there was an error getting all apps right now.</p>
      </section>
    )
  }
  // TODO: ADD PAGANTION LATER

  return (
    <section className="flex flex-col gap-y-4">
      <AiAppsPagesTitle title={"All Apps"} href={`/ai-apps/all`} />

      {allApps?.length === 0 && <p>No apps found in this category.</p>}

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        {allApps?.map((app, index) => (
          <AppCarouselLgCard key={index} app={app} user={user} />
        ))}
      </div>
    </section>
  )
}
