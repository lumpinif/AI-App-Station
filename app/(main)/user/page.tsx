import { Suspense } from "react"
import { getUserData } from "@/server/auth"

import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton"
import { DateRangePicker } from "@/components/shared/date-range-picker"

import { SubmittedAppsTable } from "./_components/table/submitted-apps-table"
import { Dashboard } from "./_components/user-page/user-page-wrapper"
import { getSubmittedApps } from "./_lib/db-queries"
import { searchParamsSchema } from "./_lib/validations"

type SearchParams = {
  [key: string]: string | string[] | undefined
}

type UserPageProps = {
  searchParams: SearchParams
}

export default async function UserPage({ searchParams }: UserPageProps) {
  // const {
  //   data: { user },
  // } = await getUserData()

  // if (!user?.id) {
  //   return "no user"
  // }

  const search = searchParamsSchema.parse(searchParams)

  const { apps, pageCount } = await getSubmittedApps(search)

  return (
    <main className="flex flex-col gap-4 sm:pl-6 xl:pl-8 2xl:pl-10">
      <Dashboard>
        <DateRangePicker
          triggerSize="sm"
          triggerClassName="ml-auto w-56 sm:w-60"
          align="end"
        />

        <Suspense
          fallback={
            <DataTableSkeleton
              columnCount={3}
              searchableColumnCount={1}
              filterableColumnCount={2}
              cellWidths={["10rem", "40rem", "12rem", "12rem", "8rem"]}
              shrinkZero
            />
          }
        >
          {/**
           * Passing promises and consuming them using React.use for triggering the suspense fallback.
           * @see https://react.dev/reference/react/use
           */}
          <SubmittedAppsTable apps={apps} pageCount={pageCount} />
        </Suspense>
      </Dashboard>
    </main>
  )
}
