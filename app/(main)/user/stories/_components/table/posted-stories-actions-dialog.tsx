"use client"

import { useTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  deleteStory,
  publishStory,
  unpublishStory,
} from "@/server/data/stories/table/post-table-services"
import { RocketIcon, TrashIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"
import { SquarePen } from "lucide-react"
import { toast } from "sonner"

import { Posts } from "@/types/db_tables"
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
  rows: Row<Posts>[]
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

    toast.success("Stories deleted")
    onSuccess?.()
  } catch (error) {
    console.error("Error deleting stories:", error)
    toast.error("Failed to delete stories. Please try again.")
  }
}
export async function unpublishStories({
  rows,
  onSuccess,
}: {
  rows: Row<Posts>[]
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

    toast.success("Stories unpublished")
    onSuccess?.()
  } catch (error) {
    console.error("Error unpublishing stories:", error)
    toast.error("Failed to unpublish stories. Please try again.")
  }
}

export async function publishStories({
  rows,
  onSuccess,
}: {
  rows: Row<Posts>[]
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

    toast.success("Stories published")
    onSuccess?.()
  } catch (error) {
    console.error("Error publishing stories:", error)
    toast.error("Failed to publish stories. Please try again.")
  }
}

interface StoryActionDialogProps
  extends React.ComponentPropsWithoutRef<typeof AlertDialog> {
  posts: Row<Posts>[]
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
          <Button variant="destructive" size="sm" className={triggerClassName}>
            <TrashIcon className="mr-1 size-4" aria-hidden="true" />
            Delete ({posts.length})
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
            className="bg-destructive hover:bg-destructive/80 text-white"
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
            className="bg-destructive hover:bg-destructive/80 text-white"
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
export function EditStoiesDialog({
  posts,
  onSuccess,
  showTrigger = true,
  ...props
}: StoryActionDialogProps) {
  const [isEditPending, startEditTransition] = useTransition()

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
