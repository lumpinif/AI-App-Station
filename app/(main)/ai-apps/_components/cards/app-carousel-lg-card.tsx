/* eslint-disable tailwindcss/classnames-order */
import { Fragment } from "react"
import Link from "next/link"
import { User } from "@supabase/supabase-js"

import { AppDetails } from "@/types/db_tables"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { FavoriteAppCardCategories } from "@/app/(main)/user/_components/bookmark-favorites/_components/apps/favorite-app-card-categories"

import { AppDetailLikeButton } from "../../[slug]/_components/app-detail-like-button"
import AppCardActions from "./_components/app-card-actions"
import { AppIcon } from "./_components/app-icon"
import { AppTitleWithDescription } from "./_components/app-title-description"
import { AppCommentsBadge } from "./app-comments-badge"

type AppCarouselLgCardProps = {
  app: AppDetails
  user?: User | null
}

export const AppCarouselLgCard: React.FC<AppCarouselLgCardProps> = ({
  app,
  user,
}) => {
  return (
    <div className="relative col-span-1 flex h-full w-full gap-x-4 rounded-xl p-2 py-6 transition-all duration-200 ease-out sm:gap-x-4 sm:p-6 sm:py-8 lg:gap-x-6">
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
        className="mx-auto sm:size-20"
      />

      <div className="flex w-full flex-col gap-y-4 sm:gap-y-6">
        <AppTitleWithDescription
          isTruncate={false}
          app_slug={app.app_slug}
          app_title={app.app_title}
          description={app.description}
          className="gap-y-2"
          descriptionClassname="line-clamp-2"
          linkClassName="text-xl font-semibold"
        />
        {/* Developers */}
        <span className="flex select-none items-center gap-x-2 overflow-hidden overflow-x-auto text-wrap sm:gap-x-4">
          {app.developers &&
            app.developers.length > 0 &&
            app.developers.map((developer, index) => (
              <Fragment key={index}>
                {developer.developer_slug ? (
                  <Link
                    key={index}
                    href={`ai-apps/${developer.developer_slug}`}
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
        {/* Check button */}
        <div className="flex items-center gap-x-2 sm:gap-x-4">
          <div
            className={cn(
              "hover:cursor-pointer",
              buttonVariants({
                size: "xs",
                variant: "default",
                className:
                  "w-fit select-none rounded-full bg-accent px-4 text-xs font-semibold uppercase text-blue-500 hover:bg-accent hover:shadow-sm active:scale-[.98] dark:bg-white",
              })
            )}
          >
            <Link href={`/ai-apps/${app.app_slug}`}>Check</Link>
          </div>
          {app.pricing && (
            <span className="max-w-20 text-[0.5rem] text-muted-foreground">
              {app.pricing}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-y-2">
          <span className="flex items-center justify-end gap-x-2">
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

          <Separator className="bg-input" />
        </div>
      </div>
    </div>
  )
}
