import { getUserData } from "@/server/auth"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { AppCardsGrid } from "../_components/bookmark-favorites/_components/app-cards-grid"

export const dynamic = "force-dynamic"

export default async function BookmarksPage() {
  const {
    data: { user },
    error,
  } = await getUserData()
  if (!user?.id) {
    return <div>Not logged in</div>
  }
  if (error) {
    return <div>Error: {error.message}</div>
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
          <AppCardsGrid user_id={user.id} collectionType="bookmark" />
        </TabsContent>
        <TabsContent
          value="stories"
          className="focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          Story cards grid here
        </TabsContent>
      </Tabs>
    </div>
  )
}
