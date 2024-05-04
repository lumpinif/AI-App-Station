"use client"

import { useState, useTransition } from "react"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { ColumnDef } from "@tanstack/react-table"
import moment from "moment"
import { toast } from "sonner"

import { App, publish_status } from "@/types/db_tables"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"

import { getStatusIcon } from "../../_lib/utils"
import { DeleteAppsDialog } from "./app-action-sheet"

export function getSubmittedAppsTableColumns(): ColumnDef<App>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          // className="translate-y-0.5"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          // className="translate-y-0.5"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "app_title",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Title" />
      ),
      cell: ({ row }) => {
        const app_title = row.original.app_title as App["app_title"]

        return (
          <div className="flex space-x-2">
            {/* {app_title && <Badge variant="outline">{app_title}</Badge>} */}
            <span className="max-w-[31.25rem] truncate font-medium">
              {app_title}
            </span>
          </div>
        )
      },
    },
    {
      accessorKey: "app_publish_status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const status = row.original.app_publish_status as publish_status

        if (!status) return null

        const Icon = getStatusIcon(status)

        return (
          <div className="flex w-[6.25rem] items-center">
            <Icon
              className="text-muted-foreground mr-2 size-4"
              aria-hidden="true"
            />
            <span className="capitalize">{status}</span>
          </div>
        )
      },
      filterFn: (row, id, value) => {
        return Array.isArray(value) && value.includes(row.getValue(id))
      },
    },
    {
      accessorKey: "created_at",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Created At" />
      ),
      cell: ({ cell }) => moment(cell.getValue() as Date).format("MMM D, YYYY"),
    },
    {
      id: "actions",
      cell: function Cell({ row }) {
        const [isUpdatePending, startUpdateTransition] = useTransition()

        const [showDeleteAppDialog, setShowDeleteAppDialog] = useState(false)

        return (
          <>
            <DeleteAppsDialog
              open={showDeleteAppDialog}
              onOpenChange={setShowDeleteAppDialog}
              apps={[row]}
              showTrigger={false}
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  aria-label="Open menu"
                  variant="ghost"
                  className="data-[state=open]:bg-muted flex size-8 p-0"
                >
                  <DotsHorizontalIcon className="size-4" aria-hidden="true" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                {/* <DropdownMenuSeparator /> */}
                <DropdownMenuItem onSelect={() => setShowDeleteAppDialog(true)}>
                  Delete
                  <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )
      },
    },
  ]
}
