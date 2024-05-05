import * as React from "react"
import {
  ArrowUpIcon,
  CheckCircledIcon,
  Cross2Icon,
  DownloadIcon,
  TrashIcon,
} from "@radix-ui/react-icons"
import { SelectTrigger } from "@radix-ui/react-select"
import { type Table } from "@tanstack/react-table"
import { Rocket } from "lucide-react"

import { App } from "@/types/db_tables"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Kbd } from "@/components/shared/kbd"

import { exportTableToCSV } from "../../_lib/export"
import { getStatusColor, getStatusIcon } from "../../_lib/utils"
import {
  deleteApps,
  DeleteAppsDialog,
  publishApps,
  PublishAppsDialog,
  UnpublishAppsDialog,
} from "./app-actions-dialog"

interface TasksTableFloatingBarProps {
  table: Table<App>
}

export function TasksTableFloatingBar({ table }: TasksTableFloatingBarProps) {
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
      <div className="fixed inset-x-0 bottom-5 z-50 w-full px-4">
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
                  <p className={PublishStatusColor}>Publish Apps</p>
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
                  <p className={UnpublishStatusColor}>Unpublish Apps</p>
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
                  <p>Export Apps</p>
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
                  <p className="text-red-500">Delete Apps</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
