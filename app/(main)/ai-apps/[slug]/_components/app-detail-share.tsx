"use client"

import { usePathname } from "next/navigation"

import { Apps } from "@/types/db_tables"
import { getSiteUrl } from "@/lib/utils"
import { ShareModal } from "@/components/shared/share-modal"

type AppDetailShareProps = {
  app_title: Apps["app_title"]
  description: Apps["description"]
}

export const AppDetailShare: React.FC<AppDetailShareProps> = ({
  app_title,
  description,
}) => {
  const pathname = usePathname()
  const url =
    `${getSiteUrl()}${pathname}` || `${window.location.origin}${pathname}`

  return (
    <ShareModal
      url={url}
      title={`App [${app_title}]`}
      description={description as string}
      drawerCloseTitle="Share this app with"
      dialogDescription="Share this app with your friends and family"
    />
  )
}
