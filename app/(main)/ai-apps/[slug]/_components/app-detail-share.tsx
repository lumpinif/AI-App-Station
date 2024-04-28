import { ExternalLink } from "lucide-react"

import { App } from "@/types/db_tables"
import { getSiteUrl } from "@/lib/utils"
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
  return (
    <>
      <ResponsiveModal>
        <ResponsiveModalTrigger asChild>
          <button className="group">
            <ExternalLink className="size-4 stroke-1 text-muted-foreground transition-all duration-150 ease-out group-hover:text-primary md:size-6" />
          </button>
        </ResponsiveModalTrigger>
        <ResponsiveModalContent className="w-full  rounded-t-3xl p-4 py-6 lg:max-w-md lg:rounded-md">
          <EnhancedDrawerClose title="Share this app" className="lg:hidden" />
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
          <div className="flex flex-col space-y-4 border py-6">
            <CopyButton />
          </div>
        </ResponsiveModalContent>
      </ResponsiveModal>
    </>
  )
}
