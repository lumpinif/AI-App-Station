"use server"

import createSupabaseServerClient from "@/utils/supabase/server-client"

export async function signUpWithEmailAndPassword(signUpData: {
  email: string
  password: string
  confirm: string
}) {
  const supabase = await createSupabaseServerClient()

  const { data, error } = await supabase.auth.signUp({
    email: signUpData.email,
    password: signUpData.password,
  })

  return { data, error }
}

export async function signInWithEmailAndPassword(signInData: {
  email: string
  password: string
}) {
  const supabase = await createSupabaseServerClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email: signInData.email,
    password: signInData.password,
  })

  return { data, error }
}
