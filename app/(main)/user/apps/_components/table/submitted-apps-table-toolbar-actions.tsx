"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DownloadIcon, ReloadIcon } from "@radix-ui/react-icons"
import { type Table } from "@tanstack/react-table"
import { Upload } from "lucide-react"

import { Apps } from "@/types/db_tables"
import { exportTableToCSV } from "@/lib/export"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { AppSubmitButton } from "@/components/submit/app-submit-button"

// import { CreateTaskDialog } from "./create-task-dialog"
import { DeleteAppsDialog } from "./submitted-apps-actions-dialog"

interface SubmittedAppsTableToolbarActionsProps {
  table: Table<Apps>
}

export function SubmittedAppsTableToolbarActions({
  table,
}: SubmittedAppsTableToolbarActionsProps) {
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
        <DeleteAppsDialog
          triggerClassName="h-8"
          apps={table.getFilteredSelectedRowModel().rows}
          onSuccess={() => table.toggleAllPageRowsSelected(false)}
        />
      ) : null}
      {/* TODO: IMPORTANT- CREATE THE CREATE APP DIALOG BEFORE PRODUCTION */}
      {/* <CreateTaskDialog prevTasks={table.getFilteredRowModel().rows} /> */}

      <AppSubmitButton
        size={"label"}
        variant={"outline"}
        className="group ml-auto h-8 active:scale-[0.98] lg:flex"
      >
        <div className="flex items-center gap-x-2">
          <Upload className="size-4 text-muted-foreground transition-all duration-200 ease-out group-hover:text-primary" />
          <span className="text-muted-foreground transition-all duration-200 ease-out group-hover:text-primary">
            New App
          </span>
        </div>
      </AppSubmitButton>

      <Button
        size="sm"
        variant="outline"
        disabled={isRefreshing}
        onClick={() => setIsRefreshing(true)}
        className="group ml-auto h-8 active:scale-[0.98] lg:flex"
      >
        <ReloadIcon
          aria-hidden="true"
          className={cn(
            "mr-1 size-4 text-muted-foreground transition-all duration-200 ease-out group-hover:text-primary",
            isRefreshing && "animate-spin"
          )}
        />
        <span className="text-muted-foreground transition-all duration-200 ease-out group-hover:text-primary">
          Reload
        </span>
      </Button>

      <Button
        size="sm"
        variant="outline"
        className="group ml-auto h-8 active:scale-[0.98] lg:flex"
        onClick={() =>
          exportTableToCSV(table, {
            filename: "submitted_apps",
            excludeColumns: ["select", "actions"],
          })
        }
      >
        <DownloadIcon
          aria-hidden="true"
          className="mr-1 size-4 text-muted-foreground transition-all duration-200 ease-out group-hover:text-primary"
        />
        <span className="text-muted-foreground transition-all duration-200 ease-out group-hover:text-primary">
          Export
        </span>
      </Button>

      {/**
       * Other actions can be added here.
       * For example, export, import, etc.
       */}
    </div>
  )
}
