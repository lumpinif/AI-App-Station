"use client"

import { useState, useTransition } from "react"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { ColumnDef } from "@tanstack/react-table"
import { Delete } from "lucide-react"
import moment from "moment"
import { toast } from "sonner"

import { App, publish_status } from "@/types/db_tables"
import { cn } from "@/lib/utils"
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
import { AppIcon } from "@/app/(main)/ai-apps/_components/cards/_components/app-icon"

import { getStatusIcon } from "../../_lib/utils"
import { DeleteAppsDialog } from "./app-action-sheet"

export function getSubmittedAppsTableColumns(): ColumnDef<App>[] {
  return [
    {
      id: "select",
      size: 20,
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-0.5"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-0.5"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "app_icon_src",
      size: 20,
      header: "Icon",
      cell: ({ row }) => {
        const app_title = row.original.app_title as App["app_title"]
        const app_slug = row.original.app_slug as App["app_slug"]
        const app_icon_src = row.original.app_icon_src as App["app_icon_src"]

        return (
          <AppIcon
            size={10}
            className="rounded-lg"
            app_title={app_title}
            app_slug={app_slug}
            app_icon_src={app_icon_src}
          />
        )
      },
    },
    {
      accessorKey: "app_title",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Title" />
      ),
      cell: ({ row }) => {
        const app_title = row.original.app_title as App["app_title"]

        return (
          <div className="flex max-w-60">
            {/* {app_title && <Badge variant="outline">{app_title}</Badge>} */}
            <span className="w-full truncate font-normal">{app_title}</span>
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
        const statusColor = {
          draft: "text-muted-foreground",
          pending: "text-yellow-500",
          published: "text-green-500",
          unpublished: "text-red-500",
        }

        return (
          <Badge
            variant={"secondary"}
            className={cn("flex w-fit items-center bg-transparent")}
          >
            <Icon
              className={cn(
                "text-muted-foreground mr-2 size-4",
                statusColor[status]
              )}
              aria-hidden="true"
            />
            <span className={cn("font-normal capitalize", statusColor[status])}>
              {status}
            </span>
          </Badge>
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
                  <span className="text-red-500">Delete</span>
                  <DropdownMenuShortcut>
                    <Delete className="size-4 text-red-500" />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )
      },
    },
  ]
}
