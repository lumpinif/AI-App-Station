import { PostgrestError } from "@supabase/supabase-js"

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
