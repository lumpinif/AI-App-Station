"use client"

import { useTransition } from "react"
import { TrashIcon } from "@radix-ui/react-icons"
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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { deleteApp } from "../../_lib/db-queries"

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

interface DeleteAppDialogProps
  extends React.ComponentPropsWithoutRef<typeof Dialog> {
  apps: Row<App>[]
  onSuccess?: () => void
  showTrigger?: boolean
}

export function DeleteAppsDialog({
  apps,
  onSuccess,
  showTrigger = true,
  ...props
}: DeleteAppDialogProps) {
  const [isDeletePending, startDeleteTransition] = useTransition()

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
            {apps.length === 1 ? " task" : " tasks"} from the server.
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
