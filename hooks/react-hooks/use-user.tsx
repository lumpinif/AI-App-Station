"use client"

import { getUserData, getUserProfile } from "@/server/auth"
import { useQuery } from "@tanstack/react-query"
import { toast } from "sonner"

import { Profiles } from "@/types/db_tables"

const initUser: Profiles = {
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
  const {
    data: { user },
    error: getUserDataError,
  } = await getUserData()

  if (getUserDataError) {
    toast.error("Error getting user data! Please try again later.")
  }

  return user
}

async function fetchUserProfile() {
  const { profile, error: getUserProfileError } = await getUserProfile()

  if (getUserProfileError) {
    toast.error("Error loading profile! Please try again later.", {
      description: getUserProfileError.message,
    })
  }

  return profile || initUser
}
