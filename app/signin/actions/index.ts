"use server"

import createSupabaseServerClient from "@/utils/supabase/server-client"

export async function signUpWithEmailAndPassword(signUpData: {
  email: string
  password: string
  confirm: string
}) {
  const supabase = await createSupabaseServerClient()

  const result = await supabase.auth.signUp({
    email: signUpData.email,
    password: signUpData.password,
  })

  return JSON.stringify(result)
}

export async function signInWithEmailAndPassword(data: {
  email: string
  password: string
}) {}
