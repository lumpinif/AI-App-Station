// TODO: REFACTOR TYPES INTO SEPERATE TS FILES

import { Dispatch, SetStateAction } from "react"

import { Database } from "@/types/supabase"

export type Profile = Database["public"]["Tables"]["profiles"]["Row"]
export type Bookmark = Database["public"]["Tables"]["bookmarks"]["Row"]
export type Comment = Database["public"]["Tables"]["app_comments"]["Row"]
export type App = Database["public"]["Tables"]["apps"]["Row"]

// About the Users
export type UserCollections =
  Database["public"]["Tables"]["user_collections"]["Row"]

// About the Apps
export type AppsCategories =
  Database["public"]["Tables"]["apps_categories"]["Row"]
export type AppDevelopers =
  Database["public"]["Tables"]["apps_developers"]["Row"]
export type Developer = Database["public"]["Tables"]["developers"]["Row"]
export type Categories = Database["public"]["Tables"]["categories"]["Row"]
export type Developers = Database["public"]["Tables"]["developers"]["Row"]

export type AppCardContent = Pick<
  App,
  "app_id" | "app_title" | "description" | "app_slug" | "app_icon_src"
>
export type AppCardContentWithCategories = AppCardContent & {
  categories?: Categories[]
}

export type AppDetails = App & {
  categories?: Categories[]
  developers?: Developer[]
  profiles: Profile
}

// About the Posts
export type Post = Database["public"]["Tables"]["posts"]["Row"]
export type PostsCategories =
  Database["public"]["Tables"]["posts_categories"]["Row"]
export type PostCardProps = Pick<
  Post,
  "label" | "title" | "description" | "image_src" | "slug"
>

// About the Comment

export type CommentWithProfile = Comment & {
  profiles: Profile
}

export type CommentActionsProp = {
  className?: string
  comment: CommentWithProfile
  isShowReplies: boolean
  setisShowReplies: Dispatch<SetStateAction<boolean>>
  isEditing: boolean
  setIsEditing: Dispatch<SetStateAction<boolean>>
  repliesCount: number
  isReplied: boolean
  likes_count: Comment["likes_count"]
  views_count: Comment["views_count"]
}
