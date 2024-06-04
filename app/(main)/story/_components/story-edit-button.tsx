"use client"

import Link from "next/link"
import { User } from "@supabase/supabase-js"

import { Posts } from "@/types/db_tables"
import { Button } from "@/components/ui/button"

type StoryEditButtonProps = {
  user: User | null
  post_id: Posts["post_id"]
  post_author_id: Posts["post_author_id"]
  post_publish_status: Posts["post_publish_status"]
}

export const StoryEditButton: React.FC<StoryEditButtonProps> = ({
  user,
  post_id,
  post_author_id,
  post_publish_status,
}) => {
  const isPublished = post_publish_status === "published"
  if (user?.id !== post_author_id) {
    return null
  }

  return (
    <div className="flex w-full items-center justify-end gap-x-2">
      {!isPublished ? (
        <Button
          size={"label"}
          disabled={true}
          variant={"ghost"}
          className="text-muted-forground rounded-full px-4"
        >
          {post_publish_status}
        </Button>
      ) : null}
      <Link href={`/user/stories/${post_id}`}>
        <Button size={"label"} variant={"ghost"} className="rounded-full px-4">
          Edit
        </Button>
      </Link>
    </div>
  )
}
