/* eslint-disable tailwindcss/classnames-order */
import { Fragment } from "react"
import Link from "next/link"
import { User } from "@supabase/supabase-js"

import { AppDetails } from "@/types/db_tables"
import { FavoriteAppCardCategories } from "@/app/(main)/user/_components/bookmark-favorites/_components/apps/favorite-app-card-categories"

import { AppDetailLikeButton } from "../../[slug]/_components/app-detail-like-button"
import AppCardActions from "./_components/app-card-actions"
import { AppIcon } from "./_components/app-icon"
import { AppTitleWithDescription } from "./_components/app-title-description"
import { AppCommentsBadge } from "./app-comments-badge"

type AppFeaturedCardProps = {
  app: AppDetails
  user?: User | null
}

export const AppFeaturedCard: React.FC<AppFeaturedCardProps> = ({
  app,
  user,
}) => {
  return (
    <div className="relative flex h-full w-full flex-col gap-y-6 rounded-xl border border-border/10 bg-card/30 p-2 py-6 shadow-sm transition-all duration-200 ease-out hover:shadow-md dark:shadow-top sm:p-4 sm:py-8">
      <span className="absolute left-4 top-4 select-none text-sm font-medium text-muted-foreground">
        Featured
      </span>

      <AppCardActions
        user={user}
        app_id={app.app_id}
        app_slug={app.app_slug}
        app_likes={app.app_likes}
        app_bookmarks={app.app_bookmarks}
        className="absolute right-4 top-4"
        DropdownMenuContentProps={{
          align: "center",
        }}
      />

      <AppIcon
        app_slug={app.app_slug}
        app_title={app.app_title}
        app_icon_src={app.app_icon_src}
        className="mx-auto size-20"
      />

      <span className="text-center">
        <AppTitleWithDescription
          isTruncate={false}
          app_slug={app.app_slug}
          app_title={app.app_title}
          description={app.description}
          className="gap-y-2"
          descriptionClassname="line-clamp-2 max-w-64 mx-auto"
          linkClassName="mx-auto text-xl font-semibold capitalize"
        />
      </span>

      <span className="mx-auto flex max-w-72 select-none items-center justify-center gap-x-2 overflow-hidden overflow-x-auto text-wrap sm:gap-x-4">
        {app.developers &&
          app.developers.length > 0 &&
          app.developers.map((developer, index) => (
            <Fragment key={index}>
              {developer.developer_slug ? (
                <Link
                  key={index}
                  href={`/ai-apps/developer/${developer.developer_slug}`}
                  className="flex items-center justify-center gap-x-2"
                >
                  <span className="font-semibol">
                    {developer.developer_name}
                  </span>
                </Link>
              ) : (
                <div
                  key={index}
                  className="flex items-center justify-center gap-x-2"
                >
                  <span className="font-semibol">
                    {developer.developer_name}
                  </span>
                </div>
              )}
            </Fragment>
          ))}
      </span>

      {app.categories && (
        <FavoriteAppCardCategories
          categories={app.categories}
          className="mx-auto flex max-w-72 select-none flex-wrap items-center justify-center gap-x-2 gap-y-2"
        />
      )}

      <span className="absolute bottom-2 right-4 flex items-center gap-x-2">
        {app.comments_count > 0 && (
          <AppCommentsBadge
            app_slug={app.app_slug}
            iconClassName="size-3"
            comments_count={app.comments_count}
            className="select-none text-muted-foreground"
          />
        )}

        <AppDetailLikeButton
          user={user || null}
          app_id={app.app_id}
          data={app.app_likes}
          iconClassName="size-3"
          className="select-none"
        />
      </span>
    </div>
  )
}
