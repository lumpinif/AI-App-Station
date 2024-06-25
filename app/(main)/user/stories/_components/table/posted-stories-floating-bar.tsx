import * as React from "react"
import { Cross2Icon, DownloadIcon, TrashIcon } from "@radix-ui/react-icons"
import { type Table } from "@tanstack/react-table"

import { PostDetails } from "@/types/db_tables"
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
  DeleteStoriesDialog,
  DraftStoriesDialog,
  PublishStoriesDialog,
  UnpublishStoriesDialog,
} from "./posted-stories-actions-dialog"

interface StoriesTableFloatingBarProps {
  table: Table<PostDetails>
}

export function StoriesTableFloatingBar({
  table,
}: StoriesTableFloatingBarProps) {
  const rows = table.getFilteredSelectedRowModel().rows
  const [isPending, startTransition] = React.useTransition()

  const [showDeleteStoryDialog, setShowDeleteStoryDialog] =
    React.useState(false)
  const [showUnpublishStoryDialog, setShowUnpublishStoryDialog] =
    React.useState(false)
  const [showPublishStoryDialog, setShowPublishStoryDialog] =
    React.useState(false)
  const [showDraftStoryDialog, setShowDraftStoryDialog] = React.useState(false)

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
      <DeleteStoriesDialog
        posts={rows}
        showTrigger={false}
        open={showDeleteStoryDialog}
        onOpenChange={setShowDeleteStoryDialog}
        onSuccess={() => table.toggleAllRowsSelected(false)}
      />
      <UnpublishStoriesDialog
        posts={rows}
        showTrigger={false}
        open={showUnpublishStoryDialog}
        onOpenChange={setShowUnpublishStoryDialog}
        onSuccess={() => table.toggleAllRowsSelected(false)}
      />
      <PublishStoriesDialog
        posts={rows}
        showTrigger={false}
        open={showPublishStoryDialog}
        onOpenChange={setShowPublishStoryDialog}
        onSuccess={() => table.toggleAllRowsSelected(false)}
      />
      <DraftStoriesDialog
        posts={rows}
        showTrigger={false}
        open={showDraftStoryDialog}
        onOpenChange={setShowDraftStoryDialog}
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
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="size-7 border"
                    onClick={() => setShowPublishStoryDialog(true)}
                    disabled={isPending}
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
                  >{`Publish ${rows.length > 1 ? "Stories" : "Story"}`}</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="size-7 border"
                    onClick={() => setShowDraftStoryDialog(true)}
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
                  >{`Draft ${rows.length > 1 ? "Stories" : "Story"}`}</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="size-7 border"
                    onClick={() => setShowUnpublishStoryDialog(true)}
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
                  >{`Unpublish ${rows.length > 1 ? "Stories" : "Story"}`}</p>
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
                  <p>{`Export ${rows.length > 1 ? "Stories" : "Story"}`}</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="size-7 border"
                    onClick={() => setShowDeleteStoryDialog(true)}
                    disabled={isPending}
                  >
                    <TrashIcon
                      className={cn("size-4", UnpublishStatusColor)}
                      aria-hidden="true"
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="border bg-background font-semibold text-foreground">
                  <p className="text-red-500">{`Delete ${rows.length > 1 ? "Stories" : "Story"}`}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
