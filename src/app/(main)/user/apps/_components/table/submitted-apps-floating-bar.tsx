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
  DraftAppsDialog,
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
  const [showDraftAppDialog, setShowDraftAppDialog] = React.useState(false)

  const UnpublishIcon = getStatusIcon("unpublished")
  const UnpublishStatusColor = getStatusColor("unpublished")
  const PublishIcon = getStatusIcon("published")
  const PublishStatusColor = getStatusColor("published")
  const DraftIcon = getStatusIcon("draft")
  const DraftStatusColor = getStatusColor("draft")

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
        apps={rows}
        showTrigger={false}
        open={showDeleteAppDialog}
        onOpenChange={setShowDeleteAppDialog}
        onSuccess={() => table.toggleAllRowsSelected(false)}
      />
      <UnpublishAppsDialog
        apps={rows}
        showTrigger={false}
        open={showUnpublishAppDialog}
        onOpenChange={setShowUnpublishAppDialog}
        onSuccess={() => table.toggleAllRowsSelected(false)}
      />
      {/* <PublishAppsDialog
        apps={rows}
        showTrigger={false}
        open={showPublishAppDialog}
        onOpenChange={setShowPublishAppDialog}
        onSuccess={() => table.toggleAllRowsSelected(false)}
      /> */}
      <DraftAppsDialog
        apps={rows}
        showTrigger={false}
        open={showDraftAppDialog}
        onOpenChange={setShowDraftAppDialog}
        onSuccess={() => table.toggleAllRowsSelected(false)}
      />
      <div className="fixed inset-x-0 bottom-5 z-50 w-dvw px-4">
        <div className="w-full">
          <div className="sm:glass-card-background mx-auto flex w-fit items-center gap-2 rounded-full border bg-card p-2 px-4 py-4 shadow-2xl backdrop-blur-lg dark:shadow-outline">
            <div className="flex h-7 items-center rounded-lg border border-dashed border-primary pl-2.5 pr-1 dark:bg-accent">
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
                <TooltipContent className="flex items-center border bg-background font-semibold text-foreground">
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
                <TooltipTrigger className="cursor-not-allowed">
                  <Button
                    size="icon"
                    disabled={
                      true
                      // isPending
                    }
                    variant="secondary"
                    className="size-7 border"
                    onClick={() => setShowPublishAppDialog(true)}
                  >
                    <PublishIcon
                      className={cn("size-4", PublishStatusColor)}
                      aria-hidden="true"
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="border bg-background font-semibold text-foreground">
                  <p
                    className={PublishStatusColor}
                  >{`Please publish ${rows.length > 1 ? "apps" : "app"} in the edit`}</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="size-7 border"
                    onClick={() => setShowDraftAppDialog(true)}
                    disabled={isPending}
                  >
                    <DraftIcon
                      className={cn("size-4", DraftStatusColor)}
                      aria-hidden="true"
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="border bg-background font-semibold text-foreground">
                  <p
                    className={DraftStatusColor}
                  >{`Draft ${rows.length > 1 ? "Apps" : "App"}`}</p>
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
                      className={cn("size-4", UnpublishStatusColor)}
                      aria-hidden="true"
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="border bg-background font-semibold text-foreground">
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
                <TooltipContent className="border bg-background font-semibold text-foreground">
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
                      className={cn(
                        "size-4 text-red-600",
                        UnpublishStatusColor
                      )}
                      aria-hidden="true"
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="border bg-background font-semibold text-foreground">
                  <p
                    className={cn("text-red-600", UnpublishStatusColor)}
                  >{`Delete ${rows.length > 1 ? "Apps" : "App"}`}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
