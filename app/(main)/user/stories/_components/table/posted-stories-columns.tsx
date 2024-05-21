"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DotsHorizontalIcon, Pencil2Icon } from "@radix-ui/react-icons"
import { ColumnDef } from "@tanstack/react-table"
import { Delete, Heart } from "lucide-react"
import moment from "moment"
import numeral from "numeral"

import { Posts, Publish_Status } from "@/types/db_tables"
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

import {
  DeleteStoriesDialog,
  EditStoiesDialog,
  PublishStoriesDialog,
  UnpublishStoriesDialog,
} from "./posted-stories-actions-dialog"

export function getPostedStoriesTableColumns(): ColumnDef<Posts>[] {
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
    // {
    //   accessorKey: "app_icon_src",
    //   size: 20,
    //   header: "Icon",
    //   cell: ({ row }) => {
    //     const app_title = row.original.app_title as Apps["app_title"]
    //     const app_slug = row.original.app_slug as Apps["app_slug"]
    //     const app_icon_src = row.original.app_icon_src as Apps["app_icon_src"]

    //     return (
    //       <AppIcon
    //         size={10}
    //         className="rounded-lg"
    //         app_title={app_title}
    //         app_slug={app_slug}
    //         app_icon_src={app_icon_src}
    //       />
    //     )
    //   },
    // },
    {
      accessorKey: "post_title",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Title" />
      ),
      cell: ({ row }) => {
        const post_title = row.original.post_title as Posts["post_title"]

        return (
          <div className="flex max-w-96">
            {/* {post_title && <Badge variant="outline">{post_title}</Badge>} */}
            <span className="w-full font-normal">{post_title}</span>
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
        const likes_count = row.original.likes_count as Posts["likes_count"]
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
        <DataTableColumnHeader column={column} title="Views(WIP)" />
      ),
      cell: ({ row }) => {
        const views_count = row.original.views_count as Posts["views_count"]
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
        const [showDeleteStoryDialog, setShowDeleteStoryDialog] =
          useState(false)
        const [showUnpublishStoryDialog, setShowUnpublishStoryDialog] =
          useState(false)
        const [showPublishStoryDialog, setShowPublishStoryDialog] =
          useState(false)
        const [showEditStoryDialog, setShowEditStoryDialog] = useState(false)

        const router = useRouter()

        const UnpublishIcon = getStatusIcon("unpublished")
        const UnpublishStatusColor = getStatusColor("unpublished")
        const PublishIcon = getStatusIcon("published")
        const PublishStatusColor = getStatusColor("published")

        return (
          <>
            <DeleteStoriesDialog
              open={showDeleteStoryDialog}
              onOpenChange={setShowDeleteStoryDialog}
              posts={[row]}
              showTrigger={false}
            />
            <UnpublishStoriesDialog
              open={showUnpublishStoryDialog}
              onOpenChange={setShowUnpublishStoryDialog}
              posts={[row]}
              showTrigger={false}
            />
            <PublishStoriesDialog
              open={showPublishStoryDialog}
              onOpenChange={setShowPublishStoryDialog}
              posts={[row]}
              showTrigger={false}
            />
            <EditStoiesDialog
              open={showEditStoryDialog}
              onOpenChange={setShowEditStoryDialog}
              posts={[row]}
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
                        onSelect={() => setShowPublishStoryDialog(true)}
                        className="active:scale-[0.98]"
                      >
                        <PublishIcon
                          className={cn("mr-2 size-4", PublishStatusColor)}
                        />
                        <span className={PublishStatusColor}>
                          Publish the story
                        </span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onSelect={() => setShowUnpublishStoryDialog(true)}
                        className="active:scale-[0.98]"
                      >
                        <UnpublishIcon
                          className={cn("mr-2 size-4", UnpublishStatusColor)}
                        />
                        <span className={UnpublishStatusColor}>
                          Unpublish the story
                        </span>
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
