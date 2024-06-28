import { Metadata } from "next"
import { getUserProfile } from "@/server/auth"

import { SearchParams } from "@/types/data-table"
import { checkIsSuperUser } from "@/lib/utils"
import { postsSearchParamsSchema } from "@/lib/validations"
import { DateRangePicker } from "@/components/shared/date-range-picker"

import { DailyPostsCardsGrid } from "./_components/daily-posts-cards-grid"

type UserPageProps = {
  searchParams: SearchParams
}

export const metadata: Metadata = {
  title: "Your daily stories | AI Stories and AI Apps",
}

export default async function DailyPostsPage({ searchParams }: UserPageProps) {
  const search = postsSearchParamsSchema.parse(searchParams)

  const { profile } = await getUserProfile()
  const isSuperUser = checkIsSuperUser(profile?.profile_role?.role)

  if (!isSuperUser || !profile) {
    return <div>You need to be verified creator to see this page</div>
  }

  return (
    <div className="w-full">
      <DateRangePicker
        align="start"
        sideOffset={10}
        triggerSize="sm"
        triggerVariant={"outline"}
        PopoverContentClassName="bg-card/70 p-4 backdrop-blur-lg"
        triggerClassName="mr-auto w-64 text-muted-foreground"
      />
      <DailyPostsCardsGrid searchParams={search} profile={profile} />
    </div>
  )
}
