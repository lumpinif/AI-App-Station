"use client"

import { useState, useTransition } from "react"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { ColumnDef } from "@tanstack/react-table"
import { Delete, Heart } from "lucide-react"
import moment from "moment"
import numeral from "numeral"
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
  DropdownMenuPortal,
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

import { getStatusColor, getStatusIcon } from "../../_lib/utils"
import {
  DeleteAppsDialog,
  PublishAppsDialog,
  UnpublishAppsDialog,
} from "./app-actions-dialog"

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
        const statusColor = getStatusColor(status)

        return (
          <div className={cn("flex w-fit items-center bg-transparent")}>
            <Icon
              className={cn("text-muted-foreground mr-2 size-4", statusColor)}
              aria-hidden="true"
            />
            <span className={cn("font-normal capitalize", statusColor)}>
              {status}
            </span>
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
      accessorKey: "likes_count",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Likes" />
      ),
      cell: ({ row }) => {
        const likes_count = row.original.likes_count as App["likes_count"]
        const formattedLikesCount = numeral(likes_count).format("0.[0]a")
        return (
          <div className="text-muted-foreground flex items-center gap-x-2">
            <Heart className="size-4" />
            <span className="w-full truncate font-normal">
              {formattedLikesCount}
            </span>
          </div>
        )
      },
    },
    {
      accessorKey: "views_count",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Views (no)" />
      ),
      cell: ({ row }) => {
        const views_count = row.original.views_count as App["views_count"]
        const formattedViewsCount = numeral(views_count).format("0.[0]a")
        return (
          <span className="text-muted-foreground w-full truncate font-normal">
            {formattedViewsCount}
          </span>
        )
      },
    },
    {
      id: "actions",
      cell: function Cell({ row }) {
        const [showDeleteAppDialog, setShowDeleteAppDialog] = useState(false)
        const [showUnpublishAppDialog, setShowUnpublishAppDialog] =
          useState(false)
        const [showPublishAppDialog, setShowPublishAppDialog] = useState(false)

        const UnpublishIcon = getStatusIcon("unpublished")
        const UnpublishStatusColor = getStatusColor("unpublished")
        const PublishIcon = getStatusIcon("published")
        const PublishStatusColor = getStatusColor("published")

        return (
          <>
            <DeleteAppsDialog
              open={showDeleteAppDialog}
              onOpenChange={setShowDeleteAppDialog}
              apps={[row]}
              showTrigger={false}
            />
            <UnpublishAppsDialog
              open={showUnpublishAppDialog}
              onOpenChange={setShowUnpublishAppDialog}
              apps={[row]}
              showTrigger={false}
            />
            <PublishAppsDialog
              open={showPublishAppDialog}
              onOpenChange={setShowPublishAppDialog}
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
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Update Status</DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem
                        onSelect={() => setShowPublishAppDialog(true)}
                      >
                        <PublishIcon
                          className={cn("mr-2 size-4", PublishStatusColor)}
                        />
                        <span className={PublishStatusColor}>
                          Publish the app
                        </span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onSelect={() => setShowUnpublishAppDialog(true)}
                      >
                        <UnpublishIcon
                          className={cn("mr-2 size-4", UnpublishStatusColor)}
                        />
                        <span className={UnpublishStatusColor}>
                          Unpublish the app
                        </span>
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                {/* <DropdownMenuSeparator /> */}
                <DropdownMenuItem onSelect={() => setShowDeleteAppDialog(true)}>
                  <span className={cn(UnpublishStatusColor)}>Delete</span>
                  <DropdownMenuShortcut>
                    <Delete className={cn("size-4", UnpublishStatusColor)} />
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
