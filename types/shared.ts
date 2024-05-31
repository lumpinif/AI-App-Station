import { PostgrestError } from "@supabase/supabase-js"

export type updateContentTitleResult =
  | {
      error: null
    }
  | {
      error: PostgrestError
    }
  | undefined

export type insertContentServiceResult =
  | {
      error: null
    }
  | {
      error: PostgrestError
    }
  | undefined

export type removeContentServiceResult =
  | {
      error: null
    }
  | {
      error: Error
    }
  | {
      error: PostgrestError
    }

export type BookmarkState = {
  isUserBookmarked?: boolean
  bookmarksCount?: number
}
