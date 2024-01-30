"use server"

import { revalidatePath } from "next/cache"
import createSupabaseServerClient from "@/utils/supabase/server-client"
import { User } from "@supabase/auth-helpers-nextjs"

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

export async function signOut() {
  const supabase = await createSupabaseServerClient()

  //check if there is a session logged in
  const {
    data: { session },
  } = await getUserSession()

  if (session) {
    const { error } = await supabase.auth.signOut()
    revalidatePath("/")
    return { error }
  }

  return null
}

export async function getUserSession() {
  const supabase = await createSupabaseServerClient()

  return supabase.auth.getSession()
}

export async function getUserData() {
  const supabase = await createSupabaseServerClient()
  return supabase.auth.getUser()
}

export async function getUserProfile(user: User | null) {
  const supabase = await createSupabaseServerClient()
  return supabase
    .from("profiles")
    .select("*")
    .eq("id", user?.id as string)
    .single()
}
