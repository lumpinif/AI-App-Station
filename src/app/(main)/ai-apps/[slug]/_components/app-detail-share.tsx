"use client"

import { usePathname } from "next/navigation"

import { Apps } from "@/types/db_tables"
import { getSiteUrl } from "@/lib/utils"
import { Dialog } from "@/components/ui/dialog"
import { Drawer } from "@/components/ui/drawer"
import { ShareModal } from "@/components/shared/share-modal"

type AppDetailShareProps = React.ComponentProps<typeof Dialog> &
  React.ComponentProps<typeof Drawer> & {
    withTrigger?: boolean
    iconClassName?: string
    children?: React.ReactNode
    app_title: Apps["app_title"]
    description: Apps["description"]
  }

export const AppDetailShare: React.FC<AppDetailShareProps> = ({
  children,
  app_title,
  description,
  withTrigger,
  iconClassName,
  ...props
}) => {
  const pathname = usePathname()
  const url =
    `${getSiteUrl()}${pathname}` || `${window.location.origin}${pathname}`

  return (
    <ShareModal
      url={url}
      withTrigger={withTrigger}
      title={`${app_title}  |  `}
      iconClassName={iconClassName}
      description={description as string}
      drawerCloseTitle="Share this app with"
      dialogDescription="Share this app with your friends and family"
      {...props}
    >
      {children && children}
    </ShareModal>
  )
}
