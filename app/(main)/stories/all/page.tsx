import { Metadata } from "next"
import { getUserData } from "@/server/auth"
import { getAllPosts } from "@/server/queries/supabase/stories"

import { StoryCard } from "@/components/cards/apps/stories/story-card"
import { PageTitle } from "@/components/layout/page-title"

export const metadata: Metadata = {
  title: "All Stories about AI",
  description:
    "Brilliant stories about AI, written by talented authors and creators.",
}

export default async function AllStoriesPagePage() {
  // Get user
  const {
    data: { user },
  } = await getUserData()

  const { posts: allPosts, error: getAllPostsError } = await getAllPosts()

  if (getAllPostsError) {
    console.error("Failed to fetch all stories:", getAllPostsError)
    return (
      <section className="flex flex-col gap-y-4">
        <p>Sorry, there was an error loading all stories.</p>
      </section>
    )
  }

  return (
    <section className="flex flex-col gap-y-4">
      <PageTitle href={`/stories/all`} title={"All Stories"} />

      {allPosts?.length === 0 && <p>No stories found for now.</p>}

      <div className="grid gap-4 py-6 sm:grid-cols-2 sm:gap-6">
        {allPosts?.map((post, index) => (
          <StoryCard key={index} post={post} user_id={user?.id ?? ""} />
        ))}
      </div>
    </section>
  )
}
