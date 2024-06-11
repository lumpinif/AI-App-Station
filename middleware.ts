import { type NextRequest } from "next/server"
import type { NextFetchEvent } from "next/server"

import { Apps, Posts } from "./types/db_tables"
import { updateSession } from "./utils/supabase/middleware-client"
import { updateAppAnalytics } from "./utils/supabase/update-app-analytics"
import { updatePostAnalytics } from "./utils/supabase/update-post-analytics"

export async function middleware(request: NextRequest, event: NextFetchEvent) {
  // Update session
  let response = await updateSession(request)

  // Update analytics
  const pathname = request.nextUrl.pathname
  const segments = pathname.split("/")

  let post_id: Posts["post_id"] | null = null
  let app_slug: Apps["app_slug"] | null = null

  if (pathname.startsWith("/story/")) {
    // Example URL: /story/felix-lyu/5618e70f-541d-40fe-a965-d425a47d5928
    post_id = segments[3] // post_id
  } else if (pathname.startsWith("/ai-apps/")) {
    // Example URL: /ai-apps/chatgpt
    app_slug = segments[2] // app_slug
  }

  if (post_id) {
    // Update post analytics
    event.waitUntil(
      updatePostAnalytics(post_id)
        // .then(() => {
        //   console.log("View count incremented successfully")
        // })
        .catch((error) => {
          console.error("Failed to increment post view count", error)
        })
    )
  }

  if (app_slug) {
    // Update app analytics
    event.waitUntil(
      updateAppAnalytics(app_slug)
        // .then(() => {
        //   console.log("View count incremented successfully")
        // })
        .catch((error) => {
          console.error("Failed to increment app view count", error)
        })
    )
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
