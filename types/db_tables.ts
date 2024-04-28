// TODO: REFACTOR TYPES INTO SEPERATE TS FILES

import { Dispatch, SetStateAction } from "react"

import { Database } from "@/types/supabase"

export type Profile = Database["public"]["Tables"]["profiles"]["Row"]
export type Comment = Database["public"]["Tables"]["app_comments"]["Row"]
export type App = Database["public"]["Tables"]["apps"]["Row"]
export type App_bookmarks = Database["public"]["Tables"]["app_bookmarks"]["Row"]
export type App_likes = Database["public"]["Tables"]["app_likes"]["Row"]
export type Comment_likes = Database["public"]["Tables"]["comment_likes"]["Row"]

// About the Users
export type UserCollections =
  Database["public"]["Tables"]["user_collections"]["Row"]

// About the Apps
export type AppsCategories =
  Database["public"]["Tables"]["apps_categories"]["Row"]
export type AppDevelopers =
  Database["public"]["Tables"]["apps_developers"]["Row"]
export type Developer = Database["public"]["Tables"]["developers"]["Row"]
export type Category = Database["public"]["Tables"]["categories"]["Row"]
export type Developers = Database["public"]["Tables"]["developers"]["Row"]

export type AppCardContentWithCategories = App & {
  categories?: Category[]
}

export type AppDetails = App & {
  categories?: Category[]
  developers?: Developer[]
  profiles: Profile
  app_likes: App_likes[]
  app_bookmarks: App_bookmarks[]
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
  comment_likes: Comment_likes[]
  user_has_liked_comment?: boolean
  user_has_commented?: boolean
}

export type CommentActionsProp = {
  className?: string
  comment: CommentWithProfile
  isShowReplies: boolean
  setIsShowReplies: Dispatch<SetStateAction<boolean>>
  isEditing: boolean
  setIsEditing: Dispatch<SetStateAction<boolean>>
  repliesCount: number
  isReplied: boolean
  likes_count: Comment["likes_count"]
  views_count: Comment["views_count"]
}

// screenshots

export type ScreenshotItem = {
  publicUrl: string
  fileName: string
}

export type AppDetailScreenShotsProps = {
  screenshotsPublicUrls?: string[]
}

export type ScreenshotsFormCarouselProps = {
  isHovered: boolean
  setIsHovered: (isHovered: boolean) => void
  setShowUploadModal: (isHovered: boolean) => void
  hasScreenshotsPublicUrls?: boolean
  screenshotsPublicUrls?: string[]
  screenshotsFileNames?: string[]
  handleScreenshotDelete?: (screenshotFileName: string) => void
}
