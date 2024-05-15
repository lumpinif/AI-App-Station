import { getUserData } from "@/server/auth"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { AppCardsGrid } from "./_components/app-cards-grid"

export const dynamic = "force-dynamic"

export default async function FavoritesPage() {
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
        <TabsContent value="apps">
          <AppCardsGrid user_id={user.id} />
        </TabsContent>
        <TabsContent value="stories">Change your password here.</TabsContent>
      </Tabs>
    </div>
  )
}
