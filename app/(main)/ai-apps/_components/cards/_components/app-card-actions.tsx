"use client"

import React, { useState } from "react"
import Link from "next/link"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { User } from "@supabase/supabase-js"
import { Bookmark, ChevronRight, SquareArrowOutUpRight } from "lucide-react"

import { App_bookmarks, App_likes, Apps } from "@/types/db_tables"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { AppDetailBookmarkButton } from "../../../[slug]/_components/app-detail-bookmark-button"
import { AppDetailLikeButton } from "../../../[slug]/_components/app-detail-like-button"

type AppCardActionsProps = {
  user?: User | null
  app_likes: App_likes[]
  app_id: Apps["app_id"]
  app_slug: Apps["app_slug"]
  app_bookmarks: App_bookmarks[]
}

export const AppCardActions: React.FC<AppCardActionsProps> = ({
  user,
  app_id,
  app_slug,
  app_likes,
  app_bookmarks,
}) => {
  const handleClickNotClose: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="rounded-full text-muted-foreground outline-none transition-all duration-200 ease-out focus:!ring-0 focus:ring-transparent data-[state=open]:bg-muted data-[state=open]:px-1 data-[state=open]:text-primary">
          <DotsHorizontalIcon className="size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          sideOffset={10}
          className="glass-card-background border backdrop-blur-md dark:border-none sm:shadow-outline"
        >
          {/* LIKE */}
          <DropdownMenuItem onClick={handleClickNotClose}>
            <div className="flex w-full cursor-pointer items-center justify-between gap-x-4 text-sm text-muted-foreground hover:text-primary">
              <span>Like</span>

              <AppDetailLikeButton
                app_id={app_id}
                data={app_likes}
                withCount={false}
                user={user || null}
              />
            </div>
          </DropdownMenuItem>

          {/* BOOKMARK */}
          <DropdownMenuItem onClick={handleClickNotClose}>
            <div className="flex w-full cursor-pointer items-center justify-between gap-x-4 text-sm text-muted-foreground hover:text-primary">
              <span>Add to Bookmark</span>
              <AppDetailBookmarkButton
                app_id={app_id}
                withCount={false}
                user={user || null}
                data={app_bookmarks}
              />
            </div>
          </DropdownMenuItem>

          {/* LINK */}
          <DropdownMenuItem>
            <Link
              href={`ai-apps/${app_slug}`}
              className="flex w-full cursor-pointer items-center justify-between gap-x-4 text-sm text-muted-foreground hover:text-primary"
            >
              <span>More details</span>
              <ChevronRight className="size-4" />
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default React.memo(AppCardActions)
