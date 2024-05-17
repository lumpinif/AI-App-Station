// TODO: REFACTOR TYPES INTO SEPARATE TS FILES

// Import necessary types
import { Dispatch, SetStateAction } from "react"

import { Database, Enums, Tables } from "@/types/supabase"

// Type definitions for database tables

// App related tables
export type App_bookmarks = Tables<"app_bookmarks">
export type App_Comment_likes = Tables<"app_comment_likes">
export type App_Comments = Tables<"app_comments">
export type App_likes = Tables<"app_likes">
export type Apps = Tables<"apps">
export type Apps_Categories = Tables<"apps_categories">
export type App_Developers = Tables<"apps_developers">

// Category , developer and label tables
export type Categories = Tables<"categories">
export type Developers = Tables<"developers">
export type Labels = Tables<"labels">

// Post related tables
export type Post_Comment_likes = Tables<"post_comment_likes">
export type Post_Comments = Tables<"post_comments">
export type Post_likes = Tables<"post_likes">
export type Posts = Tables<"posts">
export type Posts_Categories = Tables<"posts_categories">
export type Post_Bookmarks = Tables<"post_bookmarks">

// Profile and user collection tables
export type Profiles = Tables<"profiles">
export type User_Collections = Tables<"user_collections">

// Enum types
export type Publish_Status = Enums<"publish_status">
export type Pricing = Enums<"pricing">

// Type definitions for combined types

// App details with categories and other related data
export type AppCardContentWithCategories = Apps & {
  categories?: Categories[]
}

export type AppDetails = Apps & {
  categories?: Categories[]
  developers?: Developers[]
  profiles: Profiles
  app_likes: App_likes[]
  app_bookmarks: App_bookmarks[]
}

// Post details with categories and other related data
export type PostWithProfile = Posts & {
  profiles: Profiles
}

export type PostDetails = Posts & {
  labels?: Labels[]
  categories?: Categories[]
  profiles: Profiles
  post_likes: Post_likes[]
  post_bookmarks: Post_Bookmarks[]
}

// Comment related types

// Comment with profile and additional properties
export type CommentWithProfile = App_Comments & {
  profiles: Profiles
  app_comment_likes: App_Comment_likes[]
  user_has_liked_comment?: boolean
  user_has_commented?: boolean
}

// Comment actions properties
export type CommentActionsProp = {
  className?: string
  comment: CommentWithProfile
  isShowReplies: boolean
  setIsShowReplies: Dispatch<SetStateAction<boolean>>
  isEditing: boolean
  setIsEditing: Dispatch<SetStateAction<boolean>>
  repliesCount: number
  isReplied: boolean
  likes_count: App_Comments["likes_count"]
  views_count: App_Comments["views_count"]
}

// Screenshot related types

// Screenshot item properties
export type ScreenshotItem = {
  publicUrl: string
  fileName: string
}

// App detail screenshots properties
export type AppDetailScreenShotsProps = {
  screenshotsPublicUrls?: string[]
}

// Screenshots form carousel properties
export type ScreenshotsFormCarouselProps = {
  isHovered: boolean
  setIsHovered: (isHovered: boolean) => void
  setShowUploadModal: (isHovered: boolean) => void
  hasScreenshotsPublicUrls?: boolean
  screenshotsPublicUrls?: string[]
  screenshotsFileNames?: string[]
  handleScreenshotDelete?: (screenshotFileName: string) => void
}
