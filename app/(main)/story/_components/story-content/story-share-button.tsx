"use client"

import { usePathname } from "next/navigation"

import { Posts, Profiles } from "@/types/db_tables"
import { getSiteUrl } from "@/lib/utils"
import { Dialog } from "@/components/ui/dialog"
import { Drawer } from "@/components/ui/drawer"
import { ShareModal } from "@/components/shared/share-modal"

type StoryShareButtonProps = React.ComponentProps<typeof Dialog> &
  React.ComponentProps<typeof Drawer> & {
    author: Profiles
    withTrigger?: boolean
    children?: React.ReactNode
    post_title: Posts["post_title"]
  }

export const StoryShareButton: React.FC<StoryShareButtonProps> = ({
  author,
  children,
  post_title,
  withTrigger,
  ...props
}) => {
  const pathname = usePathname()
  const url =
    `${getSiteUrl()}${pathname}` || `${window.location.origin}${pathname}`

  return (
    <ShareModal
      url={url}
      withTrigger={withTrigger}
      title={`"${post_title}" by ${author.full_name || author.email}`}
      drawerCloseTitle="Share this story with"
      dialogDescription="Share this story with your friends and family"
      {...props}
    >
      {children && children}
    </ShareModal>
  )
}
