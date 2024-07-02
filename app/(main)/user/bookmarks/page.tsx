import { Suspense } from "react"
import { Metadata } from "next"
import { getUser } from "@/server/auth"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LoadingFallback from "@/components/shared/loading-fallback"

import { AppsStoriesTabs } from "../_components/bookmark-favorites/_components/apps-stories-tabs"
import { AppCardsGrid } from "../_components/bookmark-favorites/_components/apps/app-cards-grid"
import { StoryCardsGrid } from "../_components/bookmark-favorites/_components/stories/story-cards-grid"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Your Bookmarks | AI Stories and AI Apps",
}

export default async function BookmarksPage() {
  const { user, error: getUserError } = await getUser()

  if (!user?.id) {
    return <div>Not logged in</div>
  }

  if (getUserError) {
    return <div>Auth Error: {getUserError.message}</div>
  }

  return (
    <div className="w-full">
      <AppsStoriesTabs>
        <TabsContent
          value="apps"
          className="focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <Suspense fallback={<LoadingFallback />}>
            <AppCardsGrid user_id={user.id} collectionType="bookmark" />
          </Suspense>
        </TabsContent>
        <TabsContent
          value="stories"
          className="focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <Suspense fallback={<LoadingFallback />}>
            <StoryCardsGrid user_id={user.id} collectionType="bookmark" />
          </Suspense>
        </TabsContent>
      </AppsStoriesTabs>
    </div>
  )
}
