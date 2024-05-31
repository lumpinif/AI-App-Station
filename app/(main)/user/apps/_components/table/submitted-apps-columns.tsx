"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DotsHorizontalIcon, Pencil2Icon } from "@radix-ui/react-icons"
import { ColumnDef } from "@tanstack/react-table"
import { Delete, Heart } from "lucide-react"
import moment from "moment"
import numeral from "numeral"

import { Apps, Publish_Status } from "@/types/db_tables"
import { getStatusColor, getStatusIcon } from "@/lib/get-status-icon"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { AppIcon } from "@/app/(main)/ai-apps/_components/cards/_components/app-icon"

import {
  DeleteAppsDialog,
  EditAppsDialog,
  PublishAppsDialog,
  UnpublishAppsDialog,
} from "./submitted-apps-actions-dialog"

export function getSubmittedAppsTableColumns(): ColumnDef<Apps>[] {
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
        const app_title = row.original.app_title as Apps["app_title"]
        const app_slug = row.original.app_slug as Apps["app_slug"]
        const app_icon_src = row.original.app_icon_src as Apps["app_icon_src"]

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
        const app_title = row.original.app_title as Apps["app_title"]

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
        const status = row.original.app_publish_status as Publish_Status

        if (!status) return null

        const Icon = getStatusIcon(status)
        const statusColor = getStatusColor(status)

        return (
          <div className={cn("flex w-fit items-center bg-transparent")}>
            <Icon
              className={cn("mr-2 size-4 text-muted-foreground", statusColor)}
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
        const likes_count = row.original.likes_count as Apps["likes_count"]
        const formattedLikesCount = numeral(likes_count).format("0.[0]a")
        return (
          <div className="flex items-center gap-x-2 text-muted-foreground">
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
        const views_count = row.original.views_count as Apps["views_count"]
        const formattedViewsCount = numeral(views_count).format("0.[0]a")
        return (
          <span className="w-full truncate font-normal text-muted-foreground">
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
        const [showEditAppDialog, setShowEditAppDialog] = useState(false)

        const router = useRouter()

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
            <EditAppsDialog
              open={showEditAppDialog}
              onOpenChange={setShowEditAppDialog}
              apps={[row]}
              showTrigger={false}
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  aria-label="Open menu"
                  variant="ghost"
                  className="flex size-8 p-0 data-[state=open]:bg-muted"
                >
                  <DotsHorizontalIcon className="size-4" aria-hidden="true" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem
                  className="active:scale-[0.98]"
                  onSelect={() => setShowEditAppDialog(true)}
                >
                  <span>Edit</span>
                  <DropdownMenuShortcut>
                    <Pencil2Icon className={cn("size-4")} />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Update Status</DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem
                        onSelect={() => setShowPublishAppDialog(true)}
                        className="active:scale-[0.98]"
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
                        className="active:scale-[0.98]"
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
                <DropdownMenuItem
                  onSelect={() => setShowDeleteAppDialog(true)}
                  className="active:scale-[0.98]"
                >
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
