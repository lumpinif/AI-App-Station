"use client"

import { usePathname } from "next/navigation"
import { ExternalLink } from "lucide-react"
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  LineIcon,
  LineShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from "react-share"

import { App } from "@/types/db_tables"
import { getSiteUrl } from "@/lib/utils"
import useMediaQuery from "@/hooks/use-media-query"
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
  ResponsiveModalTrigger,
} from "@/components/ui/responsive-modal"
import { CopyButton } from "@/components/shared/copy-button"
import { EnhancedDrawerClose } from "@/components/shared/enhanced-drawer"
import { SocialShare } from "@/components/shared/social-share"

type AppDetailShareProps = {
  app_title: App["app_title"]
  description: App["description"]
  app_slug: App["app_slug"]
}

export const AppDetailShare: React.FC<AppDetailShareProps> = ({
  app_title,
  description,
  app_slug,
}) => {
  const { isMobile } = useMediaQuery()
  const pathname = usePathname()
  const url =
    `${getSiteUrl()}${pathname}` || `${window.location.origin}${pathname}`

  return (
    <ResponsiveModal>
      <ResponsiveModalTrigger asChild>
        <button className="group">
          <ExternalLink className="text-muted-foreground group-hover:text-primary size-4 stroke-1 transition-all duration-150 ease-out md:size-6" />
        </button>
      </ResponsiveModalTrigger>
      <ResponsiveModalContent className="w-full rounded-t-3xl p-4 py-6 lg:max-w-lg lg:rounded-md">
        <EnhancedDrawerClose
          title="Share this app with"
          className="lg:hidden"
        />
        <ResponsiveModalHeader className="hidden lg:block">
          <ResponsiveModalTitle>
            <h1 className="text-2xl font-semibold">Share</h1>
          </ResponsiveModalTitle>
          <ResponsiveModalDescription>
            <p className="text-muted-foreground">
              Share this app with your friends and family
            </p>
          </ResponsiveModalDescription>
        </ResponsiveModalHeader>
        <div className="flex w-full flex-col space-y-6 py-6 lg:space-y-10">
          <SocialShare
            className="flex w-full flex-wrap items-center justify-center gap-6"
            url={url}
            title={app_title}
            description={description || ""}
            slug={app_slug}
          />
          <CopyButton
            className="rounded-full"
            url={url}
            isToast={isMobile ? false : true}
          />
        </div>
      </ResponsiveModalContent>
    </ResponsiveModal>
  )
}
