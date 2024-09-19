"use client"

import { useState } from "react"
import Link from "next/link"
import { User } from "@supabase/supabase-js"
import { SquarePen } from "lucide-react"

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
import { Badge } from "@/components/ui/badge"
import { Button, ButtonProps } from "@/components/ui/button"

import { EditStoiesDialog } from "../../user/stories/_components/table/posted-stories-actions-dialog"

type StoryEditButtonProps = React.ComponentPropsWithoutRef<
  typeof AlertDialog
> & {
  user: User | null
  post_id: Posts["post_id"]
  post_author_id: Posts["post_author_id"]
  post_publish_status: Posts["post_publish_status"]
}

export const StoryEditDialogContent: React.FC<StoryEditButtonProps> = ({
  user,
  post_id,
  post_author_id,
  post_publish_status,
  ...props
}) => {
  if (user?.id !== post_author_id) {
    return null
  }

  return (
    <>
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
              href={`/user/stories/${post_id}`}
              aria-label="edit selected row"
              target="_blank"
            >
              Confirm
            </Link>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </>
  )
}
