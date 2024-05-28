"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DownloadIcon, ReloadIcon } from "@radix-ui/react-icons"
import { type Table } from "@tanstack/react-table"

import { PostWithProfile } from "@/types/db_tables"
import { exportTableToCSV } from "@/lib/export"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// import { CreateTaskDialog } from "./create-task-dialog"
import { DeleteStoriesDialog } from "./posted-stories-actions-dialog"

interface StoriesTableToolbarActionsProps {
  table: Table<PostWithProfile>
}

export function StoriesTableToolbarActions({
  table,
}: StoriesTableToolbarActionsProps) {
  const router = useRouter()
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (isRefreshing) {
      router.refresh()
      timer = setTimeout(() => {
        setIsRefreshing(false)
      }, 600) // Adjust the delay as needed
    }

    return () => {
      clearTimeout(timer)
    }
  }, [isRefreshing, router])

  return (
    <div className="flex items-center gap-2">
      {/* table.getFilteredSelectedRowModel().rows.length > 0 */}
      {table.getFilteredSelectedRowModel().rows.length > 0 ? (
        <DeleteStoriesDialog
          triggerClassName="h-8"
          posts={table.getFilteredSelectedRowModel().rows}
          onSuccess={() => table.toggleAllPageRowsSelected(false)}
        />
      ) : null}
      {/* TODO: IMPORTANT- CREATE THE CREATE APP DIALOG BEFORE PRODUCTION */}
      {/* <CreateTaskDialog prevTasks={table.getFilteredRowModel().rows} /> */}
      <Button
        variant="outline"
        size="sm"
        className="ml-auto h-8 active:scale-[0.98] lg:flex"
        onClick={() => setIsRefreshing(true)}
        disabled={isRefreshing}
      >
        <ReloadIcon
          className={cn("mr-1 size-4", isRefreshing && " animate-spin")}
          aria-hidden="true"
        />
        Reload
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="ml-auto h-8 active:scale-[0.98] lg:flex"
        onClick={() =>
          exportTableToCSV(table, {
            filename: "posted_stories",
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
