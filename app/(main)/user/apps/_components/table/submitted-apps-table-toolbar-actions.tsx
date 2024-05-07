"use client"

import { useRouter } from "next/navigation"
import { DownloadIcon, ReloadIcon } from "@radix-ui/react-icons"
import { type Table } from "@tanstack/react-table"

import { App } from "@/types/db_tables"
import { Button } from "@/components/ui/button"

import { exportTableToCSV } from "../../_lib/export"
// import { CreateTaskDialog } from "./create-task-dialog"
import { DeleteAppsDialog } from "./submitted-apps-actions-dialog"

interface SubmittedAppsTableToolbarActionsProps {
  table: Table<App>
}

export function TasksTableToolbarActions({
  table,
}: SubmittedAppsTableToolbarActionsProps) {
  const router = useRouter()
  return (
    <div className="flex items-center gap-2">
      {/* table.getFilteredSelectedRowModel().rows.length > 0 */}
      {table.getFilteredSelectedRowModel().rows.length > 0 ? (
        <DeleteAppsDialog
          triggerClassName="h-8"
          apps={table.getFilteredSelectedRowModel().rows}
          onSuccess={() => table.toggleAllPageRowsSelected(false)}
        />
      ) : null}
      {/* <CreateTaskDialog prevTasks={table.getFilteredRowModel().rows} /> */}
      <Button
        variant="outline"
        size="sm"
        className="ml-auto h-8 active:scale-[0.98] lg:flex"
        onClick={() => router.refresh()}
      >
        <ReloadIcon className="mr-1 size-4" aria-hidden="true" />
        Reload
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="ml-auto h-8 active:scale-[0.98] lg:flex"
        onClick={() =>
          exportTableToCSV(table, {
            filename: "submitted_apps",
            excludeColumns: ["select", "actions"],
          })
        }
      >
        <DownloadIcon className="mr-1 size-4" aria-hidden="true" />
        Export
      </Button>
      {/**
       * Other actions can be added here.
       * For example, export, import, etc.
       */}
    </div>
  )
}
