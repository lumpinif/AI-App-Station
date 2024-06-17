import { getUserData } from "@/server/auth"
import { getAllApps, getAllPosts } from "@/server/data"

import { SearchCommandDialog } from "./search-command-dialog"

export async function SearchCommandDialogProvider() {
  const { apps: allApps, error: allAppsError } = await getAllApps()

  const { posts: allPosts, error: allPostsError } = await getAllPosts()

  if (allAppsError || allPostsError) {
    console.error(allAppsError, allPostsError)
  }

  const {
    data: { user },
  } = await getUserData()

  return (
    <>
      <SearchCommandDialog apps={allApps} posts={allPosts} user={user} />
    </>
  )
}
