// TODO: REFACTOR TYPES INTO SEPARATE TS FILES

// Import necessary types
import { Dispatch, SetStateAction } from "react"
import {
  addAppComment,
  deleteAppComment,
  updateAppComment,
} from "@/server/queries/supabase/comments/app_comments"
import {
  addPostComment,
  deletePostComment,
  updatePostComment,
} from "@/server/queries/supabase/comments/post_comments"

import { Database, Enums, Tables } from "@/types/supabase"

// Type definitions for database tables
export type Table = keyof Database["public"]["Tables"]
export type TableColumns<T extends Table> =
  Database["public"]["Tables"][T]["Row"]

// App related tables
export type App_bookmarks = Tables<"app_bookmarks">
export type App_Comment_likes = Tables<"app_comment_likes">
export type App_Comments = Tables<"app_comments">
export type App_likes = Tables<"app_likes">
export type Apps = Tables<"apps">
export type Apps_Categories = Tables<"apps_categories">
export type App_Developers = Tables<"apps_developers">
export type Daily_app = Tables<"daily_app">

export type AppRefrencedTables = Extract<
  Table,
  | "profiles"
  | "app_likes"
  | "developers"
  | "categories"
  | "app_comments"
  | "app_bookmarks"
>

// Category , developer and label tables
export type Categories = Tables<"categories">
export type Developers = Tables<"developers">
export type Topics = Tables<"topics">

// Post related tables

export type PostRefrencedTables = Extract<
  Table,
  | "topics"
  | "profiles"
  | "post_likes"
  | "categories"
  | "post_comments"
  | "post_bookmarks"
>

export type Post_Comment_likes = Tables<"post_comment_likes">
export type Post_Comments = Tables<"post_comments">
export type Post_likes = Tables<"post_likes">
export type Posts = Tables<"posts">
export type Posts_Categories = Tables<"posts_categories">
export type Post_bookmarks = Tables<"post_bookmarks">
export type Post_of_the_day = Tables<"post_of_the_day">
export type Daily_post = Tables<"daily_post">

// Profile and user collection tables
export type Profiles = Tables<"profiles">
export type Profile_role = Tables<"profile_role">
export type User_Collections = Tables<"user_collections">

// Enum types
export type Publish_Status = Enums<"publish_status">
export type Pricing = Enums<"pricing">
export type Post_type = Enums<"post_type">
export type User_role = Enums<"user_role_enum">

// Type definitions for combined types

// App details with categories and other related data
export type AppWithCategories = Apps & {
  categories?: Categories[]
}

export type AppWithDevelopers = Apps & {
  developers?: Developers[]
}

export type AppWithCategoriesAndDevelopers = Apps &
  AppWithCategories &
  AppWithDevelopers

export type AppRefrencedFields = {
  profiles: Profiles
  app_likes: App_likes[]
  app_bookmarks: App_bookmarks[]
}

export type AppDetails = Apps &
  AppWithCategoriesAndDevelopers &
  AppRefrencedFields

export type DailyApp = Daily_app & {
  apps: AppDetails
}

// Post details with categories and other related data
export type PostWithProfile = Posts & {
  profiles: Profiles
}

export type PostWithCategories = Posts & {
  categories?: Categories[]
}

export type PostWithTopics = Posts & {
  topics?: Topics[]
}

export type PostWithTopicsAndCategories = Posts &
  PostWithTopics &
  PostWithCategories

export type PostWithCategoriesAndProfiles = Posts &
  PostWithCategories &
  PostWithProfile

export type PostDetails = Posts &
  PostWithTopics &
  PostWithCategoriesAndProfiles & {
    post_likes: Post_likes[]
    post_bookmarks: Post_bookmarks[]
  }

export type PostOfTheDay = Post_of_the_day & {
  posts: PostDetails
}

export type DailyPost = Daily_post & {
  posts: PostDetails
}

export type PostRefrencedFields = {
  profiles: Profiles
  post_likes: Post_likes[]
  post_bookmarks: Post_bookmarks[]
}

// Comment related types
export type CommentWithProfile = App_Comments &
  Post_Comments & {
    profiles: Profiles
    user_has_liked_comment?: boolean
    user_has_commented_comment?: boolean
  }

// Comment with profile and additional properties
export type AppCommentWithProfile = App_Comments &
  CommentWithProfile & {
    app_comment_likes: App_Comment_likes[]
  }

export type PostCommentWithProfile = CommentWithProfile & {
  post_comment_likes: Post_Comment_likes[]
}

// Comment actions properties
export type CommentActionsProp = {
  className?: string
  isShowReplies: boolean
  isEditing: boolean
  repliesCount: number
  isReplied: boolean
  likes_count: App_Comments["likes_count"]
  views_count: App_Comments["views_count"]
  setIsEditing: Dispatch<SetStateAction<boolean>>
  setIsShowReplies?: Dispatch<SetStateAction<boolean>>
}

// Comment list properties
export type TCommentWithProfile = AppCommentWithProfile | PostCommentWithProfile

export type CommentOptimisticAction =
  | { type: "update"; comment: TCommentWithProfile }
  | { type: "delete"; comment_id: string }

// export type TSetOptimisticComment = (newComment: TCommentWithProfile) => void

export type TSetOptimisticComment = (action: CommentOptimisticAction) => void

export type TCommentId =
  | App_Comments["comment_id"]
  | Post_Comments["comment_id"]

export type TCommentParentId =
  | App_Comments["parent_id"]
  | Post_Comments["parent_id"]

export type TCommentRowId = App_Comments["app_id"] | Post_Comments["post_id"]

export type CommentReplyServiceType<U extends (...args: any) => any> = (
  db_row_id: TCommentRowId,
  comment_content: string,
  replyToCommentId?: TCommentId | null,
  rating?: number | null
) => Promise<Awaited<ReturnType<U>>>

export type CommentEditServiceType<R extends (...args: any) => any> = (
  db_row_id: TCommentRowId,
  comment_content: string,
  comment_id: TCommentId,
  rating?: number | null
) => Promise<Awaited<ReturnType<R>>>

export type CommentDeleteServiceType<V extends (...args: any) => any> = (
  db_row_id: TCommentRowId,
  comment_id: TCommentId
) => Promise<Awaited<ReturnType<V>>>

export type addAppCommentReturnType = typeof addAppComment
export type addPostCommentReturnType = typeof addPostComment

export type updateAppCommentReturnType = typeof updateAppComment
export type updatePostCommentReturnType = typeof updatePostComment

export type deleteAppCommentReturnType = typeof deleteAppComment
export type deletePostCommentReturnType = typeof deletePostComment

export type CommentsOfTable = "apps" | "posts"
export type CommentLikesTable = "app_comment_likes" | "post_comment_likes"

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
