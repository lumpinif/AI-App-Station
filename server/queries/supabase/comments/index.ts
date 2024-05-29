"use server"

import { revalidatePath, unstable_noStore } from "next/cache"
import createSupabaseServerClient from "@/utils/supabase/server-client"

import {
  App_Comments,
  AppCommentWithProfile,
  AppDetails,
  Apps,
  AppWithCategoriesAndDevelopers,
  Categories,
  Developers,
} from "@/types/db_tables"
import { capitalizeFirstLetter, nameToSlug, normalizeString } from "@/lib/utils"
