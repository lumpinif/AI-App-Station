"use client"

import { useTransition } from "react"
import Link from "next/link"
import {
  deleteApp,
  draftApp,
  publishApp,
  unpublishApp,
} from "@/server/queries/supabase/table/apps-table-services"
import { RocketIcon, TrashIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"
import { RotateCw, SquarePen } from "lucide-react"
import { toast } from "sonner"

import { Apps } from "@/types/db_tables"
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

export async function deleteApps({
  rows,
  onSuccess,
}: {
  rows: Row<Apps>[]
  onSuccess?: () => void
}) {
  try {
    await Promise.all(
      rows.map(async (row) => {
        const result = await deleteApp(
          row.original.app_id,
          row.original.app_slug
        )

        if (result && result.error) {
          if (typeof result.error === "string") {
            throw new Error(result.error)
          } else {
            throw result.error
          }
        }
      })
    )

    toast.success(`${rows.length > 1 ? "Apps" : "App"} Deleted`)
    onSuccess?.()
  } catch (error) {
    console.error(`Error deleting ${rows.length > 1 ? "Apps" : "App"}:`, error)
    toast.error(
      `Failed to delete ${rows.length > 1 ? "Apps" : "App"}. Please try again.`
    )
  }
}
export async function unpublishApps({
  rows,
  onSuccess,
}: {
  rows: Row<Apps>[]
  onSuccess?: () => void
}) {
  try {
    await Promise.all(
      rows.map(async (row) => {
        const result = await unpublishApp(
          row.original.app_id,
          row.original.app_slug
        )

        if (result && result.error) {
          if (typeof result.error === "string") {
            throw new Error(result.error)
          } else {
            throw result.error
          }
        }
      })
    )

    toast.success(`${rows.length > 1 ? "Apps" : "App"} Unpublished`)
    onSuccess?.()
  } catch (error) {
    console.error(
      `Error unpublishing ${rows.length > 1 ? "Apps" : "App"}:`,
      error
    )
    toast.error(
      `Failed to unpublish ${rows.length > 1 ? "Apps" : "App"}. Please try again.`
    )
  }
}

export async function publishApps({
  rows,
  onSuccess,
}: {
  rows: Row<Apps>[]
  onSuccess?: () => void
}) {
  try {
    await Promise.all(
      rows.map(async (row) => {
        const result = await publishApp(
          row.original.app_id,
          row.original.app_slug
        )

        if (result && result.error) {
          if (typeof result.error === "string") {
            throw new Error(result.error)
          } else {
            throw result.error
          }
        }
      })
    )

    toast.success(`${rows.length > 1 ? "Apps" : "App"} Published`)
    onSuccess?.()
  } catch (error) {
    console.error(
      `Error publishing ${rows.length > 1 ? "Apps" : "App"}:`,
      error
    )
    toast.error(
      `Failed to publish ${rows.length > 1 ? "Apps" : "App"}. Please try again.`
    )
  }
}

export async function draftApps({
  rows,
  onSuccess,
}: {
  rows: Row<Apps>[]
  onSuccess?: () => void
}) {
  try {
    await Promise.all(
      rows.map(async (row) => {
        const result = await draftApp(
          row.original.app_id,
          row.original.app_slug
        )

        if (result && result.error) {
          if (typeof result.error === "string") {
            throw new Error(result.error)
          } else {
            throw result.error
          }
        }
      })
    )

    toast.success(`${rows.length > 1 ? "Apps" : "App"} Drafted`)
    onSuccess?.()
  } catch (error) {
    console.error(`Error drafting ${rows.length > 1 ? "Apps" : "App"}:`, error)
    toast.error(
      `Failed to draft ${rows.length > 1 ? "Apps" : "App"}. Please try again.`
    )
  }
}

interface AppActionDialogProps
  extends React.ComponentPropsWithoutRef<typeof AlertDialog> {
  apps: Row<Apps>[]
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
              ? `Deleting (${apps.length})`
              : `Delete (${apps.length})`}
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
            className="bg-destructive text-white hover:bg-destructive/80"
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
            disabled={isUnpublishPending}
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
            className="bg-destructive text-white hover:bg-destructive/80"
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
            disabled={isPublishPending}
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

export function DraftAppsDialog({
  apps,
  onSuccess,
  showTrigger = true,
  ...props
}: AppActionDialogProps) {
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
            Draft ({apps.length})
          </Button>
        </AlertDialogTrigger>
      ) : null}
      <AlertDialogContent className="max-w-sm rounded-sm md:max-w-md lg:max-w-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will immediately draft your{" "}
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
              aria-label="draft selected rows"
              onClick={() => {
                startDraftTransition(() => {
                  draftApps({
                    rows: apps,
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

export function EditAppsDialog({
  apps,
  onSuccess,
  showTrigger = true,
  ...props
}: AppActionDialogProps) {
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
