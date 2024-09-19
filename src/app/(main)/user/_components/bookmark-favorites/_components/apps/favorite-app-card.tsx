/* eslint-disable tailwindcss/classnames-order */
import { AppDetails } from "@/types/db_tables"
import { AppIcon } from "@/app/(main)/ai-apps/_components/cards/_components/app-icon"
import { AppTitleWithDescription } from "@/app/(main)/ai-apps/_components/cards/_components/app-title-description"

import { FavoriteAppCardCategories } from "./favorite-app-card-categories"

type FavoriteAppCardProps = {
  favoriteApp: AppDetails
}

export const FavoriteAppCard: React.FC<FavoriteAppCardProps> = ({
  favoriteApp,
}) => {
  const { ...app } = favoriteApp
  return (
    <div className="col-span-1 flex w-full flex-col gap-y-4 rounded-xl border border-border/50 p-2 py-4 shadow-sm transition-all duration-150 ease-out hover:shadow-md hover:dark:shadow-none md:p-4">
      {/* TODO: CHECK IF WE CAN MAKE BG-CARD/50 AS BG-CARD COLOR */}
      <div className="flex items-center gap-x-2 rounded-xl p-2 dark:bg-card/50 md:gap-x-4">
        <AppIcon
          app_slug={app.app_slug}
          app_title={app.app_title}
          app_icon_src={app.app_icon_src}
          className="sm:size-18"
        />

        <AppTitleWithDescription
          isTruncate={false}
          app_slug={app.app_slug}
          app_title={app.app_title}
          description={app.description}
        />
      </div>

      {app.categories && (
        <FavoriteAppCardCategories
          categories={app.categories}
          className="flex w-full flex-wrap items-center gap-x-2 gap-y-2"
        />
      )}
    </div>
  )
}
