import { Database } from "@/types/supabase"

// About the User
export type Profiles = Database["public"]["Tables"]["profiles"]["Row"]
export type UserCollections =
  Database["public"]["Tables"]["user_collections"]["Row"]
export type Bookmarks = Database["public"]["Tables"]["bookmarks"]["Row"]
export type Comments = Database["public"]["Tables"]["comments"]["Row"]

// About the Apps
export type Apps = Database["public"]["Tables"]["apps"]["Row"]
export type AppsCategories =
  Database["public"]["Tables"]["apps_categories"]["Row"]
export type AppDevelopers =
  Database["public"]["Tables"]["app_developers"]["Row"]
export type Categories = Database["public"]["Tables"]["categories"]["Row"]
export type Developers = Database["public"]["Tables"]["developers"]["Row"]

// About the Posts
export type Posts = Database["public"]["Tables"]["posts"]["Row"]
export type PostsCategories =
  Database["public"]["Tables"]["posts_categories"]["Row"]
export type HeroPostsCardProps = Pick<
  Posts,
  "label" | "title" | "description" | "image_src" | "slug"
>
