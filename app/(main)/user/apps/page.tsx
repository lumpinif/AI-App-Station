import { Suspense } from "react"
import { getSubmittedApps } from "@/server/queries/supabase/table/apps-table-services"

import { SearchParams } from "@/types/data-table"
import { appsSearchParamsSchema } from "@/lib/validations"
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton"
import { DateRangePicker } from "@/components/shared/date-range-picker"

import { UserPagesTitle } from "../_components/layout/user-pages-title"
import { SubmittedAppsTable } from "./_components/table/submitted-apps-table"

type UserPageProps = {
  searchParams: SearchParams
}

export default async function UserAppsPage({ searchParams }: UserPageProps) {
  const search = appsSearchParamsSchema.parse(searchParams)

  const { apps, pageCount, totalAppsCount } = await getSubmittedApps(search)
  return (
    <div>
      <UserPagesTitle className="mb-4 text-2xl font-semibold sm:text-3xl md:text-4xl">
        <DateRangePicker
          align="end"
          sideOffset={10}
          className="p-1"
          triggerSize="sm"
          triggerVariant={"outline"}
          triggerClassName="mr-auto w-64 text-muted-foreground"
          PopoverContentClassName="bg-card/70 p-4 backdrop-blur-lg"
        />
      </UserPagesTitle>

      <Suspense
        fallback={
          <DataTableSkeleton
            columnCount={7}
            searchableColumnCount={1}
            filterableColumnCount={1}
            cellWidths={[
              "4rem",
              "7rem",
              "6rem",
              "6rem",
              "4rem",
              "4rem",
              "3rem",
            ]}
            shrinkZero
          />
        }
      >
        <SubmittedAppsTable
          apps={apps}
          pageCount={pageCount}
          totalAppsCount={totalAppsCount}
        />
      </Suspense>
    </div>
  )
}
