import { getAllApps } from "@/server/queries/supabase/apps/apps-actions"
import { getAllPosts } from "@/server/queries/supabase/stories"

import { BASE_URL } from "@/lib/constants/site-constants"
import { getPostAuthorSlug } from "@/lib/utils"

export default async function sitemap() {
  const { apps } = await getAllApps()
  const { posts } = await getAllPosts()

  const appUrls = apps?.map((app) => {
    return {
      url: `${BASE_URL}/ai-apps/${app.app_slug}`,
      lastModified: new Date(app.updated_at as string),
      changeFrequency: "daily",
      priority: 1,
    }
  })

  const postsUrls = posts?.map((post) => {
    return {
      url: `${BASE_URL}/story/${getPostAuthorSlug(post.profiles)}/${post.post_id}`,
      lastModified: new Date(post.updated_at as string),
      changeFrequency: "daily",
      priority: 1,
    }
  })

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...(appUrls ?? []),
    ...(postsUrls ?? []),
  ]
}
