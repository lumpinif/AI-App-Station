"use client"

import { getUserProfile } from "@/server/auth"
import { useQuery } from "@tanstack/react-query"
import { toast } from "sonner"

import { Profile } from "@/types/db_tables"

const initUser: Record<keyof Profile, string> = {
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

export default function useUser() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: fetchUserProfile,
  })
}

async function fetchUserProfile() {
  const { profile, error } = await getUserProfile()

  if (error) {
    toast.error(`Error loading profile! Please try again later.`)
  }

  return profile || initUser
}
