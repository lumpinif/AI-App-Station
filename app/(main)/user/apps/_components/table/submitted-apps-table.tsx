"use client"

import { useMemo } from "react"

import { DataTableFilterField } from "@/types/data-table"
import { App } from "@/types/db_tables"
import { useDataTable } from "@/hooks/data-table/use-data-table"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar"

import { getStatusIcon } from "../../_lib/utils"
import { getSubmittedAppsTableColumns } from "./submitted-apps-columns"
import { TasksTableFloatingBar } from "./submitted-apps-floating-bar"
import { TasksTableToolbarActions } from "./submitted-apps-table-toolbar-actions"

interface SubmittedAppsTableProps {
  apps: App[]
  pageCount: number
  totalAppsCount: number
}

export function SubmittedAppsTable({
  apps,
  pageCount,
  totalAppsCount,
}: SubmittedAppsTableProps) {
  // Feature flags for showcasing some additional features. Feel free to remove them.

  // const { featureFlags } = useTasksTable()

  // Memoize the columns so they don't re-render on every render
  const columns = useMemo(() => getSubmittedAppsTableColumns(), [])

  /**
   * This component can render either a faceted filter or a search filter based on the `options` prop.
   *
   * @prop options - An array of objects, each representing a filter option. If provided, a faceted filter is rendered. If not, a search filter is rendered.
   *
   * Each `option` object has the following properties:
   * @prop {string} label - The label for the filter option.
   * @prop {string} value - The value for the filter option.
   * @prop {React.ReactNode} [icon] - An optional icon to display next to the label.
   * @prop {boolean} [withCount] - An optional boolean to display the count of the filter option.
   */
  const filterFields: DataTableFilterField<App>[] = [
    {
      label: "Title",
      value: "app_title",
      placeholder: "Filter App titles ...",
    },
    {
      label: "Status",
      value: "app_publish_status",
      options: [
        {
          label: "Pending",
          value: "pending",
          icon: getStatusIcon("pending"),
          withCount: true,
        },
        {
          label: "Published",
          value: "published",
          icon: getStatusIcon("published"),
          withCount: true,
        },
        {
          label: "Draft",
          value: "draft",
          icon: getStatusIcon("draft"),
          withCount: true,
        },
        {
          label: "Unpublished",
          value: "unpublished",
          icon: getStatusIcon("unpublished"),
          withCount: true,
        },
      ],
    },
  ]

  const { table } = useDataTable({
    data: apps,
    columns,
    pageCount,
    // optional props
    filterFields,
    // enableAdvancedFilter: featureFlags.includes("advancedFilter"),
    defaultPerPage: 10,
    defaultSort: "app_publish_status.asc",
  })

  return (
    <div className="w-full space-y-5">
      {/* TODO: Implement the advanced filter */}
      {/* {featureFlags.includes("advancedFilter") ? (
        <DataTableAdvancedToolbar table={table} filterFields={filterFields}>
          <TasksTableToolbarActions table={table} />
        </DataTableAdvancedToolbar>
      ) : ( */}
      <DataTableToolbar table={table} filterFields={filterFields}>
        <TasksTableToolbarActions table={table} />
      </DataTableToolbar>
      {/* )} */}
      <DataTable
        table={table}
        floatingBar={
          // featureFlags.includes("floatingBar") ? (
          <TasksTableFloatingBar table={table} />
          // ) : null
        }
        totalAppsCount={totalAppsCount}
      />
    </div>
  )
}
