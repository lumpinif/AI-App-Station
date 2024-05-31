import { User } from "@supabase/supabase-js"

import { getFavoriteApps } from "../../../../_server/favorites/data"
import { FavoriteAppCard } from "./favorite-app-card"

type AppCardGridProps = {
  collectionType?: "favorite" | "bookmark"
  user_id: User["id"]
}

export const AppCardsGrid: React.FC<AppCardGridProps> = async ({
  user_id,
  collectionType,
}) => {
  const { favoriteApps, error: getFavoriteAppsError } = await getFavoriteApps(
    user_id,
    collectionType
  )

  if (getFavoriteAppsError) {
    return (
      <div className="text-destructive">
        Something went wrong: {getFavoriteAppsError}
      </div>
    )
  }

  if (!favoriteApps || favoriteApps.length === 0) {
    return (
      <div className="text-muted-foreground mt-6">
        Add some apps to your favorite...
      </div>
    )
  }

  return (
    <div className="mt-6 grid auto-rows-max grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3 xl:gap-8">
      {favoriteApps.map((favorite) => {
        if (!favorite) return null // Type guard to handle potential null values
        return <FavoriteAppCard key={favorite.app_id} favoriteApp={favorite} />
      })}
    </div>
  )
}
