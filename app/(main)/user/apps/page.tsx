import { Suspense } from "react"

import { SearchParams } from "@/types/data-table"
import { appsSearchParamsSchema } from "@/lib/validations"
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton"
import { DateRangePicker } from "@/components/shared/date-range-picker"

import { SubmittedAppsTable } from "./_components/table/submitted-apps-table"
import { getSubmittedApps } from "./_lib/db-queries"

type UserPageProps = {
  searchParams: SearchParams
}

export default async function UserAppsPage({ searchParams }: UserPageProps) {
  const search = appsSearchParamsSchema.parse(searchParams)

  const { apps, pageCount, totalAppsCount } = await getSubmittedApps(search)
  return (
    <main>
      <DateRangePicker
        PopoverContentClassName="bg-card/70 p-4 backdrop-blur-lg"
        triggerSize="sm"
        triggerVariant={"outline"}
        triggerClassName="mr-auto w-64 text-muted-foreground"
        align="start"
        sideOffset={10}
        className="p-1"
      />

      <Suspense
        fallback={
          <DataTableSkeleton
            columnCount={7}
            searchableColumnCount={1}
            filterableColumnCount={1}
            cellWidths={[
              "5rem",
              "7rem",
              "7rem",
              "6rem",
              "5rem",
              "5rem",
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
    </main>
  )
}
