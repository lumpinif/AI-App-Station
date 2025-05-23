"use client"

import { useState } from "react"
import Link from "next/link"
import { DotsHorizontalIcon, Pencil2Icon } from "@radix-ui/react-icons"
import { ColumnDef } from "@tanstack/react-table"
import { Delete, Heart, LineChart } from "lucide-react"
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
  DraftAppsDialog,
  EditAppsDialog,
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
          className="translate-y-0.5 border border-muted-foreground/50 shadow-inner-outline transition-all duration-100 ease-out hover:border-muted-foreground active:scale-[.90] dark:border-border/50 dark:shadow-none dark:hover:border-border"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-0.5 border border-muted-foreground/50 shadow-inner-outline transition-all duration-150 ease-out hover:border-muted-foreground dark:border-border/50 dark:shadow-none dark:hover:border-border"
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
        const app_slug = row.original.app_slug as Apps["app_slug"]
        const publish_status = row.original.app_publish_status as Publish_Status
        const isPublished = publish_status === "published"

        return (
          <div className="flex max-w-60">
            {isPublished ? (
              <Link
                href={`/ai-apps/${app_slug}`}
                className={cn(
                  "w-fit truncate text-base font-normal !tracking-wide hover:text-blue-500 hover:underline sm:font-medium"
                )}
              >
                <span>{app_title}</span>
              </Link>
            ) : (
              <span
                className={cn(
                  "w-fit truncate text-base font-normal !tracking-wide text-muted-foreground sm:font-medium"
                )}
              >
                {app_title}
              </span>
            )}
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
        const isPublished = status === "published"
        const statusColor = getStatusColor(status)

        return (
          <div className={cn("flex w-fit items-center bg-transparent")}>
            <Icon
              className={cn(
                "mr-2 size-4 text-muted-foreground",
                isPublished && "text-green-600",
                statusColor
              )}
              aria-hidden="true"
            />
            <span
              className={cn(
                "font-normal capitalize text-muted-foreground",
                isPublished && "text-green-600",
                statusColor
              )}
            >
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
      cell: ({ cell }) => {
        return (
          <span className="text-muted-foreground">
            {moment(cell.getValue() as Date).format("MMM D, YYYY")}
          </span>
        )
      },
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
        <DataTableColumnHeader column={column} title="Views" />
      ),
      cell: ({ row }) => {
        const views_count = row.original.views_count as Apps["views_count"]
        const formattedViewsCount = numeral(views_count).format("0.[0]a")
        return (
          <span className="flex w-full items-center gap-x-1 truncate font-normal text-muted-foreground">
            <LineChart className="size-4" />
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
        const [showDraftAppDialog, setShowDraftAppDialog] = useState(false)
        const [showEditAppDialog, setShowEditAppDialog] = useState(false)

        const UnpublishIcon = getStatusIcon("unpublished")
        const UnpublishStatusColor = getStatusColor("unpublished")
        const PublishIcon = getStatusIcon("published")
        const PublishStatusColor = getStatusColor("published")
        const DraftIcon = getStatusIcon("draft")
        const DraftStatusColor = getStatusColor("draft")

        return (
          <>
            <DeleteAppsDialog
              apps={[row]}
              showTrigger={false}
              open={showDeleteAppDialog}
              onOpenChange={setShowDeleteAppDialog}
            />
            <UnpublishAppsDialog
              apps={[row]}
              showTrigger={false}
              open={showUnpublishAppDialog}
              onOpenChange={setShowUnpublishAppDialog}
            />
            {/* <PublishAppsDialog
              apps={[row]}
              showTrigger={false}
              open={showPublishAppDialog}
              onOpenChange={setShowPublishAppDialog}
            /> */}
            <DraftAppsDialog
              apps={[row]}
              showTrigger={false}
              open={showDraftAppDialog}
              onOpenChange={setShowDraftAppDialog}
            />
            <EditAppsDialog
              apps={[row]}
              showTrigger={false}
              open={showEditAppDialog}
              onOpenChange={setShowEditAppDialog}
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
                        className="active:scale-[0.98]"
                        onSelect={() => setShowDraftAppDialog(true)}
                        disabled={row.original.app_publish_status === "draft"}
                      >
                        <DraftIcon
                          className={cn("mr-2 size-4", DraftStatusColor)}
                        />
                        <span>Draft the app</span>
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        className="active:scale-[0.98]"
                        onSelect={() => setShowUnpublishAppDialog(true)}
                        disabled={
                          row.original.app_publish_status === "unpublished"
                        }
                      >
                        <UnpublishIcon
                          className={cn("mr-2 size-4", UnpublishStatusColor)}
                        />
                        <span>Unpublish the app</span>
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        disabled={
                          true
                          // row.original.post_publish_status === "published"
                        }
                        className="active:scale-[0.98]"
                        onSelect={() => setShowPublishAppDialog(true)}
                      >
                        <PublishIcon
                          className={cn("mr-2 size-4", PublishStatusColor)}
                        />
                        <span>Publish the app in the Edit</span>
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                {/* <DropdownMenuSeparator /> */}
                <DropdownMenuItem
                  className="active:scale-[0.98]"
                  onSelect={() => setShowDeleteAppDialog(true)}
                >
                  <span className={cn("text-red-600", UnpublishStatusColor)}>
                    Delete
                  </span>
                  <DropdownMenuShortcut>
                    <Delete
                      className={cn(
                        "size-4 text-red-600",
                        UnpublishStatusColor
                      )}
                    />
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
