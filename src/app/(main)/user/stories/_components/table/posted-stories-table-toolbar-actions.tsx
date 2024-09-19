"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DownloadIcon, ReloadIcon } from "@radix-ui/react-icons"
import { type Table } from "@tanstack/react-table"
import { Plus } from "lucide-react"

import { PostDetails } from "@/types/db_tables"
import { exportTableToCSV } from "@/lib/export"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { WriteNewStoryButton } from "@/app/(main)/story/_components/write-new-story-button"

// import { CreateTaskDialog } from "./create-task-dialog"
import { DeleteStoriesDialog } from "./posted-stories-actions-dialog"

interface StoriesTableToolbarActionsProps {
  table: Table<PostDetails>
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

      <WriteNewStoryButton
        size={"label"}
        variant={"outline"}
        motionClassName="gap-x-1"
        spinnerButtonCN="group border active:scale-[0.98]"
      >
        <Plus className="size-4 shrink-0 text-muted-foreground transition-all duration-200 ease-out group-hover:text-primary" />
        <span className="text-muted-foreground transition-all duration-200 ease-out group-hover:text-primary">
          New Story
        </span>
      </WriteNewStoryButton>

      <Button
        size="sm"
        variant="outline"
        className="group ml-auto h-8 active:scale-[0.98] lg:flex"
        disabled={isRefreshing}
        onClick={() => setIsRefreshing(true)}
      >
        <ReloadIcon
          aria-hidden="true"
          className={cn(
            "mr-1 size-4 text-muted-foreground group-hover:text-primary",
            isRefreshing && "animate-spin"
          )}
        />
        <span className="text-muted-foreground transition-all duration-200 ease-out group-hover:text-primary">
          Reload
        </span>
      </Button>

      <Button
        variant="outline"
        size="sm"
        className="group ml-auto h-8 active:scale-[0.98] lg:flex"
        onClick={() =>
          exportTableToCSV(table, {
            filename: "posted_stories",
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
