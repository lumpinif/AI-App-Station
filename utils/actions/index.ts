"use server"

import createSupabaseServerClient from "../supabase/server-client"

export default async function getUserSession() {
  const supabase = await createSupabaseServerClient()

  return supabase.auth.getSession()
}
