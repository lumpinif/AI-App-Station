import { useEffect } from "react"

import { AppDetails } from "@/types/db_tables"
import { cn } from "@/lib/utils"
import { PageTitle } from "@/components/layout/page-title"

import { AppEditorPageTitle } from "./app-editor-page-title"
import { AppPublishButton } from "./forms/app-publish-button"
import { InfoPopover } from "./forms/info-popover"

export type AppEditingPageWrapperProps = {
  app: AppDetails
  isAllFormsComplete: () => boolean
  children?: React.ReactNode
}

export const AppEditingPageWrapper: React.FC<AppEditingPageWrapperProps> = ({
  app,
  isAllFormsComplete,
  children,
}) => {
  return (
    <section className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2] bg-background relative mb-4 w-full space-y-6">
      {/* Radial gradient for the container to give a faded look */}
      <div className="bg-background pointer-events-none absolute inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]" />

      {/* Header */}
      <div className="bg-background sticky top-0 z-30 flex items-center justify-between pb-4">
        <AppEditorPageTitle app_title={app.app_title} />

        {/* Submit button */}
        <div className="text-muted-foreground flex items-center justify-end gap-x-2 text-xs">
          <AppPublishButton
            isAllFieldsComplete={isAllFormsComplete()}
            app_publish_status={app.app_publish_status}
            size={"sm"}
            app_id={app.app_id}
            disabled={
              !isAllFormsComplete() || app.app_publish_status === "published"
            }
            className={cn(
              "hidden h-8 w-fit select-none text-xs sm:block",
              isAllFormsComplete() && "w-28",
              app.app_publish_status === "published" && "w-fit"
            )}
          >
            {app.app_publish_status === "published"
              ? "Published"
              : isAllFormsComplete()
                ? "Ready to Publish"
                : app.app_publish_status === "draft"
                  ? "Fill Out All Fields"
                  : app.app_publish_status === "unpublished"
                    ? "Unpublished"
                    : app.app_publish_status === "pending"
                      ? "Currently under Reviewing"
                      : isAllFormsComplete() && "Ready to Publish"}
          </AppPublishButton>
        </div>
      </div>

      {children}

      {/* Mobile Submit */}
      <div className="flex w-full justify-end sm:hidden">
        <AppPublishButton
          isAllFieldsComplete={isAllFormsComplete()}
          app_publish_status={app.app_publish_status}
          app_id={app.app_id}
          disabled={
            !isAllFormsComplete() || app.app_publish_status === "published"
          }
          className="w-full select-none"
        >
          {app.app_publish_status === "published"
            ? "Published"
            : isAllFormsComplete()
              ? "Ready to Publish"
              : app.app_publish_status === "draft"
                ? "Fill Out All Fields"
                : app.app_publish_status === "unpublished"
                  ? "Unpublished"
                  : app.app_publish_status === "pending"
                    ? "Currently under Reviewing"
                    : isAllFormsComplete() && "Ready to Publish"}
        </AppPublishButton>
      </div>
    </section>
  )
}
