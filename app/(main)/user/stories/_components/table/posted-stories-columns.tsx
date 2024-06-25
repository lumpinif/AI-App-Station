"use client"

import { useState } from "react"
import Link from "next/link"
import { DotsHorizontalIcon, Pencil2Icon } from "@radix-ui/react-icons"
import { ColumnDef } from "@tanstack/react-table"
import { Delete, Heart, LineChart } from "lucide-react"
import moment from "moment"
import numeral from "numeral"

import { PostDetails, Posts, Profiles, Publish_Status } from "@/types/db_tables"
import { getStatusColor, getStatusIcon } from "@/lib/get-status-icon"
import { cn, getPostAuthorSlug } from "@/lib/utils"
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

import {
  DeleteStoriesDialog,
  DraftStoriesDialog,
  EditStoiesDialog,
  PublishStoriesDialog,
  UnpublishStoriesDialog,
} from "./posted-stories-actions-dialog"

export function getPostedStoriesTableColumns(): ColumnDef<PostDetails>[] {
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
      accessorKey: "by_field",
      enableHiding: false,
      enableSorting: false,
    },
    {
      accessorKey: "post_title",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Title" />
      ),
      cell: ({ row }) => {
        const post_title = row.original.post_title as Posts["post_title"]

        const post_id = row.original.post_id as Posts["post_id"]
        const post_author_slug = getPostAuthorSlug(
          row.original.profiles as Profiles
        )

        return (
          <div className="flex max-w-96">
            <Link
              href={`/story/${post_author_slug}/${post_id}`}
              className={cn(
                "w-fit text-base font-normal !tracking-wide underline-offset-4 hover:text-blue-500 hover:underline sm:font-medium"
              )}
            >
              {post_title}
            </Link>
          </div>
        )
      },
    },
    {
      accessorKey: "post_publish_status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const status = row.original.post_publish_status as Publish_Status

        if (!status) return null

        const Icon = getStatusIcon(status)
        const isPublished = status === "published"
        const statusColor = getStatusColor(status)

        return (
          <div className={cn("flex w-fit items-center bg-transparent")}>
            <Icon
              className={cn(
                "mr-2 size-4",
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
        const likes_count = row.original.likes_count as Posts["likes_count"]
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
        const views_count = row.original.views_count as Posts["views_count"]
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
        const [showDeleteStoryDialog, setShowDeleteStoryDialog] =
          useState(false)
        const [showUnpublishStoryDialog, setShowUnpublishStoryDialog] =
          useState(false)
        const [showPublishStoryDialog, setShowPublishStoryDialog] =
          useState(false)
        const [showDraftStoryDialog, setShowDraftStoryDialog] = useState(false)
        const [showEditStoryDialog, setShowEditStoryDialog] = useState(false)

        const UnpublishIcon = getStatusIcon("unpublished")
        const UnpublishStatusColor = getStatusColor("unpublished")
        const PublishIcon = getStatusIcon("published")
        const PublishStatusColor = getStatusColor("published")
        const DraftIcon = getStatusIcon("draft")
        const DraftStatusColor = getStatusColor("draft")

        return (
          <>
            <DeleteStoriesDialog
              posts={[row]}
              showTrigger={false}
              open={showDeleteStoryDialog}
              onOpenChange={setShowDeleteStoryDialog}
            />
            <UnpublishStoriesDialog
              posts={[row]}
              showTrigger={false}
              open={showUnpublishStoryDialog}
              onOpenChange={setShowUnpublishStoryDialog}
            />
            <PublishStoriesDialog
              posts={[row]}
              showTrigger={false}
              open={showPublishStoryDialog}
              onOpenChange={setShowPublishStoryDialog}
            />
            <DraftStoriesDialog
              posts={[row]}
              showTrigger={false}
              open={showDraftStoryDialog}
              onOpenChange={setShowDraftStoryDialog}
            />
            <EditStoiesDialog
              posts={[row]}
              showTrigger={false}
              open={showEditStoryDialog}
              onOpenChange={setShowEditStoryDialog}
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
                  onSelect={() => setShowEditStoryDialog(true)}
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
                        onSelect={() => setShowDraftStoryDialog(true)}
                        disabled={row.original.post_publish_status === "draft"}
                      >
                        <DraftIcon
                          className={cn("mr-2 size-4", DraftStatusColor)}
                        />
                        <span>Draft the story</span>
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        className="active:scale-[0.98]"
                        onSelect={() => setShowPublishStoryDialog(true)}
                        disabled={
                          row.original.post_publish_status === "published"
                        }
                      >
                        <PublishIcon
                          className={cn("mr-2 size-4", PublishStatusColor)}
                        />
                        <span>Publish the story</span>
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        className="active:scale-[0.98]"
                        onSelect={() => setShowUnpublishStoryDialog(true)}
                        disabled={
                          row.original.post_publish_status === "unpublished"
                        }
                      >
                        <UnpublishIcon
                          className={cn("mr-2 size-4", UnpublishStatusColor)}
                        />
                        <span>Unpublish the story</span>
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                {/* <DropdownMenuSeparator /> */}
                <DropdownMenuItem
                  onSelect={() => setShowDeleteStoryDialog(true)}
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
