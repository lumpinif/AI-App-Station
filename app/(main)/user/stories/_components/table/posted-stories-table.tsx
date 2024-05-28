"use client"

import { useMemo } from "react"

import { DataTableFilterField } from "@/types/data-table"
import { PostWithProfile } from "@/types/db_tables"
import { getStatusIcon } from "@/lib/get-status-icon"
import { useDataTable } from "@/hooks/data-table/use-data-table"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar"

import { getPostedStoriesTableColumns } from "./posted-stories-columns"
import { StoriesTableFloatingBar } from "./posted-stories-floating-bar"
import { StoriesTableToolbarActions } from "./posted-stories-table-toolbar-actions"

interface PostedStoriesTableProps {
  posts: PostWithProfile[]
  pageCount: number
  totalPostsCount: number
}

export function PostedStoriesTable({
  posts,
  pageCount,
  totalPostsCount,
}: PostedStoriesTableProps) {
  // Feature flags for showcasing some additional features. Feel free to remove them.

  // const { featureFlags } = useTasksTable()

  // Memoize the columns so they don't re-render on every render
  const columns = useMemo(() => getPostedStoriesTableColumns(), [])

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
  const filterFields: DataTableFilterField<PostWithProfile>[] = [
    {
      label: "Title",
      value: "post_title",
      placeholder: "Filter Story titles ...",
    },
    {
      label: "Status",
      value: "post_publish_status",
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
    data: posts,
    columns,
    pageCount,
    // optional props
    filterFields,
    // enableAdvancedFilter: featureFlags.includes("advancedFilter"),
    defaultPerPage: 10,
    defaultSort: "created_at.desc",
  })

  // THIS IS FOR THE VIEW OPTIONS
  const storyColumnsTitles = {
    post_title: "Title",
    post_publish_status: "Status",
    likes_count: "Likes",
    views_count: "Views",
    created_at: "Created At",
  }

  return (
    <div className="w-full space-y-5">
      {/* TODO: Implement the advanced filter */}
      {/* {featureFlags.includes("advancedFilter") ? (
        <DataTableAdvancedToolbar table={table} filterFields={filterFields}>
          <TasksTableToolbarActions table={table} />
        </DataTableAdvancedToolbar>
      ) : ( */}
      <DataTableToolbar
        table={table}
        filterFields={filterFields}
        columnsTitles={storyColumnsTitles}
      >
        <StoriesTableToolbarActions table={table} />
      </DataTableToolbar>
      {/* )} */}
      <DataTable
        table={table}
        floatingBar={
          // featureFlags.includes("floatingBar") ? (
          <StoriesTableFloatingBar table={table} />
          // ) : null
        }
        itemsName="stories"
        totalItemsCount={totalPostsCount}
      />
    </div>
  )
}
