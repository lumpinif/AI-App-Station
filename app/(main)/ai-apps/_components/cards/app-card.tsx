import React from "react"

import { AppCardContentWithCategories } from "@/types/db_tables"
import { Separator } from "@/components/ui/separator"

import { AppCardActions } from "./_components/app-card-actions"
import { AppCardLabelDescription } from "./_components/app-card-label-description"
import { AppIcon } from "./_components/app-icon"
import { AppTitleWithDescription } from "./_components/app-title-description"
import { AppCommentsBadge } from "./app-comments-badge"

type AppCardWithIndex = AppCardContentWithCategories & {
  index: number
}

const MemoizedAppCardActions = React.memo(AppCardActions)

const AppCard: React.FC<AppCardWithIndex> = ({
  app_id,
  app_title,
  description,
  categories,
  app_slug,
  comments_count,
  app_icon_src,
  index,
}) => {
  return (
    <div key={app_id} className="flex items-center justify-between gap-x-2">
      <div className="flex items-center justify-center">
        <AppIcon
          app_slug={app_slug}
          app_title={app_title}
          app_icon_src={app_icon_src}
        />
      </div>

      <div className="flex w-full flex-1 flex-col gap-y-2">
        <div className="flex items-center justify-between">
          <AppTitleWithDescription
            app_slug={app_slug}
            app_title={app_title}
            description={description}
            className="w-20 flex-1"
          />
          <div className="flex flex-none flex-col items-center gap-y-2">
            <div className="flex w-full items-center justify-end gap-x-2 sm:justify-between">
              <AppCommentsBadge
                app_slug={app_slug}
                comments_count={comments_count}
                className="text-muted-foreground"
              />
              <span className="hidden sm:flex">
                <MemoizedAppCardActions />
              </span>
            </div>
            <AppCardLabelDescription categories={categories} />
          </div>
        </div>
        {index < 2 && <Separator />}
      </div>
    </div>
  )
}

export default AppCard
