import { Suspense } from "react"

import { SearchParams } from "@/types/data-table"
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton"
import { DateRangePicker } from "@/components/shared/date-range-picker"

import { UserPagesWrapper } from "../_components/layout/user-pages-wrapper"
import { SubmittedAppsTable } from "./_components/table/submitted-apps-table"
import { getSubmittedApps } from "./_lib/db-queries"
import { searchParamsSchema } from "./_lib/validations"

type UserPageProps = {
  searchParams: SearchParams
}

export default async function UserAppsPage({ searchParams }: UserPageProps) {
  const search = searchParamsSchema.parse(searchParams)

  const { apps, pageCount } = await getSubmittedApps(search)
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
            columnCount={5}
            searchableColumnCount={1}
            filterableColumnCount={1}
            cellWidths={["10rem", "15rem", "12rem", "12rem", "8rem"]}
            shrinkZero
          />
        }
      >
        <SubmittedAppsTable apps={apps} pageCount={pageCount} />
      </Suspense>
    </main>
  )
}
