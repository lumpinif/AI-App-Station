"use client"

import { useTransition } from "react"
import Link from "next/link"
import {
  deleteStory,
  draftStory,
  publishStory,
  unpublishStory,
} from "@/server/queries/supabase/stories/table/post-table-services"
import { RocketIcon, TrashIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"
import { RotateCw, SquarePen } from "lucide-react"
import { toast } from "sonner"

import { PostDetails } from "@/types/db_tables"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

export async function deleteStories({
  rows,
  onSuccess,
}: {
  rows: Row<PostDetails>[]
  onSuccess?: () => void
}) {
  try {
    await Promise.all(
      rows.map(async (row) => {
        const result = await deleteStory(row.original.post_id)

        if (result && result.error) {
          if (typeof result.error === "string") {
            throw new Error(result.error)
          } else {
            throw result.error
          }
        }
      })
    )

    toast.success(`${rows.length > 1 ? "Stories" : "Story"} Deleted`)
    onSuccess?.()
  } catch (error) {
    console.error(
      `Error deleting ${rows.length > 1 ? "Stories" : "Story"}:`,
      error
    )
    toast.error(
      `Failed to delete ${rows.length > 1 ? "Stories" : "Story"}. Please try again.`
    )
  }
}
export async function unpublishStories({
  rows,
  onSuccess,
}: {
  rows: Row<PostDetails>[]
  onSuccess?: () => void
}) {
  try {
    await Promise.all(
      rows.map(async (row) => {
        const result = await unpublishStory(row.original.post_id)

        if (result && result.error) {
          if (typeof result.error === "string") {
            throw new Error(result.error)
          } else {
            throw result.error
          }
        }
      })
    )

    toast.success(`${rows.length > 1 ? "Stories" : "Story"} Unpublished`)
    onSuccess?.()
  } catch (error) {
    console.error(
      `Error unpublishing ${rows.length > 1 ? "Stories" : "Story"}:`,
      error
    )
    toast.error(
      `Failed to unpublish ${rows.length > 1 ? "Stories" : "Story"}. Please try again.`
    )
  }
}

export async function publishStories({
  rows,
  onSuccess,
}: {
  rows: Row<PostDetails>[]
  onSuccess?: () => void
}) {
  try {
    await Promise.all(
      rows.map(async (row) => {
        const result = await publishStory(row.original.post_id)

        if (result && result.error) {
          if (typeof result.error === "string") {
            throw new Error(result.error)
          } else {
            throw result.error
          }
        }
      })
    )

    toast.success(`${rows.length > 1 ? "Stories" : "Story"} Published`)
    onSuccess?.()
  } catch (error) {
    console.error(
      `Error publishing ${rows.length > 1 ? "Stories" : "Story"}:`,
      error
    )
    toast.error(
      `Failed to publish ${rows.length > 1 ? "Stories" : "Story"}. Please try again.`
    )
  }
}

export async function draftStories({
  rows,
  onSuccess,
}: {
  rows: Row<PostDetails>[]
  onSuccess?: () => void
}) {
  try {
    await Promise.all(
      rows.map(async (row) => {
        const result = await draftStory(row.original.post_id)

        if (result && result.error) {
          if (typeof result.error === "string") {
            throw new Error(result.error)
          } else {
            throw result.error
          }
        }
      })
    )

    toast.success(`${rows.length > 1 ? "Stories" : "Story"} Drafted`)
    onSuccess?.()
  } catch (error) {
    console.error(
      `Error drafting ${rows.length > 1 ? "Stories" : "Story"}:`,
      error
    )
    toast.error(
      `Failed to draft ${rows.length > 1 ? "Stories" : "Story"}. Please try again.`
    )
  }
}

interface StoryActionDialogProps
  extends React.ComponentPropsWithoutRef<typeof AlertDialog> {
  posts: Row<PostDetails>[]
  onSuccess?: () => void
  showTrigger?: boolean
  triggerClassName?: string
}

export function DeleteStoriesDialog({
  posts,
  onSuccess,
  showTrigger = true,
  triggerClassName,
  ...props
}: StoryActionDialogProps) {
  const [isDeletePending, startDeleteTransition] = useTransition()

  return (
    <AlertDialog {...props}>
      {showTrigger ? (
        <AlertDialogTrigger asChild>
          <Button
            variant="destructive"
            size="sm"
            className={triggerClassName}
            disabled={isDeletePending}
          >
            {isDeletePending ? (
              <RotateCw
                className="mr-1 size-4 animate-spin"
                aria-hidden="true"
              />
            ) : (
              <TrashIcon className="mr-1 size-4" aria-hidden="true" />
            )}
            {isDeletePending
              ? `Deleting (${posts.length})`
              : `Delete (${posts.length})`}
          </Button>
        </AlertDialogTrigger>
      ) : null}
      <AlertDialogContent className="max-w-sm rounded-sm md:max-w-md lg:max-w-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your{" "}
            <span className="font-medium">{posts.length}</span>
            {posts.length === 1 ? " story" : " stories"} from the server.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2 sm:space-x-0">
          <AlertDialogCancel asChild>
            <Button variant="outline">Cancel</Button>
          </AlertDialogCancel>
          <AlertDialogAction
            asChild
            className="bg-destructive text-white hover:bg-destructive/80"
          >
            <Button
              aria-label="Delete selected rows"
              variant="destructive"
              onClick={() => {
                startDeleteTransition(() => {
                  deleteStories({
                    rows: posts,
                    onSuccess,
                  })
                })
              }}
              disabled={isDeletePending}
            >
              Delete
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export function UnpublishStoriesDialog({
  posts,
  onSuccess,
  showTrigger = true,
  ...props
}: StoryActionDialogProps) {
  const [isUnpublishPending, startUnpublishTransition] = useTransition()

  return (
    <AlertDialog {...props}>
      {showTrigger ? (
        <AlertDialogTrigger asChild>
          <Button
            variant="destructive"
            size="sm"
            className="outline-none focus:ring-0 focus:!ring-transparent"
            disabled={isUnpublishPending}
          >
            <TrashIcon className="mr-1 size-4" aria-hidden="true" />
            Unpublish ({posts.length})
          </Button>
        </AlertDialogTrigger>
      ) : null}
      <AlertDialogContent className="max-w-sm rounded-sm md:max-w-md lg:max-w-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will immediately unpublish your{" "}
            <span className="font-medium">{posts.length}</span>
            {posts.length === 1 ? " story" : " stories"} from the server.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2 sm:space-x-0">
          <AlertDialogCancel asChild>
            <Button variant="outline">Cancel</Button>
          </AlertDialogCancel>
          <AlertDialogAction
            asChild
            className="bg-destructive text-white hover:bg-destructive/80"
          >
            <Button
              aria-label="unpublish selected rows"
              variant="destructive"
              onClick={() => {
                startUnpublishTransition(() => {
                  unpublishStories({
                    rows: posts,
                    onSuccess,
                  })
                })
              }}
              disabled={isUnpublishPending}
            >
              Unpublish
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export function PublishStoriesDialog({
  posts,
  onSuccess,
  showTrigger = true,
  ...props
}: StoryActionDialogProps) {
  const [isPublishPending, startPublishTransition] = useTransition()

  return (
    <AlertDialog {...props}>
      {showTrigger ? (
        <AlertDialogTrigger asChild>
          <Button
            size="sm"
            className="outline-none focus:ring-0 focus:!ring-transparent"
            disabled={isPublishPending}
          >
            <RocketIcon className="mr-1 size-4" aria-hidden="true" />
            Publish ({posts.length})
          </Button>
        </AlertDialogTrigger>
      ) : null}
      <AlertDialogContent className="max-w-sm rounded-sm md:max-w-md lg:max-w-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will immediately publish your{" "}
            <span className="font-medium">{posts.length}</span>
            {posts.length === 1 ? " story" : " stories"} from the server.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2 sm:space-x-0">
          <AlertDialogCancel asChild>
            <Button variant="outline">Cancel</Button>
          </AlertDialogCancel>
          <AlertDialogAction
            asChild
            className="bg-green-500 text-white hover:bg-green-600"
          >
            <Button
              aria-label="publish selected rows"
              onClick={() => {
                startPublishTransition(() => {
                  publishStories({
                    rows: posts,
                    onSuccess,
                  })
                })
              }}
              disabled={isPublishPending}
            >
              Publish
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export function DraftStoriesDialog({
  posts,
  onSuccess,
  showTrigger = true,
  ...props
}: StoryActionDialogProps) {
  const [isDraftPending, startDraftTransition] = useTransition()

  return (
    <AlertDialog {...props}>
      {showTrigger ? (
        <AlertDialogTrigger asChild>
          <Button
            size="sm"
            className="outline-none focus:ring-0 focus:!ring-transparent"
            disabled={isDraftPending}
          >
            <RocketIcon className="mr-1 size-4" aria-hidden="true" />
            Draft ({posts.length})
          </Button>
        </AlertDialogTrigger>
      ) : null}
      <AlertDialogContent className="max-w-sm rounded-sm md:max-w-md lg:max-w-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will immediately draft your{" "}
            <span className="font-medium">{posts.length}</span>
            {posts.length === 1 ? " story" : " stories"} from the server.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2 sm:space-x-0">
          <AlertDialogCancel asChild>
            <Button variant="outline">Cancel</Button>
          </AlertDialogCancel>
          <AlertDialogAction
            asChild
            className="bg-green-500 text-white hover:bg-green-600"
          >
            <Button
              aria-label="draft selected rows"
              onClick={() => {
                startDraftTransition(() => {
                  draftStories({
                    rows: posts,
                    onSuccess,
                  })
                })
              }}
              disabled={isDraftPending}
            >
              Draft
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export function EditStoiesDialog({
  posts,
  onSuccess,
  showTrigger = true,
  ...props
}: StoryActionDialogProps) {
  return (
    <AlertDialog {...props}>
      {showTrigger ? (
        <AlertDialogTrigger asChild>
          <Button
            size="sm"
            className="outline-none focus:ring-0 focus:!ring-transparent"
          >
            <SquarePen className="mr-1 size-4" aria-hidden="true" />
            Edit
          </Button>
        </AlertDialogTrigger>
      ) : null}
      <AlertDialogContent className="max-w-sm rounded-sm md:max-w-md lg:max-w-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>Before opening the editor</AlertDialogTitle>
          <AlertDialogDescription>
            Caution: Keep in mind that editing the story will result in
            immediate changes, regardless of its published status.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2 sm:space-x-0">
          <AlertDialogCancel asChild>
            <Button variant="outline">Cancel</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Link
              href={`/user/stories/${posts[0].original.post_id}`}
              aria-label="edit selected row"
              target="_blank"
            >
              Confirm
            </Link>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
