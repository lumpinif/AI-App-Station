import { getUser } from "@/server/auth"
import { getAllApps } from "@/server/queries/supabase/apps/apps-actions"
import { getAllPosts } from "@/server/queries/supabase/stories"

import { SearchCommandDialog } from "./search-command-dialog"

export async function SearchCommandDialogProvider() {
  const { apps: allApps, error: allAppsError } = await getAllApps()

  const { posts: allPosts, error: allPostsError } = await getAllPosts()

  if (allAppsError || allPostsError) {
    console.error(allAppsError, allPostsError)
  }

  const { user } = await getUser()

  return (
    <>
      <SearchCommandDialog apps={allApps} posts={allPosts} user={user} />
    </>
  )
}
