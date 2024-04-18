"use server"

import { revalidatePath } from "next/cache"
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

  if (data) {
    revalidatePath("/", "layout")
  }

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

  if (data) {
    revalidatePath("/", "layout")
  }

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
    revalidatePath("/", "layout")
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
  // const { data, error } = await supabase.auth.getUser()
  return await supabase.auth.getUser()
}

export async function getUserProfile() {
  const supabase = await createSupabaseServerClient()

  const {
    data: { session },
  } = await getUserSession()

  if (session?.user) {
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", session.user.id)
      .single()

    return { profile, error }
  }

  return { profile: null }
}
