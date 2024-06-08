import React from "react"
import { User } from "@supabase/supabase-js"

import { AppDetails } from "@/types/db_tables"
import { Separator } from "@/components/ui/separator"

import { AppDetailLikeButton } from "../../[slug]/_components/app-detail-like-button"
import { AppCardActions } from "./_components/app-card-actions"
import { AppIcon } from "./_components/app-icon"
import { AppTitleWithDescription } from "./_components/app-title-description"
import { AppCommentsBadge } from "./app-comments-badge"

type AppCardWithIndex = AppDetails & {
  user?: User | null
  index: number
}

const AppCarouselCard: React.FC<AppCardWithIndex> = ({
  user,
  index,
  app_id,
  app_slug,
  app_title,
  app_likes,
  categories,
  description,
  app_icon_src,
  app_bookmarks,
  comments_count,
}) => {
  // const { data: user } = useUserData()

  return (
    <div key={app_id} className="flex items-center justify-between gap-x-2">
      <div className="flex items-center justify-center">
        <AppIcon
          app_slug={app_slug}
          app_title={app_title}
          app_icon_src={app_icon_src}
        />
      </div>

      <div className="flex h-full w-full flex-1 flex-col gap-y-2">
        <div className="flex items-start justify-between">
          <AppTitleWithDescription
            app_slug={app_slug}
            app_title={app_title}
            description={description}
            className="w-40 flex-1 select-none pr-2"
          />
          <div className="flex h-full flex-none flex-col items-end gap-y-2">
            <AppCardActions
              user={user}
              app_id={app_id}
              app_slug={app_slug}
              app_likes={app_likes}
              app_bookmarks={app_bookmarks}
            />

            <div className="flex w-fit items-center justify-end gap-x-1 sm:justify-between">
              {comments_count > 0 && (
                <AppCommentsBadge
                  app_slug={app_slug}
                  iconClassName="size-3"
                  comments_count={comments_count}
                  className="text-muted-foreground"
                />
              )}
              <AppDetailLikeButton
                user={user || null}
                app_id={app_id}
                data={app_likes}
                iconClassName="size-3"
              />
            </div>
            {/* <AppCardCatLabel categories={categories} /> */}
          </div>
        </div>
        {index < 2 && <Separator className="bg-input" />}
      </div>
    </div>
  )
}

export default AppCarouselCard
