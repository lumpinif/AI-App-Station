import * as React from "react"
import { Cross2Icon, DownloadIcon, TrashIcon } from "@radix-ui/react-icons"
import { type Table } from "@tanstack/react-table"

import { Apps } from "@/types/db_tables"
import { exportTableToCSV } from "@/lib/export"
import { getStatusColor, getStatusIcon } from "@/lib/get-status-icon"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Kbd } from "@/components/shared/kbd"

import {
  DeleteAppsDialog,
  PublishAppsDialog,
  UnpublishAppsDialog,
} from "./submitted-apps-actions-dialog"

interface SubmittedAppsTableFloatingBarProps {
  table: Table<Apps>
}

export function SubmittedAppsTableFloatingBar({
  table,
}: SubmittedAppsTableFloatingBarProps) {
  const rows = table.getFilteredSelectedRowModel().rows
  const [isPending, startTransition] = React.useTransition()

  const [showDeleteAppDialog, setShowDeleteAppDialog] = React.useState(false)
  const [showUnpublishAppDialog, setShowUnpublishAppDialog] =
    React.useState(false)
  const [showPublishAppDialog, setShowPublishAppDialog] = React.useState(false)

  const UnpublishIcon = getStatusIcon("unpublished")
  const UnpublishStatusColor = getStatusColor("unpublished")
  const PublishIcon = getStatusIcon("published")
  const PublishStatusColor = getStatusColor("published")

  // Clear selection on Escape key press
  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        table.toggleAllRowsSelected(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [table])

  return (
    <>
      <DeleteAppsDialog
        open={showDeleteAppDialog}
        onOpenChange={setShowDeleteAppDialog}
        apps={rows}
        showTrigger={false}
        onSuccess={() => table.toggleAllRowsSelected(false)}
      />
      <UnpublishAppsDialog
        open={showUnpublishAppDialog}
        onOpenChange={setShowUnpublishAppDialog}
        apps={rows}
        showTrigger={false}
        onSuccess={() => table.toggleAllRowsSelected(false)}
      />
      <PublishAppsDialog
        open={showPublishAppDialog}
        onOpenChange={setShowPublishAppDialog}
        apps={rows}
        showTrigger={false}
        onSuccess={() => table.toggleAllRowsSelected(false)}
      />
      <div className="fixed inset-x-0 bottom-5 z-50 w-dvw px-4">
        <div className="w-full ">
          <div className="bg-card sm:glass-card-background dark:shadow-outline mx-auto flex w-fit items-center gap-2 rounded-full border p-2 px-4 py-4 shadow-2xl backdrop-blur-lg">
            <div className="dark:bg-accent border-primary flex h-7 items-center rounded-lg border border-dashed pl-2.5 pr-1">
              <span className="whitespace-nowrap text-xs">
                {rows.length} selected
              </span>
              <Separator orientation="vertical" className="ml-2 mr-1" />
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-5 hover:border"
                    onClick={() => table.toggleAllRowsSelected(false)}
                  >
                    <Cross2Icon
                      className="size-3.5 shrink-0"
                      aria-hidden="true"
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-background text-foreground flex items-center border font-semibold">
                  <p className="mr-2">Clear selection</p>
                  <Kbd abbrTitle="Escape" variant="outline">
                    Esc
                  </Kbd>
                </TooltipContent>
              </Tooltip>
            </div>
            <Separator orientation="vertical" className="hidden h-5 sm:block" />
            <div className="flex items-center gap-1.5">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="size-7 border"
                    onClick={() => setShowPublishAppDialog(true)}
                    disabled={isPending}
                  >
                    <PublishIcon className={cn("size-4")} aria-hidden="true" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-background text-foreground border font-semibold">
                  <p
                    className={PublishStatusColor}
                  >{`Publish ${rows.length > 1 ? "Apps" : "App"}`}</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="size-7 border"
                    onClick={() => setShowUnpublishAppDialog(true)}
                    disabled={isPending}
                  >
                    <UnpublishIcon
                      className={cn("size-4")}
                      aria-hidden="true"
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-background text-foreground border font-semibold">
                  <p
                    className={UnpublishStatusColor}
                  >{`Unpublish ${rows.length > 1 ? "Apps" : "App"}`}</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="size-7 border"
                    onClick={() => {
                      startTransition(() => {
                        exportTableToCSV(table, {
                          excludeColumns: ["select", "actions"],
                          onlySelected: true,
                        })
                      })
                    }}
                    disabled={isPending}
                  >
                    <DownloadIcon className="size-4" aria-hidden="true" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-background text-foreground border font-semibold">
                  <p>{`Export ${rows.length > 1 ? "Apps" : "App"}`}</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="size-7 border"
                    onClick={() => setShowDeleteAppDialog(true)}
                    disabled={isPending}
                  >
                    <TrashIcon
                      className="size-4 text-red-500"
                      aria-hidden="true"
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-background text-foreground border font-semibold">
                  <p className="text-red-500">{`Delete ${rows.length > 1 ? "Apps" : "App"}`}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
