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

import { App } from "@/types/db_tables"
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
import { deleteApps } from "./app-action-sheet"

interface TasksTableFloatingBarProps {
  table: Table<App>
}

export function TasksTableFloatingBar({ table }: TasksTableFloatingBarProps) {
  const rows = table.getFilteredSelectedRowModel().rows

  const [isPending, startTransition] = React.useTransition()

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
    <div className="fixed inset-x-0 bottom-4 z-50 w-full px-4">
      <div className="w-full overflow-x-auto">
        <div className="bg-card mx-auto flex w-fit items-center gap-2 rounded-md border p-2 shadow-2xl">
          <div className="flex h-7 items-center rounded-md border border-dashed pl-2.5 pr-1">
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
              <TooltipContent className="bg-accent text-foreground flex items-center border font-semibold dark:bg-zinc-900">
                <p className="mr-2">Clear selection</p>
                <Kbd abbrTitle="Escape" variant="outline">
                  Esc
                </Kbd>
              </TooltipContent>
            </Tooltip>
          </div>
          <Separator orientation="vertical" className="hidden h-5 sm:block" />
          <div className="flex items-center gap-1.5">
            {/* <Select
              onValueChange={(value: Task["status"]) => {
                startTransition(() => {
                  updateTasks({
                    rows,
                    status: value,
                    onSuccess: () => table.toggleAllRowsSelected(false),
                  })
                })
              }}
            >
              <Tooltip>
                <SelectTrigger asChild>
                  <TooltipTrigger asChild>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="data-[state=open]:bg-accent data-[state=open]:text-accent-foreground size-7 border"
                      disabled={isPending}
                    >
                      <CheckCircledIcon className="size-4" aria-hidden="true" />
                    </Button>
                  </TooltipTrigger>
                </SelectTrigger>
                <TooltipContent className=" bg-accent text-foreground border font-semibold dark:bg-zinc-900">
                  <p>Update status</p>
                </TooltipContent>
              </Tooltip>
              <SelectContent align="center">
                <SelectGroup>
                  {tasks.status.enumValues.map((status) => (
                    <SelectItem
                      key={status}
                      value={status}
                      className="capitalize"
                    >
                      {status}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select
              onValueChange={(value: Task["priority"]) => {
                startTransition(() => {
                  updateTasks({
                    rows,
                    priority: value,
                    onSuccess: () => table.toggleAllRowsSelected(false),
                  })
                })
              }}
            >
              <Tooltip>
                <SelectTrigger asChild>
                  <TooltipTrigger asChild>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="data-[state=open]:bg-accent data-[state=open]:text-accent-foreground size-7 border"
                      disabled={isPending}
                    >
                      <ArrowUpIcon className="size-4" aria-hidden="true" />
                    </Button>
                  </TooltipTrigger>
                </SelectTrigger>
                <TooltipContent className=" bg-accent text-foreground border font-semibold dark:bg-zinc-900">
                  <p>Update priority</p>
                </TooltipContent>
              </Tooltip>
              <SelectContent align="center">
                <SelectGroup>
                  {tasks.priority.enumValues.map((priority) => (
                    <SelectItem
                      key={priority}
                      value={priority}
                      className="capitalize"
                    >
                      {priority}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select> */}
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
              <TooltipContent className=" bg-accent text-foreground border font-semibold dark:bg-zinc-900">
                <p>Export Apps</p>
              </TooltipContent>
            </Tooltip>
            {/* TODO: ADD DELETE WITH DIALOG CONFIRMATION */}
            {/* <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="size-7 border"
                  onClick={() => {
                    startTransition(() => {
                      deleteApps({
                        rows,
                        onSuccess: () => table.toggleAllRowsSelected(false),
                      })
                    })
                  }}
                  disabled={isPending}
                >
                  <TrashIcon className="size-4" aria-hidden="true" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className=" bg-accent text-foreground border font-semibold dark:bg-zinc-900">
                <p>Delete Apps</p>
              </TooltipContent>
            </Tooltip> */}
          </div>
        </div>
      </div>
    </div>
  )
}
