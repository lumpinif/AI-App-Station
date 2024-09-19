"use client"

import { getUser, getUserProfile } from "@/server/auth"
import { User } from "@supabase/supabase-js"
import { useQuery } from "@tanstack/react-query"
import { toast } from "sonner"

import { Profiles } from "@/types/db_tables"

const initProfile: Profiles = {
  user_id: "",
  email: "",
  user_name: "",
  avatar_url: "",
  created_at: "",
  updated_at: "",
  full_name: "",
  user_location: "",
  user_website: "",
  user_bio: "",
  user_pronouns: "",
}

const initUser: User = {
  id: "",
  app_metadata: {
    provider: "",
    providers: [],
  },
  user_metadata: {
    avatar_url: "",
    full_name: "",
    user_location: "",
    user_website: "",
    user_bio: "",
    user_pronouns: "",
  },
  aud: "",
  created_at: "",
}

export function useUserData() {
  return useQuery({
    queryKey: ["user_data"],
    queryFn: fetchUserData,
  })
}

export default function useUserProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: fetchUserProfile,
  })
}

async function fetchUserData() {
  const { user, error: getUserDataError } = await getUser()

  if (getUserDataError) {
    toast.error("Error getting user data! Please try again later.")
  }

  return user || initUser
}

async function fetchUserProfile() {
  const { profile, error: getUserProfileError } = await getUserProfile()

  if (getUserProfileError) {
    toast.error("Error loading profile! Please try again later.", {
      description: getUserProfileError.message,
    })
  }

  return profile || initProfile
}
