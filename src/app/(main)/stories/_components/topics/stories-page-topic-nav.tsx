import Link from "next/link"
import { getAllTopics } from "@/server/queries/supabase/stories"
import { sampleSize } from "lodash"

import { Separator } from "@/components/ui/separator"
import { SeeAllButton } from "@/app/(main)/ai-apps/_components/see-all-button"

import { TopicsGrid } from "./topics-grid"

type StoriesPageTopicNavProps = {}

export const StoriesPageTopicNav: React.FC<
  StoriesPageTopicNavProps
> = async ({}) => {
  const { topics: allTopics, error: getAllTopicsError } = await getAllTopics()

  if (getAllTopicsError) {
    console.error(getAllTopicsError)
    return (
      <section className="flex flex-col gap-y-4 text-muted-foreground">
        <span className="text-muted-foreground">
          It should be fixed shortly
        </span>
        <p>Error: {getAllTopicsError}</p>
      </section>
    )
  }

  if (!allTopics) {
    return (
      <section className="flex flex-col gap-y-4 text-muted-foreground">
        <span className="text-muted-foreground">
          It should be fixed shortly
        </span>
      </section>
    )
  }

  const topicItems = sampleSize(allTopics, 6)

  return (
    <section className="flex flex-col gap-y-4">
      <span className="flex flex-col gap-y-2">
        <span className="flex items-center justify-between">
          <Link
            href={"/stories/topics"}
            className="page-title-font w-fit text-2xl"
          >
            Topics
          </Link>
          <SeeAllButton href="/stories/topics" />
        </span>
        <Separator className="bg-input" />
      </span>

      <TopicsGrid topics={topicItems} />
    </section>
  )
}
