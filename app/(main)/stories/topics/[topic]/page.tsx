import { getUserData } from "@/server/auth"
import {
  getPostByTopicSlug,
  getTopicBySlug,
} from "@/server/queries/supabase/stories"

import { Topics } from "@/types/db_tables"
import { StoryCard } from "@/components/cards/apps/stories/story-card"
import { PageTitle } from "@/components/layout/page-title"

async function fetchPostsByTopic(topic_slug?: Topics["topic_slug"]) {
  if (!topic_slug) {
    return {
      postsByTopic: null,
      getPostsByTopicError: "No topic slug provided",
    }
  }

  const { posts: postsByTopic, error: getPostsByTopicError } =
    await getPostByTopicSlug(topic_slug)

  return { postsByTopic, getPostsByTopicError }
}

export default async function TopicPage({
  params,
}: {
  params: { topic: string }
}) {
  const { topic: topic_slug } = params

  // Get user
  const {
    data: { user },
  } = await getUserData()

  const { topic: topicBySlug, error: getTopicBySlugError } =
    await getTopicBySlug(topic_slug)

  if (getTopicBySlugError) {
    console.error("Failed to fetch topic by slug:", getTopicBySlugError)
    return (
      <section className="flex flex-col gap-y-4">
        <p>Sorry, there was an error loading this topic.</p>
      </section>
    )
  }

  const { postsByTopic, getPostsByTopicError } =
    await fetchPostsByTopic(topic_slug)

  if (getPostsByTopicError) {
    return (
      <section className="flex flex-col gap-y-4 text-muted-foreground">
        <p>Sorry, there was an error loading posts by topic.</p>
        <p>Error: {getPostsByTopicError}</p>
      </section>
    )
  }

  const pageTitle = (topicBySlug && topicBySlug[0]?.topic_name) || "Topic"

  return (
    <section className="flex flex-col gap-y-4">
      <PageTitle
        subtitlePos="bottom"
        href={`/stories/topics/${topic_slug}`}
        title={`Topic ${pageTitle}`}
      />

      {postsByTopic?.length === 0 && <p>No stories found in this topic.</p>}

      <div className="grid gap-4 py-6 sm:grid-cols-2 sm:gap-6">
        {postsByTopic?.map((post, index) => (
          <StoryCard key={index} post={post} user_id={user?.id ?? ""} />
        ))}
      </div>
    </section>
  )
}
