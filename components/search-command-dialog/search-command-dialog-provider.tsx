import { getAllApps, getAllPosts } from "@/server/data"

import { SearchCommandDialog } from "./search-command-dialog"

export async function SearchCommandDialogProvider() {
  const { apps: allApps, error: allAppsError } = await getAllApps()

  const { posts: allPosts, error: allPostsError } = await getAllPosts()

  if (allAppsError || allPostsError) {
    console.error(allAppsError, allPostsError)
  }

  return (
    <>
      <SearchCommandDialog apps={allApps} posts={allPosts} />
    </>
  )
}
