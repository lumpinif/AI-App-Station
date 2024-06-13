import { getAllTopics } from "@/server/queries/supabase/stories"

import { PageTitle } from "@/components/layout/page-title"

import { TopicsGrid } from "../_components/topics/topics-grid"

export default async function AllTopicsPage() {
  const { topics: allTopics, error: getAllTopicsError } = await getAllTopics()

  if (getAllTopicsError) {
    // TODO: HANDLE ERROR BEFORE PRODUCTION
    console.error(getAllTopicsError)
  }

  if (!allTopics)
    return (
      <section className="flex flex-col gap-y-4">
        <PageTitle
          href="/stories"
          subtitlePos="bottom"
          title="No Topics found"
          subtitle="All topics about the stories written by the community"
        />

        <span className="text-muted-foreground">
          It should be fixed shortly
        </span>
      </section>
    )

  return (
    <section className="flex flex-col gap-y-4">
      <PageTitle
        href="/stories"
        subtitlePos="bottom"
        title="All Topics"
        subtitle="All topics about the stories written by the community"
      />

      <TopicsGrid topics={allTopics} />
    </section>
  )
}
