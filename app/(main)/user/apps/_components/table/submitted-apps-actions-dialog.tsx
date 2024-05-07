"use client"

import { useTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { RocketIcon, TrashIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"
import { toast } from "sonner"

import { App } from "@/types/db_tables"
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

import { deleteApp, publishApp, unpublishApp } from "../../_lib/db-queries"

export async function deleteApps({
  rows,
  onSuccess,
}: {
  rows: Row<App>[]
  onSuccess?: () => void
}) {
  try {
    await Promise.all(
      rows.map(async (row) => {
        const result = await deleteApp(row.original.app_id)

        if (result && result.error) {
          if (typeof result.error === "string") {
            throw new Error(result.error)
          } else {
            throw result.error
          }
        }
      })
    )

    toast.success("Apps deleted")
    onSuccess?.()
  } catch (error) {
    console.error("Error deleting apps:", error)
    toast.error("Failed to delete apps. Please try again.")
  }
}
export async function unpublishApps({
  rows,
  onSuccess,
}: {
  rows: Row<App>[]
  onSuccess?: () => void
}) {
  try {
    await Promise.all(
      rows.map(async (row) => {
        const result = await unpublishApp(row.original.app_id)

        if (result && result.error) {
          if (typeof result.error === "string") {
            throw new Error(result.error)
          } else {
            throw result.error
          }
        }
      })
    )

    toast.success("Apps unpublished")
    onSuccess?.()
  } catch (error) {
    console.error("Error unpublishing apps:", error)
    toast.error("Failed to unpublish apps. Please try again.")
  }
}

export async function publishApps({
  rows,
  onSuccess,
}: {
  rows: Row<App>[]
  onSuccess?: () => void
}) {
  try {
    await Promise.all(
      rows.map(async (row) => {
        const result = await publishApp(row.original.app_id)

        if (result && result.error) {
          if (typeof result.error === "string") {
            throw new Error(result.error)
          } else {
            throw result.error
          }
        }
      })
    )

    toast.success("Apps published")
    onSuccess?.()
  } catch (error) {
    console.error("Error publishing apps:", error)
    toast.error("Failed to publish apps. Please try again.")
  }
}

interface AppActionDialogProps
  extends React.ComponentPropsWithoutRef<typeof AlertDialog> {
  apps: Row<App>[]
  onSuccess?: () => void
  showTrigger?: boolean
  triggerClassName?: string
}

export function DeleteAppsDialog({
  apps,
  onSuccess,
  showTrigger = true,
  triggerClassName,
  ...props
}: AppActionDialogProps) {
  const [isDeletePending, startDeleteTransition] = useTransition()

  return (
    <AlertDialog {...props}>
      {showTrigger ? (
        <AlertDialogTrigger asChild>
          <Button variant="destructive" size="sm" className={triggerClassName}>
            <TrashIcon className="mr-1 size-4" aria-hidden="true" />
            Delete ({apps.length})
          </Button>
        </AlertDialogTrigger>
      ) : null}
      <AlertDialogContent className="max-w-sm rounded-sm md:max-w-md lg:max-w-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your{" "}
            <span className="font-medium">{apps.length}</span>
            {apps.length === 1 ? " app" : " apps"} from the server.
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
                  deleteApps({
                    rows: apps,
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
export function UnpublishAppsDialog({
  apps,
  onSuccess,
  showTrigger = true,
  ...props
}: AppActionDialogProps) {
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
            Unpublish ({apps.length})
          </Button>
        </AlertDialogTrigger>
      ) : null}
      <AlertDialogContent className="max-w-sm rounded-sm md:max-w-md lg:max-w-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will immediately unpublish your{" "}
            <span className="font-medium">{apps.length}</span>
            {apps.length === 1 ? " app" : " apps"} from the server.
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
                  unpublishApps({
                    rows: apps,
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
export function PublishAppsDialog({
  apps,
  onSuccess,
  showTrigger = true,
  ...props
}: AppActionDialogProps) {
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
            Publish ({apps.length})
          </Button>
        </AlertDialogTrigger>
      ) : null}
      <AlertDialogContent className="max-w-sm rounded-sm md:max-w-md lg:max-w-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will immediately publish your{" "}
            <span className="font-medium">{apps.length}</span>
            {apps.length === 1 ? " app" : " apps"} from the server.
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
                  publishApps({
                    rows: apps,
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
export function EditAppsDialog({
  apps,
  onSuccess,
  showTrigger = true,
  ...props
}: AppActionDialogProps) {
  const router = useRouter()
  const [isEditPending, startEditTransition] = useTransition()

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
            Unpublish ({apps.length})
          </Button>
        </AlertDialogTrigger>
      ) : null}
      <AlertDialogContent className="max-w-sm rounded-sm md:max-w-md lg:max-w-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>Before opening the editor</AlertDialogTitle>
          <AlertDialogDescription>
            Caution: Keep in mind that editing the app will result in immediate
            changes, regardless of its published status.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2 sm:space-x-0">
          <AlertDialogCancel asChild>
            <Button variant="outline">Cancel</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Link
              href={`/user/apps/${apps[0].original.app_id}`}
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
