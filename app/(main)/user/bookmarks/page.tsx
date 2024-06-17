import { Suspense } from "react"
import { getUserData } from "@/server/auth"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LoadingFallback from "@/components/shared/loading-fallback"

import { AppCardsGrid } from "../_components/bookmark-favorites/_components/apps/app-cards-grid"
import { StoryCardsGrid } from "../_components/bookmark-favorites/_components/stories/story-cards-grid"

export const dynamic = "force-dynamic"

export default async function BookmarksPage() {
  const {
    data: { user },
    error: getUserError,
  } = await getUserData()

  if (!user?.id) {
    return <div>Not logged in</div>
  }

  if (getUserError) {
    return <div>Auth Error: {getUserError.message}</div>
  }

  return (
    <div className="w-full">
      <Tabs defaultValue="apps" className="w-full">
        <TabsList>
          <TabsTrigger value="apps">Apps</TabsTrigger>
          <TabsTrigger value="stories">Stories</TabsTrigger>
        </TabsList>
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
      </Tabs>
    </div>
  )
}
