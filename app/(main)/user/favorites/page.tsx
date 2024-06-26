import { Suspense } from "react"
import { getUserData } from "@/server/auth"

import { TabsContent } from "@/components/ui/tabs"
import LoadingFallback from "@/components/shared/loading-fallback"

import { AppsStoriesTabs } from "../_components/bookmark-favorites/_components/apps-stories-tabs"
import { AppCardsGrid } from "../_components/bookmark-favorites/_components/apps/app-cards-grid"
import { StoryCardsGrid } from "../_components/bookmark-favorites/_components/stories/story-cards-grid"

export const dynamic = "force-dynamic"

export default async function FavoritesPage() {
  const {
    data: { user },
    error: getUserDataError,
  } = await getUserData()

  if (!user?.id) {
    return <div>Not logged in</div>
  }

  if (getUserDataError) {
    return <div>Auth Error: {getUserDataError.message}</div>
  }

  return (
    <div className="w-full">
      <AppsStoriesTabs>
        <TabsContent
          value="apps"
          className="focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <Suspense fallback={<LoadingFallback />}>
            <AppCardsGrid user_id={user.id} />
          </Suspense>
        </TabsContent>
        <TabsContent
          value="stories"
          className="focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <Suspense fallback={<LoadingFallback />}>
            <StoryCardsGrid user_id={user.id} />
          </Suspense>
        </TabsContent>
      </AppsStoriesTabs>
    </div>
  )
}
