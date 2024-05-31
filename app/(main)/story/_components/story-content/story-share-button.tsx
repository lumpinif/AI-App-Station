"use client"

import { usePathname } from "next/navigation"

import { Posts, Profiles } from "@/types/db_tables"
import { getSiteUrl } from "@/lib/utils"
import { ShareModal } from "@/components/shared/share-modal"

type StoryShareButtonProps = {
  post_title: Posts["post_title"]
  author: Profiles
}

export const StoryShareButton: React.FC<StoryShareButtonProps> = ({
  post_title,
  author,
}) => {
  const pathname = usePathname()
  const url =
    `${getSiteUrl()}${pathname}` || `${window.location.origin}${pathname}`

  return (
    <ShareModal
      url={url}
      title={`"${post_title}" by ${author.full_name || author.email}`}
      drawerCloseTitle="Share this story with"
      dialogDescription="Share this story with your friends and family"
    />
  )
}
