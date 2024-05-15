import { AppDetails, Apps } from "@/types/db_tables"

type FavoriteAppCardProps = {
  favoriteApp: AppDetails
}

export const FavoriteAppCard: React.FC<FavoriteAppCardProps> = ({
  favoriteApp,
}) => {
  const { ...app } = favoriteApp
  return (
    <div className="col-span-1 max-w-sm rounded-md border">
      {app.app_title}
      {app.description}
      {app.categories?.map((cat) => (
        <span key={cat.category_id}>{cat.category_name}</span>
      ))}
    </div>
  )
}
