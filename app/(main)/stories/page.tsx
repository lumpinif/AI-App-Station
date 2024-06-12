import { PageTitle } from "@/components/layout/page-title"

export default function StoriesPage() {
  return (
    <section className="flex flex-col gap-y-4 sm:my-4 md:my-8 md:gap-y-6 lg:my-10 lg:gap-y-8">
      <PageTitle
        href="/stories"
        subtitlePos="bottom"
        title="Browse Stories"
        subtitle="Discover brilliant stories written by the community"
      />
    </section>
  )
}
